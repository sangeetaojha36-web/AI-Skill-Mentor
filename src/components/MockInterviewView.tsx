import React, { useState, useEffect, useRef } from 'react';
import { User, MockInterviewSession, MockInterviewQuestion } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Award,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Clock,
  Play,
  Square,
  Shield,
  Zap,
  Activity,
  UserCheck,
  Building2,
  Volume1
} from 'lucide-react';

interface MockInterviewViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({ user, onNavigate }) => {
  // Session States
  const [stage, setStage] = useState<'setup' | 'greenroom' | 'interview' | 'report'>('setup');
  const [session, setSession] = useState<MockInterviewSession | null>(null);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [careerInput, setCareerInput] = useState(user.careerGoal || 'Data Analyst & Business Insights');
  const [interviewType, setInterviewType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Intermediate');

  // Greenroom Hardware States
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 100 for VU meter
  const [voiceTTSActive, setVoiceTTSActive] = useState(true);
  const [cameraError, setCameraError] = useState('');

  // Speech Recognition & Answering
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecordingSpeech, setIsRecordingSpeech] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  const [speechWPM, setSpeechWPM] = useState(0);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);

  // Stop media streams on unmount
  useEffect(() => {
    return () => {
      stopMediaStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  // Real-time filler word & WPM tracker
  useEffect(() => {
    if (!currentAnswer) {
      setFillerWordCount(0);
      setSpeechWPM(0);
      return;
    }

    const words = currentAnswer.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Detect common Indian interview filler words
    const lower = currentAnswer.toLowerCase();
    const fillerRegex = /\b(um|uh|like|basically|you know|actually|sort of|kind of|i mean|right)\b/gi;
    const matches = lower.match(fillerRegex) || [];
    setFillerWordCount(matches.length);

    // Calculate Words Per Minute
    if (timerSeconds > 5) {
      const minutes = timerSeconds / 60;
      const wpm = Math.round(wordCount / minutes);
      setSpeechWPM(wpm);
    }
  }, [currentAnswer, timerSeconds]);

  /* ==========================================
     GREENROOM HARDWARE & AUDIO ANALYZER SETUP
     ========================================== */
  const startGreenroomCheck = async () => {
    setCameraError('');
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: true
        });

        mediaStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCameraActive(true);
        setMicActive(true);

        // Setup Web Audio Analyser for VU Meter
        setupAudioAnalyser(stream);
      } else {
        setCameraError('Webcam / Microphone API is not supported in this browser.');
      }
    } catch (err: any) {
      console.warn('Camera/Mic permission warning:', err);
      setCameraError('Webcam or Microphone permission was not granted. You can still practice with live speech dictation or typing.');
      setCameraActive(false);
      setMicActive(false);
    }
  };

  const setupAudioAnalyser = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateMeter = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setAudioLevel(normalized);

        animationFrameRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (e) {
      console.warn('Could not initialize AudioContext for VU meter:', e);
    }
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (_) {}
    }
    setCameraActive(false);
    setMicActive(false);
    setAudioLevel(0);
  };

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    }
  };

  /* ==========================================
     SPEECH SYNTHESIS (INTERVIEWER SPEAKS)
     ========================================== */
  const speakInterviewerQuestion = (text: string) => {
    if (!voiceTTSActive || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN'; // Indian English accent if available
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  /* ==========================================
     SPEECH RECOGNITION (STUDENT SPEAKS ANSWER)
     ========================================== */
  const toggleSpeechRecognition = () => {
    if (isRecordingSpeech) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsRecordingSpeech(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition is not natively supported in this browser. Please type your answer directly in the editor.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsRecordingSpeech(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          setCurrentAnswer((prev) => (prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim()));
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecordingSpeech(false);
      };

      recognition.onend = () => {
        setIsRecordingSpeech(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsRecordingSpeech(false);
    }
  };

  /* ==========================================
     INTERVIEW FLOW
     ========================================== */
  const handleProceedToGreenroom = () => {
    setStage('greenroom');
    startGreenroomCheck();
  };

  const handleStartLiveInterview = async () => {
    setStarting(true);
    try {
      const data = await api.startInterview(user.id, careerInput, interviewType, difficulty);
      setSession(data.session);
      setStage('interview');
      setCurrentAnswer('');
      setTimerSeconds(0);
      setIsTimerRunning(true);

      // Automatically speak the first question
      if (data.session?.questions?.[0]) {
        speakInterviewerQuestion(data.session.questions[0].question);
      }
    } catch (err) {
      console.error('Error starting live interview:', err);
    } finally {
      setStarting(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!session || !currentAnswer.trim() || submitting) return;
    setSubmitting(true);
    if (isRecordingSpeech && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecordingSpeech(false);
    }

    try {
      const data = await api.submitInterviewAnswer(
        user.id,
        session.id,
        session.currentQuestionIndex,
        currentAnswer
      );

      setSession(data.session);
      setCurrentAnswer('');
      setTimerSeconds(0);

      if (data.session.completed) {
        setStage('report');
        setIsTimerRunning(false);
        stopMediaStream();
      } else {
        // Read next question
        const nextQ = data.session.questions[data.session.currentQuestionIndex];
        if (nextQ) {
          speakInterviewerQuestion(nextQ.question);
        }
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ: MockInterviewQuestion | undefined = session?.questions[session.currentQuestionIndex];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
            <span className="flex items-center gap-1 font-mono uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Greenroom Studio
            </span>
            <span aria-hidden="true">·</span>
            <span>Indian Campus Placement Simulation</span>
            <span aria-hidden="true">·</span>
            <span>WPM & Filler Detection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Award className="h-6 w-6 text-orange-400" />
            <span>Greenroom Mock Interview Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Rehearse on-camera like a professional before facing Indian campus placement interviewers (TCS Digital, Flipkart, Tata Motors, Biocon). Test your webcam, mic, speech pace, and receive instant rubric scoring.
          </p>
        </div>

        {/* Studio Mode Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-400">Audio Voice:</span>
          <button
            onClick={() => setVoiceTTSActive(!voiceTTSActive)}
            className={`flex items-center gap-1 font-medium transition-colors ${
              voiceTTSActive ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {voiceTTSActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span>{voiceTTSActive ? 'Interviewer Voice ON' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
         STAGE 1: INTERVIEW CONFIGURATION
         ========================================================================= */}
      {stage === 'setup' && (
        <div className="max-w-2xl mx-auto rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Step 1 of 3: Role & Round Configuration
            </div>
            <h3 className="text-base font-bold text-white mt-1">Configure Your Placement Interview</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your target role and company placement tier before entering the Greenroom.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">Target Job Role in India</label>
              <input
                type="text"
                value={careerInput}
                onChange={(e) => setCareerInput(e.target.value)}
                placeholder="e.g. Data Analyst & Business Insights, Robotics Engineer, Full Stack..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-300 block mb-1.5">Campus Placement Round</label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="Technical">Technical Round (SQL, Code & Project)</option>
                  <option value="HR">HR Round (Why IT after Core, Relocation)</option>
                  <option value="Managerial">Managerial Round (Team Conflict & Deadlines)</option>
                  <option value="Aptitude & Core">Guesstimate & Core Engineering</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1.5">Company Hiring Tier</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="Beginner">Mass / Service Hiring (TCS Ninja, Infosys, ₹3.6-5 LPA)</option>
                  <option value="Intermediate">Digital / Differential Tier (TCS Digital, ₹7-10 LPA)</option>
                  <option value="Advanced">Product / Unicorn Tier (Flipkart, Swiggy, ₹14-25 LPA)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToGreenroom}
            disabled={!careerInput.trim()}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Proceed to Greenroom Check →</span>
          </button>
        </div>
      )}

      {/* =========================================================================
         STAGE 2: GREENROOM PRE-FLIGHT CHECK (Webcam, Mic VU Meter, Framing)
         ========================================================================= */}
      {stage === 'greenroom' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  Step 2 of 3: Greenroom Pre-Flight Check
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Camera, Microphone & Speech Readiness
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Target: {careerInput} · {interviewType}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Webcam Viewport with Framing Guide Box */}
              <div className="md:col-span-7 space-y-3">
                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />

                  {/* Framing Overlay Guide Box */}
                  <div className="absolute inset-8 border border-dashed border-white/20 pointer-events-none rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                      Align Face in Frame
                    </span>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-mono text-white">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        cameraActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                      }`}
                    ></span>
                    <span>{cameraActive ? 'GREENROOM LIVE' : 'CAMERA OFF'}</span>
                  </div>

                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2 bg-slate-950/80 p-4 text-center text-xs">
                      <VideoOff className="h-8 w-8 text-slate-600" />
                      <span>Camera preview inactive or permission denied</span>
                      <button
                        onClick={startGreenroomCheck}
                        className="px-3 py-1 rounded bg-slate-800 text-slate-200 text-xs hover:bg-slate-700"
                      >
                        Retry Camera
                      </button>
                    </div>
                  )}
                </div>

                {/* Camera / Mic Control Buttons */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleCamera}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 border transition-colors ${
                        cameraActive
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-rose-950/60 border-rose-800 text-rose-300'
                      }`}
                    >
                      {cameraActive ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
                      <span>{cameraActive ? 'Camera On' : 'Camera Off'}</span>
                    </button>

                    <button
                      onClick={toggleMic}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 border transition-colors ${
                        micActive
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-rose-950/60 border-rose-800 text-rose-300'
                      }`}
                    >
                      {micActive ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                      <span>{micActive ? 'Mic Active' : 'Mic Muted'}</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    {cameraActive && micActive ? '✓ All systems ready' : 'Hardware check required'}
                  </span>
                </div>

                {cameraError && (
                  <div className="text-[11px] text-amber-400 bg-amber-950/30 border border-amber-800/50 p-2.5 rounded-lg">
                    {cameraError}
                  </div>
                )}
              </div>

              {/* Greenroom Readiness Checklist & VU Audio Meter */}
              <div className="md:col-span-5 space-y-4 text-xs">
                {/* Real-Time Microphone VU Meter */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-orange-400" />
                      Live Audio Input Level (VU Meter)
                    </span>
                    <span className="font-mono text-emerald-400">{audioLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-75 rounded-full ${
                        audioLevel > 70
                          ? 'bg-rose-500'
                          : audioLevel > 20
                          ? 'bg-emerald-400'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${audioLevel}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Speak a sentence to test sensitivity</span>
                    <span>{audioLevel > 15 ? 'Good audio signal' : 'No sound detected'}</span>
                  </div>
                </div>

                {/* Pre-Flight Checklist */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="font-semibold text-slate-200">Placement Greenroom Protocol</div>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${cameraActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span>Webcam centered with clean lighting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${micActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span>Clear audio with zero background echo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>STAR framework primed (Situation, Task, Action, Result)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Targeting 120-150 WPM conversational speed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Launch Live Interview CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setStage('setup')}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                ← Back to Config
              </button>

              <button
                onClick={handleStartLiveInterview}
                disabled={starting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                {starting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Entering Placement Room...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Enter Live Interview (On Air) →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         STAGE 3: LIVE INTERVIEW STUDIO (Split Screen, Live Transcribe, Pace & Filler Tracker)
         ========================================================================= */}
      {stage === 'interview' && session && currentQ && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (5 cols): Candidate Greenroom Live Stream & Real-time Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span>LIVE ON AIR</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                    <Clock className="h-3.5 w-3.5 text-orange-400" />
                    <span>
                      {Math.floor(timerSeconds / 60)}:
                      {(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Candidate Camera Stream */}
                <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />

                  {/* VU Level Overlay Bar */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded flex items-center justify-between text-[10px] font-mono text-slate-300">
                    <span className="flex items-center gap-1">
                      <Mic className="h-3 w-3 text-orange-400" />
                      Mic
                    </span>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full transition-all"
                        style={{ width: `${audioLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Real-time Greenroom Telemetry Cards */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Speech Pace</div>
                    <div className="font-mono font-bold text-white mt-0.5">
                      {speechWPM > 0 ? `${speechWPM} WPM` : '--'}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      {speechWPM > 160 ? 'Too Fast' : speechWPM >= 110 ? 'Optimal' : speechWPM > 0 ? 'Paced' : 'Waiting'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Filler Words</div>
                    <div className="font-mono font-bold text-amber-400 mt-0.5">
                      {fillerWordCount}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      {fillerWordCount > 3 ? 'High' : 'Clean'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Words Spoken</div>
                    <div className="font-mono font-bold text-emerald-400 mt-0.5">
                      {currentAnswer.trim().split(/\s+/).filter(Boolean).length}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Words</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Interviewer Prompt, Live Speech Dictation, & Answering */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-orange-400 font-semibold uppercase">
                      Question {session.currentQuestionIndex + 1} of {session.questions.length} ({currentQ.type} Round)
                    </span>
                  </div>
                  <button
                    onClick={() => speakInterviewerQuestion(currentQ.question)}
                    className="flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 transition-colors"
                    title="Replay interviewer question audio"
                  >
                    <Volume1 className="h-3.5 w-3.5" />
                    <span>Repeat Audio</span>
                  </button>
                </div>

                {/* Interviewer Question Box */}
                <div className="text-base font-semibold text-white leading-relaxed p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  "{currentQ.question}"
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium">Recruiter Criteria: </span>
                  {currentQ.expectedKeyPoints.join(' · ')}
                </div>

                {/* Candidate Answering Area */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-slate-300">Your Answer (Speak or Type):</label>
                    <button
                      onClick={toggleSpeechRecognition}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border transition-colors ${
                        isRecordingSpeech
                          ? 'bg-rose-950/80 border-rose-700 text-rose-300 animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <Mic className="h-3.5 w-3.5" />
                      <span>{isRecordingSpeech ? 'Listening (Speak Now)...' : 'Dictate with Voice'}</span>
                    </button>
                  </div>

                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    rows={6}
                    placeholder="Speak your answer with the microphone, or type your response here. For Indian placement drives, state your college project metrics and structural problem-solving steps..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      stopMediaStream();
                      setStage('setup');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-300"
                  >
                    Quit Session
                  </button>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={submitting || !currentAnswer.trim()}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Evaluating Response with AI...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer & Next</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         STAGE 4: COMPREHENSIVE GREENROOM POST-INTERVIEW REPORT CARD
         ========================================================================= */}
      {stage === 'report' && session && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  Greenroom Performance & Placement Assessment
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {session.career} Candidate Evaluation
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Round: {session.interviewType} · Tier: {session.difficulty} · Candidate: {user.name} ({user.education.collegeTier || 'College'})
                </div>
              </div>

              <div className="text-right sm:min-w-[140px]">
                <div className="text-4xl font-bold text-emerald-400 font-mono tabular-nums">
                  {session.overallScore}/100
                </div>
                <div className="text-xs text-slate-400">Composite Score</div>
              </div>
            </div>

            {/* Rubric Breakdown Grid */}
            {session.breakdown && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Technical Depth</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {session.breakdown.technicalKnowledge}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Communication</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {session.breakdown.communication}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Problem Solving</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {session.breakdown.problemSolving}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Question Coverage</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {session.breakdown.questionCoverage}%
                  </div>
                </div>
              </div>
            )}

            {/* Executive Summary */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-orange-400">Interviewer Summary: </span>
              {session.summaryFeedback}
            </div>

            {/* Question Review & Turn-by-Turn Feedback */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">
                Question Turn-by-Turn Review
              </div>
              {session.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">
                      Q{idx + 1}: {q.question}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold shrink-0 ml-2">
                      {q.score || 75}/100
                    </span>
                  </div>
                  {q.userAnswer && (
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-400 italic">
                      "{q.userAnswer}"
                    </div>
                  )}
                  {q.feedback && (
                    <div className="text-slate-300">
                      <span className="text-orange-400 font-medium">Interviewer Feedback: </span>
                      {q.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                onClick={() => setStage('setup')}
                className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              >
                Start New Greenroom Session
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
              >
                Return to Placement Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
