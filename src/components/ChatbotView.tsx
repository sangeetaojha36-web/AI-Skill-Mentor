import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage } from '../types.ts';
import { api } from '../services/api.ts';
import { Bot, Send, Sparkles, User as UserIcon, BookOpen, RefreshCw } from 'lucide-react';

interface ChatbotViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

const QUICK_PROMPTS = [
  'I am a mechanical engineering student wanting to transition to data science. What should I learn first?',
  'What capstone projects impress Bioinformatics hiring managers most?',
  'How do I explain missing technical skills in a job interview?',
  'Can you give me an example of the STAR interview method for a real project?'
];

export const ChatbotView: React.FC<ChatbotViewProps> = ({ user, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, [user.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const data = await api.getChatHistory(user.id);
      if (data.history && data.history.length > 0) {
        setMessages(data.history);
      } else {
        // Welcome message
        setMessages([
          {
            id: 'welcome-msg',
            userId: user.id,
            sender: 'assistant',
            text: `Hello ${user.name.split(' ')[0]}! I am your AI Skill Mentor Assistant. I have indexed your background in ${user.education.branch} (${user.education.degree}) and your target goal of ${user.careerGoal || 'career discovery'}. How can I guide your learning or career transition today?`,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || sending) return;

    const optimisticUserMsg: ChatMessage = {
      id: `client-${Date.now()}`,
      userId: user.id,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, optimisticUserMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await api.sendMessage(user.id, text);
      setMessages((prev) => [...prev, res.botMessage]);
    } catch (err) {
      console.error('Error sending chat message:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          userId: user.id,
          sender: 'assistant',
          text: 'I encountered an issue processing your query. Please check your connection or try again.',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
          <span>Retrieval-Augmented Generation (RAG)</span>
          <span aria-hidden="true">·</span>
          <span>Knowledge Grounded</span>
          <span aria-hidden="true">·</span>
          <span>Personalized to Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Bot className="h-6 w-6 text-indigo-400" />
          <span>AI Skill Mentor Assistant</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Ask questions about cross-discipline transitions, skill gaps, resume improvements, interview tactics, or custom learning strategies.
        </p>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[11px] text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-indigo-700/60 transition-colors"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed max-w-2xl ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-indigo-400 border border-slate-700'
                  }`}
                >
                  {isUser ? <UserIcon className="h-3.5 w-3.5" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    isUser
                      ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none'
                      : 'bg-slate-950 text-slate-200 border-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* RAG Knowledge Grounding Sources */}
                  {msg.ragSources && msg.ragSources.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                      <BookOpen className="h-3 w-3 text-indigo-400 shrink-0" />
                      <span>Retrieved Knowledge:</span>
                      {msg.ragSources.map((source, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {sending && (
            <div className="flex gap-3 text-xs text-slate-400 items-center">
              <div className="h-7 w-7 rounded-lg bg-slate-800 text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-indigo-400">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Searching vector database & synthesizing personalized answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 rounded-b-xl flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your career or learning question (e.g. How do I transition to Biotech Data Analysis?)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={sending || !input.trim()}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
