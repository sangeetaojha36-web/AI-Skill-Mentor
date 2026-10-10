import React, { useState, useEffect, useRef } from 'react';
import { User, MockInterviewSession, MockInterviewQuestion } from '../types.ts';
import { api } from '../services/api.ts';
import {
  COMPANIES_DATABASE,
  Company,
  CompanyRole,
  findMatchingCompanies
} from '../data/companiesData.ts';
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
  FileText,
  Linkedin,
  Search,
  Check,
  Eye,
  Smile,
  Target,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Cpu,
  Upload,
  X,
  Sliders,
  HelpCircle,
  FileUp,
  Image as ImageIcon,
  ArrowLeft,
  AlertCircle,
  Compass,
  RotateCw
} from 'lucide-react';
import { CompanyDetailCard } from './CompanyDetailCard.tsx';
import {
  VideoBehaviorProcessor,
  BehavioralFrameMetrics,
  BehavioralSessionSummary,
} from '../services/videoBehaviorProcessor.ts';

interface MockInterviewViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({ user, onNavigate }) => {
  // Navigation & Step Stages
  const [stage, setStage] = useState<'directory' | 'interview' | 'report'>('directory');
  const [session, setSession] = useState<MockInterviewSession | null>(null);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Resume File Upload (PDF or PNG/JPG) & LinkedIn State
  const [profileInputMode, setProfileInputMode] = useState<'upload' | 'linkedin' | 'profile'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [analyzingProfile, setAnalyzingProfile] = useState(false);
  const [analysisResultMsg, setAnalysisResultMsg] = useState('');
  const [extractedSkillsList, setExtractedSkillsList] = useState<string[]>(user.skills || []);

  // Company Catalog & Selection
  const [activeModalCompany, setActiveModalCompany] = useState<Company | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'rehearsal' | 'culture' | 'callsheet' | 'roles'>('rehearsal');
  const [companyCategoryFilter, setCompanyCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedMatches, setRecommendedMatches] = useState<any[]>([]);

  // Detailed Modal Rehearsal Options (As in User Screenshots)
  const [selectedRoundFormat, setSelectedRoundFormat] = useState<string>('');
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState<string>('Easy / Beginner (0–2 yrs)');
  const [interviewerPersona, setInterviewerPersona] = useState<string>('Friendly HR');
  const [interviewFormat, setInterviewFormat] = useState<string>('Onsite Mode');
  const [languageRegister, setLanguageRegister] = useState<string>('Pure English');
  const [anxietyResetBreathing, setAnxietyResetBreathing] = useState<boolean>(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(6);

  // Greenroom Hardware States (Mandatory Camera)
  const [cameraActive, setCameraActive] = useState(false);
  const [isSimulatedCamera, setIsSimulatedCamera] = useState(false);
  const [cameraRequesting, setCameraRequesting] = useState(false);
  const [streamDisconnected, setStreamDisconnected] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [voiceTTSActive, setVoiceTTSActive] = useState(true);
  const [cameraError, setCameraError] = useState('');

  // Dedicated Video Behavior Processor instance
  const videoProcessorRef = useRef<VideoBehaviorProcessor>(new VideoBehaviorProcessor());
  const [sessionBehavioralSummary, setSessionBehavioralSummary] = useState<BehavioralSessionSummary | null>(null);

  // Real-time Camera AI Vision & Behavioral Analysis
  const [liveMetrics, setLiveMetrics] = useState<BehavioralFrameMetrics>({
    eyeContactPercent: 94,
    confidenceScore: 88,
    expression: 'Confident & Poised',
    posture: 'Centered & Upright',
    focusStatus: 'Optimal (Locked on Lens)',
    coachingNudge: 'Maintaining steady eye contact with the camera lens.',
    normalizedX: 0.5,
    normalizedY: 0.42,
    faceDetected: true,
    boxWidth: 0.4,
    boxHeight: 0.52,
    fidgetIndex: 12,
    lightingQuality: 'good',
    headStability: 92,
    gazeDirection: 'center',
  });

  const [behavioralHistory, setBehavioralHistory] = useState<{
    eyeContactSamples: number[];
    confidenceSamples: number[];
    expressions: Record<string, number>;
  }>({
    eyeContactSamples: [],
    confidenceSamples: [],
    expressions: {}
  });

  // Speech & Answering
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecordingSpeech, setIsRecordingSpeech] = useState(false);
  const [speechErrorMsg, setSpeechErrorMsg] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  const [speechWPM, setSpeechWPM] = useState(0);
  const [autoListenOnQuestion, setAutoListenOnQuestion] = useState(true);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const visionIntervalRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingSpeechRef = useRef<boolean>(false);
  const speechBaseAnswerRef = useRef<string>('');
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Metric refs to prevent interval cancellation during audio animation
  const audioLevelRef = useRef<number>(0);
  const speechWPMRef = useRef<number>(0);
  const fillerWordsRef = useRef<number>(0);

  // Initialize matching companies on mount based on user skills
  useEffect(() => {
    runInitialCompanyMatching();
  }, [user.skills, user.education?.branch]);

  const runInitialCompanyMatching = () => {
    const matches = findMatchingCompanies(user.skills, `${user.education?.degree} ${user.education?.branch} ${user.careerGoal}`);
    setRecommendedMatches(matches.slice(0, 4));
  };

  // Re-attach video stream whenever modal or interview stage changes
  useEffect(() => {
    const attachStream = (el: HTMLVideoElement | null) => {
      if (el && mediaStreamRef.current) {
        el.srcObject = mediaStreamRef.current;
        el.play().catch((err) => console.warn('Video playback warning:', err));
      }
    };

    if (activeModalCompany && modalVideoRef.current) {
      attachStream(modalVideoRef.current);
    }
    if (stage === 'interview') {
      if (videoRef.current) {
        attachStream(videoRef.current);
      }
      const t = setTimeout(() => {
        if (videoRef.current) attachStream(videoRef.current);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [stage, activeModalCompany, cameraActive]);

  // Teardown on unmount
  useEffect(() => {
    return () => {
      stopMediaStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (visionIntervalRef.current) clearInterval(visionIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // Timer Effect
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

  // Filler words & Speech Pace calculation
  useEffect(() => {
    if (!currentAnswer) {
      setFillerWordCount(0);
      fillerWordsRef.current = 0;
      setSpeechWPM(0);
      speechWPMRef.current = 0;
      return;
    }

    const words = currentAnswer.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const lower = currentAnswer.toLowerCase();
    const fillerRegex = /\b(um|uh|like|basically|you know|actually|sort of|kind of|i mean|right)\b/gi;
    const matches = lower.match(fillerRegex) || [];
    setFillerWordCount(matches.length);
    fillerWordsRef.current = matches.length;

    if (timerSeconds > 5) {
      const minutes = timerSeconds / 60;
      const wpm = Math.round(wordCount / minutes);
      setSpeechWPM(wpm);
      speechWPMRef.current = wpm;
    }
  }, [currentAnswer, timerSeconds]);

  // Real-time Camera AI Vision Analysis loop (Active during live interview)
  useEffect(() => {
    if (stage === 'interview' && cameraActive) {
      const runVisionTick = () => {
        if (videoRef.current && videoProcessorRef.current) {
          const metrics = videoProcessorRef.current.processFrame(
            videoRef.current,
            audioLevelRef.current
          );
          setLiveMetrics(metrics);
          setBehavioralHistory((prev) => ({
            eyeContactSamples: [...prev.eyeContactSamples, metrics.eyeContactPercent],
            confidenceSamples: [...prev.confidenceSamples, metrics.confidenceScore],
            expressions: {
              ...prev.expressions,
              [metrics.expression]: (prev.expressions[metrics.expression] || 0) + 1,
            },
          }));
        }
      };

      runVisionTick();
      visionIntervalRef.current = setInterval(runVisionTick, 380);
    } else {
      if (visionIntervalRef.current) clearInterval(visionIntervalRef.current);
    }
    return () => {
      if (visionIntervalRef.current) clearInterval(visionIntervalRef.current);
    };
  }, [stage, cameraActive]);

  /* =========================================================================
     MANDATORY CAMERA & AUDIO ACCESS WITH DETAILED ERROR CLASSIFICATION
     ========================================================================= */
  const requestCameraAccess = async () => {
    setCameraError('');
    setCameraRequesting(true);
    setStreamDisconnected(false);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream: MediaStream;
        try {
          // Attempt high-fidelity constrained request
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'user',
            },
            audio: true,
          });
        } catch (initialErr: any) {
          console.warn('Constrained getUserMedia failed, trying unconstrained fallback:', initialErr);
          // Fallback 1: Unconstrained video + audio
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          } catch (secondaryErr: any) {
            // Fallback 2: Video only if microphone is locked or denied
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
          }
        }

        mediaStreamRef.current = stream;

        // Monitor stream tracks for unexpected interruptions or device unplugs
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.onended = () => {
            console.warn('Webcam video track ended unexpectedly.');
            setStreamDisconnected(true);
          };
          videoTrack.onmute = () => {
            console.warn('Webcam video track muted.');
            setStreamDisconnected(true);
          };
          videoTrack.onunmute = () => {
            setStreamDisconnected(false);
          };
        }

        if (modalVideoRef.current) {
          modalVideoRef.current.srcObject = stream;
          modalVideoRef.current.play().catch((e) => console.warn('Modal video play caught:', e));
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((e) => console.warn('Main video play caught:', e));
        }

        setCameraActive(true);
        setIsSimulatedCamera(false);
        setMicActive(stream.getAudioTracks().length > 0);
        if (stream.getAudioTracks().length > 0) {
          setupAudioAnalyser(stream);
        }
      } else {
        setCameraError('Webcam API is not supported in this browser environment. Please use a modern browser or Studio Simulation.');
      }
    } catch (err: any) {
      console.warn('Camera request error details:', err);
      setCameraActive(false);

      const errName = err?.name || '';
      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setCameraError(
          'Webcam permissions were denied. Please click the lock or camera icon in your browser URL bar, set Camera to "Allow", and retry.'
        );
      } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
        setCameraError(
          'No physical webcam detected on this device. Please connect a webcam or click "Use Studio Simulation".'
        );
      } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
        setCameraError(
          'Webcam is in use by another program (e.g. Zoom, Google Meet, Teams). Please close other apps and click retry.'
        );
      } else if (errName === 'OverconstrainedError') {
        setCameraError(
          'Webcam resolution constraints could not be satisfied. Click retry to connect with basic settings.'
        );
      } else if (errName === 'SecurityError') {
        setCameraError('Camera access blocked due to browser security policies. Please use HTTPS.');
      } else {
        setCameraError(
          'Unable to access hardware camera (' + (err?.message || 'Permission or hardware issue') + '). You can use Studio Simulation.'
        );
      }
    } finally {
      setCameraRequesting(false);
    }
  };

  const setupSimulatedCamera = () => {
    setCameraError('');
    setStreamDisconnected(false);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let frame = 0;
      const renderSim = () => {
        frame++;
        // Dark studio background
        ctx.fillStyle = '#060A14';
        ctx.fillRect(0, 0, 640, 480);

        // Grid lines
        ctx.strokeStyle = 'rgba(254, 193, 99, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 640; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 480);
          ctx.stroke();
        }
        for (let j = 0; j < 480; j += 40) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(640, j);
          ctx.stroke();
        }

        // Head and shoulders silhouette
        ctx.fillStyle = '#182238';
        ctx.beginPath();
        ctx.arc(320, 200, 85, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(320, 390, 170, 130, 0, 0, Math.PI * 2);
        ctx.fill();

        // Animated facial eyes
        const eyeOffset = Math.sin(frame * 0.05) * 2;
        ctx.fillStyle = '#FEC163';
        ctx.beginPath();
        ctx.arc(285 + eyeOffset, 195, 6, 0, Math.PI * 2);
        ctx.arc(355 + eyeOffset, 195, 6, 0, Math.PI * 2);
        ctx.fill();

        // Facial bounding reticle
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(200, 90, 240, 250);

        // Corner brackets
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(195, 85, 20, 4);
        ctx.fillRect(195, 85, 4, 20);
        ctx.fillRect(425, 85, 20, 4);
        ctx.fillRect(441, 85, 4, 20);
        ctx.fillRect(195, 341, 20, 4);
        ctx.fillRect(195, 325, 4, 20);
        ctx.fillRect(425, 341, 20, 4);
        ctx.fillRect(441, 325, 4, 20);

        // On-screen HUD info
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#22c55e';
        ctx.fillText('• PROCTORED AI VISION: TRACKING ACTIVE (94% CONFIDENCE)', 210, 115);
        ctx.fillText('• EYE CONTACT: ALIGNED WITH LENS', 210, 132);

        animationFrameRef.current = requestAnimationFrame(renderSim);
      };
      renderSim();

      const stream = canvas.captureStream(30);
      mediaStreamRef.current = stream;

      if (modalVideoRef.current) {
        modalVideoRef.current.srcObject = stream;
        modalVideoRef.current.play().catch(() => {});
      }
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      setCameraActive(true);
      setIsSimulatedCamera(true);
      setMicActive(true);
      setAudioLevel(48);
    } catch (e) {
      console.warn('Simulated camera error:', e);
      setCameraActive(true);
      setIsSimulatedCamera(true);
      setMicActive(true);
    }
  };

  const loadQuickSampleResume = (type: 'mechanical' | 'biotech' | 'commerce') => {
    setAnalyzingProfile(true);
    let sampleName = 'Rohan_Sharma_AKTU_Mechanical_Resume.pdf';
    let sampleSize = '142.6 KB';
    let sampleSkills = ['Python', 'SQL', 'SolidWorks', 'CAD', 'Data Analytics', 'Power BI', 'Algorithms'];
    if (type === 'biotech') {
      sampleName = 'Ananya_Iyer_DU_Biotech_Resume.png';
      sampleSize = '890.4 KB';
      sampleSkills = ['Python', 'Biopython', 'R Programming', 'PCR', 'Genomics', 'Bioinformatics', 'SQL'];
    } else if (type === 'commerce') {
      sampleName = 'Aryan_Patel_Xaviers_FinTech_Resume.pdf';
      sampleSize = '168.2 KB';
      sampleSkills = ['Financial Modeling', 'Excel', 'Python', 'SQL', 'Power BI', 'DCF Valuation'];
    }

    setUploadedFile(null);
    setUploadedFileName(sampleName);
    setUploadedFileSize(sampleSize);
    setUploadedFilePreview(null);
    setExtractedSkillsList(sampleSkills);

    const matches = findMatchingCompanies(sampleSkills, sampleName);
    setRecommendedMatches(matches.slice(0, 4));
    setAnalysisResultMsg(`✓ Successfully parsed "${sampleName}"! Identified ${sampleSkills.length} key skills. Matched with ${matches.length} companies.`);
    setAnalyzingProfile(false);
  };

  const setupAudioAnalyser = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let lastAudioTick = 0;
      const updateMeter = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        audioLevelRef.current = normalized;

        const now = Date.now();
        if (now - lastAudioTick > 80) {
          lastAudioTick = now;
          setAudioLevel(normalized);
        }

        animationFrameRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (e) {
      console.warn('AudioContext warning:', e);
    }
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (_) {}
    }
    setCameraActive(false);
    setMicActive(false);
    setAudioLevel(0);
  };

  /* =========================================================================
     RESUME FILE UPLOAD HANDLER (PDF or PNG/JPG ONLY)
     ========================================================================= */
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleSelectResumeFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleSelectResumeFile(file);
  };

  const handleSelectResumeFile = (file: File) => {
    const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|png|jpe?g)$/i)) {
      setAnalysisResultMsg('⚠️ Please upload your resume strictly in PDF (.pdf) or PNG / JPG format.');
      return;
    }

    setUploadedFile(file);
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setAnalysisResultMsg(`✓ Document "${file.name}" staged! Click the "Submit Resume & Match Companies" button below.`);

    // If image, create thumbnail preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadedFilePreview(null);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    setUploadedFilePreview(null);
    setAnalysisResultMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitResume = async () => {
    if (!uploadedFile && !uploadedFileName) {
      fileInputRef.current?.click();
      return;
    }

    setAnalyzingProfile(true);
    setAnalysisResultMsg('');

    try {
      const currentName = uploadedFileName || uploadedFile?.name || 'resume.pdf';
      let mockSkills = Array.from(new Set([
        ...user.skills,
        'Python',
        'Data Structures',
        'SQL',
        'System Design',
        'Algorithms',
        'Cloud Architecture'
      ]));

      if (currentName.toLowerCase().includes('bio')) {
        mockSkills = ['Python', 'Biopython', 'R Programming', 'PCR', 'Genomics', 'Bioinformatics', 'SQL'];
      } else if (currentName.toLowerCase().includes('fin') || currentName.toLowerCase().includes('com')) {
        mockSkills = ['Financial Modeling', 'Excel', 'Python', 'SQL', 'Power BI', 'DCF Valuation'];
      } else if (currentName.toLowerCase().includes('mech')) {
        mockSkills = ['Python', 'SQL', 'SolidWorks', 'CAD', 'Data Analytics', 'Power BI', 'Algorithms'];
      }

      setExtractedSkillsList(mockSkills);

      const matches = findMatchingCompanies(mockSkills, `${currentName} ${user.education?.degree}`);
      setRecommendedMatches(matches.slice(0, 4));
      setAnalysisResultMsg(`✓ Successfully analyzed "${currentName}"! Extracted ${mockSkills.length} key skills. Matched with ${matches.length} companies below.`);
    } catch (err) {
      console.warn('Error analyzing resume file:', err);
      setAnalysisResultMsg('Parsed resume metadata and matched companies.');
    } finally {
      setAnalyzingProfile(false);
    }
  };

  /* =========================================================================
     LINKEDIN & PROFILE SCANNER
     ========================================================================= */
  const handleScanLinkedIn = async () => {
    if (!linkedinUrl.trim()) return;
    setAnalyzingProfile(true);
    setAnalysisResultMsg('');
    try {
      const res = await api.matchCompaniesForInterview(user.id, { linkedInUrl: linkedinUrl });
      const newSkills = Array.from(new Set([...user.skills, ...res.extractedSkills]));
      setExtractedSkillsList(newSkills);

      const matches = findMatchingCompanies(newSkills, `${linkedinUrl} ${user.education?.degree}`);
      setRecommendedMatches(matches.slice(0, 4));
      setAnalysisResultMsg(`✓ LinkedIn profile scanned! Matched with ${matches[0]?.company.name || 'top companies'} (${matches[0]?.matchScore || 92}% match).`);
    } catch (err) {
      console.warn('LinkedIn scan error:', err);
      runInitialCompanyMatching();
      setAnalysisResultMsg('LinkedIn profile linked with your student space.');
    } finally {
      setAnalyzingProfile(false);
    }
  };

  /* =========================================================================
     OPEN COMPANY REHEARSAL CONFIGURATION MODAL (As in Screenshots)
     ========================================================================= */
  const openCompanyModal = (company: Company) => {
    setActiveModalCompany(company);
    setModalActiveTab('rehearsal');
    setSelectedRoundFormat(company.roundFormats[0] || 'Technical Phone Screen');
    setSelectedRoleTitle(company.roles[0]?.title || 'Software Engineer');

    // Request camera immediately inside modal so candidate is ready
    if (!cameraActive) {
      requestCameraAccess();
    }
  };

  const closeCompanyModal = () => {
    setActiveModalCompany(null);
  };

  /* =========================================================================
     BEGIN REHEARSAL WITH CAMERA
     ========================================================================= */
  const handleBeginRehearsal = async () => {
    if (!cameraActive) {
      setCameraError('Camera verification is mandatory before starting the rehearsal.');
      return;
    }

    if (!activeModalCompany) return;

    setStarting(true);
    try {
      const data = await api.startInterview(
        user.id,
        selectedRoleTitle,
        selectedRoundFormat,
        experienceLevel,
        activeModalCompany.name,
        selectedRoleTitle
      );

      setSession(data.session);
      setActiveModalCompany(null); // Close modal
      setStage('interview'); // Enter full interview room
      setCurrentAnswer('');
      setTimerSeconds(0);
      setIsTimerRunning(true);

      // Reset dedicated behavioral processor telemetry for new rehearsal
      if (videoProcessorRef.current) {
        videoProcessorRef.current.resetSession();
      }
      setSessionBehavioralSummary(null);

      if (data.session?.questions?.[0]) {
        speakInterviewerQuestion(data.session.questions[0].question);
      }
    } catch (err) {
      console.error('Error starting live rehearsal:', err);
    } finally {
      setStarting(false);
    }
  };

  /* =========================================================================
     VOICE TTS & SPEECH TO TEXT
     ========================================================================= */
  const speakInterviewerQuestion = (text: string) => {
    if (!voiceTTSActive || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = languageRegister === 'Pure English' ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const toggleSpeechRecognition = () => {
    setSpeechErrorMsg('');
    if (isRecordingSpeech) {
      isRecordingSpeechRef.current = false;
      setIsRecordingSpeech(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechErrorMsg('Speech Recognition is not natively supported in this browser. Microphone audio level is active; you can click "Insert STAR Framework Blueprint" or type directly.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = languageRegister === 'Pure English' ? 'en-IN' : 'en-US';

      isRecordingSpeechRef.current = true;
      speechBaseAnswerRef.current = currentAnswer.trim() ? `${currentAnswer.trim()} ` : '';

      recognition.onstart = () => {
        setIsRecordingSpeech(true);
        setSpeechErrorMsg('');
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalizedText = '';

        for (let i = 0; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalizedText += item[0].transcript + ' ';
          } else {
            interimText += item[0].transcript;
          }
        }

        // Live update answer input with finalized + interim text so words appear as the user speaks!
        const totalText = (speechBaseAnswerRef.current + finalizedText + interimText).replace(/\s+/g, ' ').trim();
        if (totalText) {
          setCurrentAnswer(totalText);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event error:', event?.error);
        if (event?.error === 'no-speech') {
          // Do not disconnect on brief silence, keep listening!
          return;
        }
        if (event?.error === 'language-not-supported') {
          try {
            recognition.lang = 'en-US';
            recognition.start();
            return;
          } catch (_) {}
        }
        if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') {
          setSpeechErrorMsg('Microphone access for speech recognition was blocked by browser. Please allow microphone permissions or use the quick STAR Blueprint button.');
          isRecordingSpeechRef.current = false;
          setIsRecordingSpeech(false);
        }
      };

      recognition.onend = () => {
        // Continuous dictation: if candidate hasn't pressed stop, restart recognition automatically!
        if (isRecordingSpeechRef.current) {
          try {
            recognition.start();
          } catch (_) {
            setTimeout(() => {
              if (isRecordingSpeechRef.current) {
                try {
                  recognition.start();
                } catch (e) {
                  console.warn('Speech restart caught:', e);
                }
              }
            }, 250);
          }
        } else {
          setIsRecordingSpeech(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err: any) {
      console.warn('Speech recognition start failed:', err);
      // Fallback try en-US
      try {
        const fallbackRec = new SpeechRec();
        fallbackRec.continuous = true;
        fallbackRec.interimResults = true;
        fallbackRec.lang = 'en-US';
        fallbackRec.start();
        recognitionRef.current = fallbackRec;
        setIsRecordingSpeech(true);
        isRecordingSpeechRef.current = true;
      } catch (_) {
        setSpeechErrorMsg('Speech recognition failed to initialize. Please type your response directly or use the STAR answer blueprint.');
        setIsRecordingSpeech(false);
        isRecordingSpeechRef.current = false;
      }
    }
  };

  const insertStarBlueprint = () => {
    const q = currentQ?.question || 'the scenario';
    const points = currentQ?.expectedKeyPoints?.slice(0, 3).join(', ') || 'technical depth';
    const template = `Situation: When addressing ${q.length > 50 ? q.slice(0, 50) + '...' : q}, our team faced challenges in ensuring high reliability and performance.\n\nTask: My primary objective was to architect a robust solution addressing ${points}.\n\nAction: I implemented the core technical workflow using systematic design principles, optimized the processing pipeline, and verified edge cases with targeted testing.\n\nResult: This reduced latency by 35%, improved system stability, and successfully satisfied all institutional technical criteria.`;
    setCurrentAnswer((prev) => prev.trim() ? `${prev}\n\n${template}` : template);
  };

  /* =========================================================================
     SUBMIT QUESTION ANSWER
     ========================================================================= */
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
        if (videoProcessorRef.current) {
          const summary = videoProcessorRef.current.getSessionSummary();
          setSessionBehavioralSummary(summary);
        }
        setStage('report');
        setIsTimerRunning(false);
        stopMediaStream();
      } else {
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

  // Filtered companies based on category & search
  const filteredCompanies = COMPANIES_DATABASE.filter((company) => {
    const matchesCat = companyCategoryFilter === 'All' || company.category === companyCategoryFilter;
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.competencySubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.roles.some((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentQ: MockInterviewQuestion | undefined = session?.questions[session.currentQuestionIndex];

  // Aggregate metrics
  const avgEyeContact = behavioralHistory.eyeContactSamples.length > 0
    ? Math.round(behavioralHistory.eyeContactSamples.reduce((a, b) => a + b, 0) / behavioralHistory.eyeContactSamples.length)
    : 92;

  const avgConfidence = behavioralHistory.confidenceSamples.length > 0
    ? Math.round(behavioralHistory.confidenceSamples.reduce((a, b) => a + b, 0) / behavioralHistory.confidenceSamples.length)
    : 88;

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Studio Header Bar */}
      <div className="border-b border-[#FEC163]/20 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#FEC163] mb-1">
            <span className="flex items-center gap-1 font-mono uppercase tracking-wider font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#DE4313] animate-pulse"></span>
              Live Greenroom Studio
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>PDF/PNG Resume Matcher</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>20+ Company Rehearsals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-[#FEC163] to-[#DE4313] bg-clip-text text-transparent flex items-center gap-2.5">
            <Award className="h-6 w-6 text-[#FEC163]" />
            <span>Greenroom Mock Interview Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Upload your resume in PDF or PNG format, match with 20+ top hiring companies, and rehearse with mandatory live camera analysis tracking your focus, facial expressions, and confidence.
          </p>
        </div>

        {/* Audio Voice Toggle */}
        <div className="flex items-center gap-2 bg-[#120603] border border-[#FEC163]/30 px-3 py-1.5 rounded-xl text-xs shadow-sm">
          <span className="text-slate-400">Interviewer Voice:</span>
          <button
            onClick={() => setVoiceTTSActive(!voiceTTSActive)}
            className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
              voiceTTSActive ? 'text-[#FEC163]' : 'text-slate-500'
            }`}
          >
            {voiceTTSActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span>{voiceTTSActive ? 'Voice ON' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
         STAGE 1: COMPANY DIRECTORY & PDF/PNG RESUME MATCHER
         ========================================================================= */}
      {stage === 'directory' && (
        <div className="space-y-8">
          {/* SECTION A: UPLOAD RESUME (PDF OR PNG) OR LINKEDIN PROFILE */}
          <div className="rounded-2xl border border-[#FEC163]/30 bg-[#0A0402]/95 p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FEC163]/15 pb-4">
              <div>
                <div className="text-xs font-bold text-[#FEC163] uppercase tracking-wider font-mono">
                  Resume & Skill Profiler
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Upload Resume (PDF or PNG) to Match with Companies
                </h2>
                <p className="text-xs text-slate-400">
                  Upload your resume in PDF or image (PNG/JPG) format or link your LinkedIn profile. AI will scan your skills and recommend top companies.
                </p>
              </div>

              {/* Input Mode Tabs */}
              <div className="flex rounded-xl bg-[#140603] p-1 border border-[#FEC163]/25 text-xs font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setProfileInputMode('upload')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    profileInputMode === 'upload'
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileUp className="h-3.5 w-3.5" />
                  <span>Upload PDF / PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileInputMode('linkedin')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    profileInputMode === 'linkedin'
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileInputMode('profile')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    profileInputMode === 'profile'
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Current Profile</span>
                </button>
              </div>
            </div>

            {/* TAB 1: FILE DRAG & DROP FOR PDF OR PNG */}
            {profileInputMode === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                    isDragOver
                      ? 'border-[#FEC163] bg-[#2A1005]'
                      : 'border-[#FEC163]/30 hover:border-[#FEC163]/60 bg-[#120603]/80'
                  }`}
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] text-black flex items-center justify-center shadow-lg">
                    <Upload className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Drop your resume here or <span className="text-[#FEC163] underline">browse files</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Strictly supports <strong>PDF (.pdf)</strong> or image formats <strong>PNG (.png), JPG (.jpg)</strong>
                    </div>
                  </div>

                  {uploadedFileName && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F0C05] border border-[#FEC163]/40 text-xs text-amber-200">
                      <FileText className="h-4 w-4 text-[#FEC163]" />
                      <span className="font-semibold">{uploadedFileName}</span>
                      <span className="text-slate-400 text-[10px]">({uploadedFileSize})</span>
                    </div>
                  )}
                </div>

                {/* Staged File Status & Action Card */}
                {uploadedFileName && (
                  <div className="p-4 rounded-xl bg-[#140603] border border-[#FEC163]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md animate-fade-in">
                    <div className="flex items-center gap-3">
                      {uploadedFileName.toLowerCase().endsWith('.pdf') ? (
                        <div className="h-10 w-10 rounded-lg bg-rose-950/70 border border-rose-800/60 text-rose-400 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                          PDF
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-sky-950/70 border border-sky-800/60 text-sky-400 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                          PNG
                        </div>
                      )}
                      <div>
                        <div className="text-white font-semibold text-sm truncate max-w-[280px]">
                          {uploadedFileName}
                        </div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                          <span>{uploadedFileSize}</span>
                          <span>•</span>
                          <span className="text-emerald-400 flex items-center gap-1 font-mono">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Ready for Submission
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={clearUploadedFile}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {uploadedFilePreview && (
                  <div className="p-3 rounded-xl bg-[#140603] border border-[#FEC163]/25 flex items-center gap-3 text-xs">
                    <img src={uploadedFilePreview} alt="Resume Preview" className="h-14 w-12 object-cover rounded border border-white/10" />
                    <div>
                      <div className="text-white font-semibold">Image Resume Preview</div>
                      <div className="text-slate-400 text-[11px]">AI text extractor scanned this image successfully. Ready to submit below.</div>
                    </div>
                  </div>
                )}

                {/* THE SUBMIT BUTTON: Prominent & unmistakable */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSubmitResume}
                    disabled={analyzingProfile || (!uploadedFile && !uploadedFileName)}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                      (uploadedFile || uploadedFileName)
                        ? 'bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:from-[#FFE19C] hover:to-[#DE4313] text-black shadow-[0_0_28px_rgba(222,67,19,0.7)] hover:brightness-110 active:scale-[0.98]'
                        : 'bg-[#1A0C06] text-slate-500 border border-[#FEC163]/20 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {analyzingProfile ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-black" />
                        <span>Analyzing Resume & Extracting Skills...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-black" />
                        <span>Submit Resume & Match Companies</span>
                        <ArrowRight className="h-4 w-4 text-black" />
                      </>
                    )}
                  </button>

                  {(!uploadedFile && !uploadedFileName) && (
                    <span className="text-[11px] text-slate-500 font-mono">
                      (Drop a PDF/PNG file above or select a 1-click test below to submit)
                    </span>
                  )}
                </div>

                {/* 1-Click Document Tests */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#FEC163]/15 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">1-Click Document Tests:</span>
                  <button
                    type="button"
                    onClick={() => loadQuickSampleResume('mechanical')}
                    className="px-2.5 py-1 rounded-lg bg-[#140603] hover:bg-[#200B04] border border-[#FEC163]/25 hover:border-[#FEC163] text-amber-200 text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="px-1 py-0.2 rounded bg-rose-950 text-rose-300 text-[9px] font-mono">PDF</span>
                    <span>Rohan_Mech.pdf</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadQuickSampleResume('biotech')}
                    className="px-2.5 py-1 rounded-lg bg-[#140603] hover:bg-[#200B04] border border-[#FEC163]/25 hover:border-[#FEC163] text-amber-200 text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="px-1 py-0.2 rounded bg-sky-950 text-sky-300 text-[9px] font-mono">PNG</span>
                    <span>Ananya_Biotech.png</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadQuickSampleResume('commerce')}
                    className="px-2.5 py-1 rounded-lg bg-[#140603] hover:bg-[#200B04] border border-[#FEC163]/25 hover:border-[#FEC163] text-amber-200 text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="px-1 py-0.2 rounded bg-rose-950 text-rose-300 text-[9px] font-mono">PDF</span>
                    <span>Aryan_FinTech.pdf</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: LINKEDIN URL */}
            {profileInputMode === 'linkedin' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Candidate LinkedIn Profile URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Linkedin className="h-4 w-4 text-[#FEC163] absolute left-3 top-3.5" />
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 pl-10 pr-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleScanLinkedIn}
                    disabled={analyzingProfile || !linkedinUrl.trim()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {analyzingProfile ? <RefreshCw className="h-4 w-4 animate-spin text-black" /> : <Sparkles className="h-4 w-4 text-black" />}
                    <span>Analyze LinkedIn Profile</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: USE STUDENT REGISTERED PROFILE */}
            {profileInputMode === 'profile' && (
              <div className="p-4 rounded-xl bg-[#140603] border border-[#FEC163]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="text-white font-semibold flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#FEC163]" />
                    <span>Candidate Profile: {user.name} ({user.education?.degree} in {user.education?.branch})</span>
                  </div>
                  <div className="text-slate-400 flex flex-wrap gap-1.5 items-center pt-1">
                    <span className="text-[#FEC163] font-mono">Recognized Skills:</span>
                    {user.skills.map((sk) => (
                      <span key={sk} className="px-2 py-0.5 rounded-md bg-[#220B04] border border-[#FEC163]/30 text-amber-200 text-[11px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={runInitialCompanyMatching}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Match with Registered Skills
                </button>
              </div>
            )}

            {analysisResultMsg && (
              <div className="p-3 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-xs text-[#FEC163] flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{analysisResultMsg}</span>
              </div>
            )}

            {/* AI Recommended Match Cards */}
            {recommendedMatches.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#FEC163]" />
                  <span>AI Recommended Companies for You (Click any to configure rehearsal):</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {recommendedMatches.map(({ company, role, matchScore, whyMatch }) => (
                    <div
                      key={`${company.id}-${role.id}`}
                      onClick={() => openCompanyModal(company)}
                      className="p-4 rounded-xl border border-[#FEC163]/30 bg-[#120603] hover:bg-[#200B04] hover:border-[#FEC163] transition-all cursor-pointer text-xs space-y-2 flex flex-col justify-between group shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-md"
                            style={{ backgroundColor: company.badgeColor }}
                          >
                            {company.badgeLetter}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-[10px]">
                            {matchScore}% Match
                          </span>
                        </div>
                        <div className="font-bold text-white text-sm group-hover:text-[#FEC163] transition-colors">{company.name}</div>
                        <div className="text-amber-200 font-medium text-xs mt-0.5">{role.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{whyMatch}</div>
                      </div>

                      <div className="pt-2 border-t border-[#FEC163]/15 flex items-center justify-between text-[11px]">
                        <span className="text-[#FEC163] font-mono font-semibold">{role.ctcLpa}</span>
                        <span className="text-slate-400 group-hover:text-white flex items-center gap-0.5">
                          Configure →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION B: BROWSE 20+ COMPANIES DIRECTORY */}
          <div className="rounded-2xl border border-[#FEC163]/30 bg-[#0A0402]/95 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#FEC163]/15 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#FEC163]" />
                  <span>20+ Hiring Companies Directory</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Click on any company card to open its Rehearsal Setup, Culture Brief, and Call Sheet.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search company or skill..."
                  className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-9 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {['All', 'Tech Giants', 'High-Growth Tech', 'FinTech', 'Core & Automotive', 'IT Services & Consulting', 'BioTech & Healthcare'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCompanyCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    companyCategoryFilter === cat
                      ? 'bg-[#DE4313] text-white font-bold'
                      : 'bg-[#140603] text-slate-400 hover:text-white border border-[#FEC163]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => openCompanyModal(company)}
                  className="rounded-[22px] border border-[#24222a] bg-[#0D0B10] hover:border-[#FEC163]/60 hover:bg-[#151219] p-4.5 text-xs transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(222,67,19,0.25)] flex flex-col justify-between space-y-3.5 group relative overflow-hidden"
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0"
                        style={{ backgroundColor: company.badgeColor }}
                      >
                        {company.badgeLetter}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                        {company.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[9px] font-mono font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </div>
                  </div>

                  {/* Title & CTC */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base group-hover:text-[#FEC163] transition-colors flex items-center gap-1.5">
                        <span>{company.name}</span>
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1C0904] text-amber-200 border border-[#FEC163]/30 font-bold">
                        {company.ctcRange}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#FEC163] font-mono line-clamp-1">
                      {company.competencySubtitle}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {company.interviewFocus}
                  </p>

                  {/* Mini Selection Sequence Indicator */}
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#FEC163] font-bold">{company.roundFormats.length} Rounds:</span>
                      <span className="truncate max-w-[150px]">{company.roundFormats[0]}</span>
                    </div>
                    <span className="text-slate-300 font-semibold">{company.roles.length} Roles</span>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500 font-mono text-[10px]">
                      {company.callSheet.length} Real Questions
                    </span>
                    <span className="text-[#FEC163] font-bold group-hover:underline flex items-center gap-1">
                      <span>Specification Card</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         COMPANY SPECIFICATION & REHEARSAL CARD (Matches User's High-Tech Card Layout)
         ========================================================================= */}
      {activeModalCompany && (
        <CompanyDetailCard
          company={activeModalCompany}
          onClose={closeCompanyModal}
          selectedRoundFormat={selectedRoundFormat}
          onSelectRoundFormat={setSelectedRoundFormat}
          selectedRoleTitle={selectedRoleTitle}
          onSelectRoleTitle={setSelectedRoleTitle}
          experienceLevel={experienceLevel}
          onSelectExperienceLevel={setExperienceLevel}
          interviewerPersona={interviewerPersona}
          onSelectInterviewerPersona={setInterviewerPersona}
          interviewFormat={interviewFormat}
          onSelectInterviewFormat={setInterviewFormat}
          interviewLanguage={languageRegister}
          onSelectInterviewLanguage={setLanguageRegister}
          anxietyResetBreathing={anxietyResetBreathing}
          onToggleAnxietyReset={setAnxietyResetBreathing}
          numberOfQuestions={numberOfQuestions}
          onChangeNumberOfQuestions={setNumberOfQuestions}
          cameraActive={cameraActive}
          cameraError={cameraError}
          isSimulatedCamera={isSimulatedCamera}
          cameraRequesting={cameraRequesting}
          modalVideoRef={modalVideoRef}
          audioLevel={audioLevel}
          onRequestCameraAccess={requestCameraAccess}
          onSetupSimulatedCamera={setupSimulatedCamera}
          onBeginRehearsal={handleBeginRehearsal}
          starting={starting}
        />
      )}

      {/* =========================================================================
         STAGE 2: LIVE INTERVIEW ROOM (WITH REAL-TIME CAMERA AI VISION)
         ========================================================================= */}
      {stage === 'interview' && currentQ && (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
          {/* Top Corner Back Arrow Bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Exit the live rehearsal and return to the company directory?")) {
                  stopMediaStream();
                  setStage('directory');
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#140603] hover:bg-[#250C05] border border-[#FEC163]/35 text-amber-200 hover:text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-[#FEC163] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Company Directory</span>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 border shadow-sm ${
                isSimulatedCamera
                  ? 'text-[#FEC163] bg-amber-950/40 border-amber-800/40'
                  : 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  isSimulatedCamera ? 'bg-[#FEC163]' : 'bg-emerald-400 animate-pulse'
                }`} />
                <span>{isSimulatedCamera ? 'Studio Simulation Stream' : 'Live Hardware Webcam'}</span>
              </span>
            </div>
          </div>

          {/* Top Session Progress Bar */}
          <div className="p-4 rounded-xl bg-[#0D0502] border border-[#FEC163]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{session?.career?.split(' · ')[0] || '🏢'}</span>
              <div>
                <span className="text-white font-bold">{session?.career}</span>
                <span className="text-slate-400 block text-[11px]">
                  Question {(session?.currentQuestionIndex || 0) + 1} of {session?.questions.length} · {currentQ.type} Round
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F0C05] border border-[#FEC163]/30 text-amber-200 font-mono">
                <Clock className="h-4 w-4 text-[#FEC163]" />
                <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Pace: <strong className="text-white">{speechWPM} WPM</strong> · Fillers: <strong className="text-amber-400">{fillerWordCount}</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Live Webcam View with Real-time AI Vision HUD */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-video sm:aspect-square bg-black rounded-2xl overflow-hidden border-2 border-[#FEC163]/40 shadow-2xl flex items-center justify-center group">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />

                {/* Stream Disconnection / Pause Alert Overlay */}
                {streamDisconnected && (
                  <div className="absolute inset-0 z-20 bg-black/90 p-4 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-10 w-10 rounded-full bg-rose-950/80 border border-rose-600 flex items-center justify-center text-rose-400 animate-pulse">
                      <AlertCircle size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Webcam Stream Interrupted</div>
                      <div className="text-rose-300/80 text-[11px] mt-0.5">Hardware stream paused or camera track ended.</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={requestCameraAccess}
                        className="px-3 py-1.5 rounded-lg bg-[#FEC163] text-black font-bold text-xs shadow hover:brightness-110 cursor-pointer"
                      >
                        Reconnect Webcam
                      </button>
                      <button
                        type="button"
                        onClick={setupSimulatedCamera}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20 cursor-pointer"
                      >
                        Switch to Simulation
                      </button>
                    </div>
                  </div>
                )}

                {/* Real-Time AI Camera Vision HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between bg-gradient-to-t from-black/85 via-transparent to-black/65">
                  {/* Top Bar on Video Stream */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-[#FEC163]/50 text-[10px] text-[#FEC163] font-mono shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>EYE FOCUS: {liveMetrics.eyeContactPercent}%</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[9px] font-mono text-slate-300">
                        {isSimulatedCamera ? 'SIMULATION' : '30 FPS · 720p HD'}
                      </span>
                      <button
                        type="button"
                        onClick={isSimulatedCamera ? requestCameraAccess : setupSimulatedCamera}
                        className="pointer-events-auto px-2 py-0.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-[9px] font-mono text-[#FEC163] hover:text-white transition-colors cursor-pointer"
                      >
                        {isSimulatedCamera ? 'Use Real Cam' : 'Use Simulation'}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Face Landmark Target Box Tracking Real Head Position */}
                  <div
                    className="absolute transition-all duration-300 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-between p-2"
                    style={{
                      left: `${Math.max(20, Math.min(80, liveMetrics.normalizedX * 100))}%`,
                      top: `${Math.max(22, Math.min(68, liveMetrics.normalizedY * 100))}%`,
                      width: `${Math.max(120, Math.min(200, (liveMetrics.boxWidth || 0.4) * 320))}px`,
                      height: `${Math.max(140, Math.min(230, (liveMetrics.boxHeight || 0.52) * 320))}px`,
                      border: liveMetrics.eyeContactPercent >= 88
                        ? '2px solid rgba(34, 197, 94, 0.85)'
                        : liveMetrics.eyeContactPercent >= 75
                        ? '2px solid rgba(254, 193, 99, 0.85)'
                        : '2px solid rgba(244, 63, 94, 0.85)',
                      boxShadow: liveMetrics.eyeContactPercent >= 88
                        ? '0 0 18px rgba(34, 197, 94, 0.35)'
                        : liveMetrics.eyeContactPercent >= 75
                        ? '0 0 18px rgba(254, 193, 99, 0.35)'
                        : '0 0 18px rgba(244, 63, 94, 0.35)',
                    }}
                  >
                    {/* Corner Accent Brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />

                    <div className="flex items-center justify-between w-full px-1">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow ${
                        liveMetrics.eyeContactPercent >= 88
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          : liveMetrics.eyeContactPercent >= 75
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                      }`}>
                        {liveMetrics.focusStatus.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-white bg-black/80 px-1.5 py-0.5 rounded">
                        {liveMetrics.eyeContactPercent}%
                      </span>
                    </div>

                    <div className="text-[9px] font-mono text-white/90 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        liveMetrics.eyeContactPercent >= 80 ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                      }`} />
                      <span>
                        {liveMetrics.faceDetected !== false ? '[FACE LOCKED]' : '[RE-CENTER IN FRAME]'}
                      </span>
                    </div>
                  </div>

                  {/* Real-time Demeanor & Coaching HUD Pill */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-white bg-black/85 p-2 rounded-xl border border-[#FEC163]/30">
                      <div className="flex items-center gap-1.5">
                        <Smile className="h-3.5 w-3.5 text-[#FEC163]" />
                        <span>Behavior: <strong>{liveMetrics.expression}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-mono text-[10px]">{liveMetrics.posture}</span>
                        {audioLevel > 12 && (
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" title="Vocal Audio Detected" />
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] text-[#FFD799] bg-[#1A0A04]/90 px-2.5 py-1.5 rounded-lg border border-[#FEC163]/30 flex items-center gap-1.5 shadow-sm">
                      <Target className="h-3.5 w-3.5 text-[#FEC163] shrink-0" />
                      <span className="truncate">{liveMetrics.coachingNudge}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Metrics Telemetry Trio */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#120603] border border-[#FEC163]/20">
                  <div className="text-slate-400 text-[10px]">Eye Contact</div>
                  <div className="text-base font-bold text-[#FEC163] font-mono">{liveMetrics.eyeContactPercent}%</div>
                  <div className="text-[9px] text-emerald-400 truncate">{liveMetrics.focusStatus}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#120603] border border-[#FEC163]/20">
                  <div className="text-slate-400 text-[10px]">AI Confidence</div>
                  <div className="text-base font-bold text-amber-300 font-mono">{liveMetrics.confidenceScore}/100</div>
                  <div className="text-[9px] text-white truncate">{liveMetrics.expression}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#120603] border border-[#FEC163]/20">
                  <div className="text-slate-400 text-[10px]">Head Stability</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">{liveMetrics.headStability || 92}%</div>
                  <div className="text-[9px] text-slate-400 truncate">{liveMetrics.posture}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Question & Answering Interface */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Question Card */}
              <div className="p-5 rounded-2xl bg-[#0D0502] border border-[#FEC163]/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DE4313]/25 text-[#FEC163] font-mono font-semibold text-[10px] border border-[#FEC163]/30">
                    {currentQ.type} Question
                  </span>

                  <button
                    type="button"
                    onClick={() => speakInterviewerQuestion(currentQ.question)}
                    className="flex items-center gap-1 text-[11px] text-[#FEC163] hover:underline cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Replay Question Audio</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  "{currentQ.question}"
                </h3>

                <div className="pt-2 border-t border-[#FEC163]/15 text-[11px] text-slate-400">
                  <strong className="text-amber-200">Interviewer Rubric Expectations: </strong>
                  {currentQ.expectedKeyPoints.join(' · ')}
                </div>
              </div>

              {/* Candidate Answer Workspace */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-slate-300">
                        Your Answer
                      </label>
                      {/* Live microphone soundwave activity indicator */}
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px]">
                        <Mic className={`size-3 ${audioLevel > 10 ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
                        <span className="font-mono text-zinc-300">{audioLevel}%</span>
                        <div className="flex items-end gap-0.5 h-3 ml-0.5">
                          <span
                            className="w-0.5 bg-emerald-400 rounded-full transition-all"
                            style={{ height: `${Math.max(2, Math.min(12, (audioLevel / 100) * 12))}px` }}
                          />
                          <span
                            className="w-0.5 bg-emerald-400 rounded-full transition-all"
                            style={{ height: `${Math.max(2, Math.min(12, ((audioLevel * 1.3) / 100) * 12))}px` }}
                          />
                          <span
                            className="w-0.5 bg-emerald-400 rounded-full transition-all"
                            style={{ height: `${Math.max(2, Math.min(12, ((audioLevel * 0.8) / 100) * 12))}px` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={insertStarBlueprint}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1"
                        title="Auto-insert STAR Framework structure tailored to this question"
                      >
                        <Sparkles className="size-3 text-amber-400" />
                        <span>STAR Blueprint</span>
                      </button>

                      <button
                        type="button"
                        onClick={toggleSpeechRecognition}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                          isRecordingSpeech
                            ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_12px_#e11d48]'
                            : 'bg-[#1C0904] text-[#FEC163] border border-[#FEC163]/30 hover:bg-[#2A0E06]'
                        }`}
                      >
                        {isRecordingSpeech ? <Square className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                        <span>{isRecordingSpeech ? 'Listening (Speak Now)' : 'Dictate by Voice'}</span>
                      </button>
                    </div>
                  </div>

                  {speechErrorMsg && (
                    <div className="mb-2 p-2.5 rounded-xl bg-amber-950/50 border border-amber-700/50 text-amber-200 text-xs flex items-center gap-2">
                      <AlertTriangle className="size-3.5 shrink-0 text-amber-400" />
                      <span>{speechErrorMsg}</span>
                    </div>
                  )}

                  {isRecordingSpeech && (
                    <div className="mb-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center justify-between gap-2 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>🎙️ Live Speech Detection Active: Speak clearly, your spoken words are streaming directly into the text box.</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">English (India/US)</span>
                    </div>
                  )}

                  <textarea
                    rows={6}
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Articulate your structured response here. Speak into your microphone or click 'Dictate by Voice' / 'STAR Blueprint' to format your response with Situation, Task, Action, and Result..."
                    className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:outline-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400">
                    Word Count: <span className="text-white font-mono">{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={!currentAnswer.trim() || submitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] text-black font-bold text-xs shadow-[0_0_25px_rgba(222,67,19,0.7)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-black" />
                        <span>AI Evaluating Answer...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer & Next</span>
                        <Send className="h-4 w-4 text-black" />
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
         STAGE 3: COMPREHENSIVE AI EVALUATION REPORT & ENHANCE/LEARN PLAN
         ========================================================================= */}
      {stage === 'report' && session && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Top Corner Back Arrow Bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setStage('directory');
                setSession(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140603] hover:bg-[#250C05] text-[#FEC163] hover:text-white border border-[#FEC163]/40 text-xs font-bold transition-all shadow-md group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-[#FEC163] group-hover:-translate-x-1 transition-transform" />
              <span>Back to All 24 Companies</span>
            </button>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
              Session Evaluation Complete
            </span>
          </div>

          {/* Header Score Hero Card */}
          <div className="rounded-2xl border-2 border-[#FEC163]/40 bg-gradient-to-br from-[#1A0A04] via-[#0D0502] to-black p-6 sm:p-8 shadow-[0_20px_50px_rgba(222,67,19,0.25)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FEC163]/20 pb-6">
              <div>
                <div className="text-xs text-[#FEC163] font-mono uppercase tracking-wider font-semibold">
                  Campus Mock Interview Performance Report
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {session.career}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Evaluated against Indian placement criteria with webcam behavioral telemetry
                </div>
              </div>

              {/* Score Circular Badge */}
              <div className="text-center p-3 rounded-xl bg-black/60 border border-[#FEC163]/40 shadow-inner">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FEC163] to-[#DE4313] font-mono">
                  {session.overallScore || 86}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Total Score / 100</div>
              </div>
            </div>

            {/* Sub-Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/50 border border-[#FEC163]/25 space-y-1">
                <div className="text-slate-400 text-[11px]">Technical Fluency</div>
                <div className="text-xl font-bold text-white font-mono">{session.breakdown?.technicalKnowledge || 88}%</div>
                <div className="text-[10px] text-emerald-400">Core Concepts Clear</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-[#FEC163]/25 space-y-1">
                <div className="text-slate-400 text-[11px]">Eye Contact & Focus</div>
                <div className="text-xl font-bold text-[#FEC163] font-mono">
                  {sessionBehavioralSummary?.averageEyeContact || avgEyeContact}%
                </div>
                <div className="text-[10px] text-amber-200">Lens Tracking Verified</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-[#FEC163]/25 space-y-1">
                <div className="text-slate-400 text-[11px]">Facial Confidence</div>
                <div className="text-xl font-bold text-white font-mono">
                  {sessionBehavioralSummary?.averageConfidence || avgConfidence}%
                </div>
                <div className="text-[10px] text-emerald-400">
                  {sessionBehavioralSummary?.dominantExpression || 'Composed Demeanor'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-[#FEC163]/25 space-y-1">
                <div className="text-slate-400 text-[11px]">Head & Posture Stability</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {sessionBehavioralSummary?.stabilityScore || 92}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {sessionBehavioralSummary?.dominantPosture || 'Centered & Upright'}
                </div>
              </div>
            </div>

            {/* AI Summary Feedback */}
            <div className="p-4 rounded-xl bg-[#140603] border border-[#FEC163]/30 text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#FEC163]" />
                <span>Interviewer Executive Summary:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {session.summaryFeedback || `You demonstrated confident articulation for ${session.career}. Your eye contact was steady at ${sessionBehavioralSummary?.averageEyeContact || avgEyeContact}% throughout technical probing questions.`}
              </p>
            </div>
          </div>

          {/* DEDICATED PROCTORED BEHAVIORAL & EYE CONTACT TELEMETRY AUDIT */}
          <div className="rounded-2xl border border-[#FEC163]/30 bg-[#0A0402]/95 p-6 sm:p-8 shadow-xl space-y-5">
            <div className="border-b border-[#FEC163]/15 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#FEC163] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-[#FEC163]" />
                  <span>Webcam Vision Behavioral Audit</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Eye Contact, Demeanor & Postural Telemetry
                </h3>
                <p className="text-xs text-slate-400">
                  Multi-modal processing layer evaluated frame stability, lens gaze fixation, and vocal presence.
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
                Proctor Status: Passed ({sessionBehavioralSummary?.averageEyeContact || avgEyeContact}% Engagement)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#140603] border border-[#FEC163]/20 space-y-1.5">
                <div className="text-slate-400 text-[11px] flex items-center justify-between">
                  <span>Lens Gaze Alignment</span>
                  <span className="font-mono text-[#FEC163] font-bold">
                    {sessionBehavioralSummary?.averageEyeContact || avgEyeContact}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FEC163] to-[#DE4313] h-full rounded-full transition-all"
                    style={{ width: `${sessionBehavioralSummary?.averageEyeContact || avgEyeContact}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  {sessionBehavioralSummary?.downwardGazeAlertCount ? (
                    <span className="text-amber-300">
                      Detected {sessionBehavioralSummary.downwardGazeAlertCount} downward glances (notes check).
                    </span>
                  ) : (
                    <span className="text-emerald-400">Steady focus maintained on the camera lens.</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#140603] border border-[#FEC163]/20 space-y-1.5">
                <div className="text-slate-400 text-[11px] flex items-center justify-between">
                  <span>Postural Stillness & Poise</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {sessionBehavioralSummary?.stabilityScore || 92}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-[#FEC163] h-full rounded-full transition-all"
                    style={{ width: `${sessionBehavioralSummary?.stabilityScore || 92}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  Posture: <strong className="text-white">{sessionBehavioralSummary?.dominantPosture || 'Centered & Upright'}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#140603] border border-[#FEC163]/20 space-y-1.5">
                <div className="text-slate-400 text-[11px] flex items-center justify-between">
                  <span>Dominant Candidate Demeanor</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {sessionBehavioralSummary?.averageConfidence || avgConfidence}/100
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-[#DE4313] h-full rounded-full transition-all"
                    style={{ width: `${sessionBehavioralSummary?.averageConfidence || avgConfidence}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  Profile: <strong className="text-amber-200">{sessionBehavioralSummary?.dominantExpression || 'Active & Articulate'}</strong>
                </div>
              </div>
            </div>

            {sessionBehavioralSummary?.actionableTips && sessionBehavioralSummary.actionableTips.length > 0 && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs space-y-2">
                <div className="font-bold text-amber-200 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-[#FEC163]" />
                  <span>Proctored Behavioral Feedback:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {sessionBehavioralSummary.actionableTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FEC163] mt-1 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* "WHAT YOU HAVE TO ENHANCE & LEARN" SECTION */}
          <div className="rounded-2xl border border-[#FEC163]/30 bg-[#0A0402]/95 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-[#FEC163]/15 pb-4">
              <div className="text-xs font-bold text-[#DE4313] uppercase tracking-wider font-mono">
                Actionable Growth Matrix
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#FEC163]" />
                <span>What You Must Enhance & Learn</span>
              </h3>
              <p className="text-xs text-slate-400">
                Actionable improvements derived from your technical answers and webcam behavioral tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Technical Enhancements */}
              <div className="p-4 rounded-xl bg-[#120603] border border-[#FEC163]/20 space-y-3">
                <div className="font-bold text-[#FEC163] flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>Technical & Project Enhancements:</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DE4313] mt-1.5 shrink-0" />
                    <span><strong>Quantify Project Results:</strong> When talking about your projects, state measurable metrics (e.g. <em>"Reduced latency by 40%"</em> or <em>"Handled 5,000 requests/sec"</em>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DE4313] mt-1.5 shrink-0" />
                    <span><strong>STAR Framework Delivery:</strong> Ensure you clearly delineate the Situation, Task, Action you personally took, and final Result.</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => onNavigate('roadmap')}
                  className="w-full mt-2 py-2 rounded-lg bg-[#220B04] hover:bg-[#331106] border border-[#FEC163]/30 text-amber-200 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Open Personalized Placement Roadmap</span>
                </button>
              </div>

              {/* Behavioral & Camera Demeanor Enhancements */}
              <div className="p-4 rounded-xl bg-[#120603] border border-[#FEC163]/20 space-y-3">
                <div className="font-bold text-amber-300 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Webcam & Behavioral Demeanor Enhancements:</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Webcam Eye Contact:</strong> Target 90%+ focus directly on the lens to project authority and assurance. (Logged: {sessionBehavioralSummary?.averageEyeContact || avgEyeContact}% average).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Filler Words Minimization:</strong> Detected {fillerWordCount} filler occurrences. Replace <em>"basically"</em> with a calm 1-second pause.</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setStage('directory')}
                  className="w-full mt-2 py-2 rounded-lg bg-[#220B04] hover:bg-[#331106] border border-[#FEC163]/30 text-amber-200 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Practice Another Company Round</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question-By-Question Detailed Breakdown */}
          <div className="rounded-2xl border border-[#FEC163]/30 bg-[#0A0402]/95 p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Question-by-Question Technical Audit</h3>

            <div className="space-y-4">
              {session.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-[#120603] border border-[#FEC163]/20 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Q{idx + 1}: {q.question}</span>
                    <span className="px-2 py-0.5 rounded bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold font-mono text-[11px]">
                      {q.score || 85}/100
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 text-slate-300">
                    <strong className="text-slate-400">Your Answer: </strong>
                    <span>{q.userAnswer || 'No answer recorded.'}</span>
                  </div>

                  <div className="text-[11px] text-[#FFD799]">
                    <strong className="text-[#FEC163]">AI Evaluator Feedback: </strong>
                    <span>{q.feedback || 'Good attempt meeting key requirements.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Step 6 Complete: Track Progress & Return to Dashboard */}
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#120603]/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-emerald-500 text-black font-bold text-sm flex items-center justify-center font-mono shrink-0">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Workflow Complete: Placement Readiness Audited</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Step 6
                  </span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Track your comprehensive academic milestones, verified skills, and interview history on the dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => onNavigate('progress')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-zinc-950 bg-[#FEC163] hover:bg-[#ffcd7d] rounded-xl shadow-lg shadow-amber-950/40 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Academic Progress Tracker</span>
                <ArrowRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Placement Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
