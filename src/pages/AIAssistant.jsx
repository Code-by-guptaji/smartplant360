import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, User } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  'Why did production decrease today?',
  'Which machines require maintenance?',
  'Show energy usage for last week.',
  'Suggest efficiency improvements.',
  'Generate weekly report.',
];

const SIMULATED_ANSWERS = {
  'Why did production decrease today?':
    "Today's output is 812t against a 900t target (-9.8%). The main driver is Twisting Unit 2 (MC-3005) running at reduced throughput due to elevated vibration — it's been operating at 61% of rated speed since 06:40. Line B also lost ~40 minutes to a changeover between batches. Resolving the MC-3005 vibration issue should recover most of the shortfall.",
  'Which machines require maintenance?':
    'Three machines are flagged: MC-3005 (Twisting Unit 2) is critical — risk score 91, immediate inspection recommended. MC-2011 (Draw Twister 4) is at warning level with a coolant inspection due in 2 days. MC-4021 is already in a scheduled maintenance window for oven calibration.',
  'Show energy usage for last week.':
    'Average daily electricity draw was 4.9 MWh, roughly 3.5% lower than the week before. Steam usage held steady around 120 kg/hr. The main saving came from the dip-oven idle-temperature adjustment on Line D, which trimmed about 3 MWh across the week.',
  'Suggest efficiency improvements.':
    'Top three opportunities right now: 1) Rebalance Line C load onto the Shift A window — could lift factory efficiency ~1.8%. 2) Preempt the MC-3005 bearing failure to avoid an estimated 14-hour unplanned stoppage. 3) Reduce dip-oven overnight idle temperature by 6°C for an estimated 3.1 MWh/week saving.',
  'Generate weekly report.':
    "Here's a summary: Production averaged 91% of target across the week, factory efficiency held at 87%, and quality pass rate improved to 96.1%. Energy consumption trended down 3.5%. Open items: MC-3005 requires urgent maintenance, and viscose pulp inventory is approaching reorder threshold. Full PDF export is available from the Reports module.",
};

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'ai', text: "Hi, I'm the SmartPlant AI Assistant. Ask me about production, machine health, energy or quality — or try one of the prompts below.", time: nowLabel() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const q = text ?? input;
    if (!q.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: q, time: nowLabel() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer =
        SIMULATED_ANSWERS[q] ||
        "That's a great question — in this demo build I can speak in depth about production, machine health, energy and quality. Try one of the suggested prompts to see a full simulated analysis.";
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'ai', text: answer, time: nowLabel() }]);
      setTyping(false);
    }, 1000 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9.5rem)] rounded-xl bg-white dark:bg-secondary-400/40 border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-secondary-500 dark:text-white">SmartPlant AI Assistant</p>
          <p className="text-[11px] text-slate-400">Simulated responses · connects to FastAPI service in production</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${m.from === 'ai' ? 'bg-primary-500/10' : 'bg-accent-500/10'}`}>
              {m.from === 'ai' ? <Bot className="h-4 w-4 text-primary-500" /> : <User className="h-4 w-4 text-accent-600" />}
            </div>
            <div className={`max-w-[80%] sm:max-w-[65%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === 'ai'
              ? 'bg-slate-50 dark:bg-white/5 text-secondary-500 dark:text-slate-100'
              : 'bg-primary-500 text-white'}`}
            >
              {m.text}
              <p className={`text-[10px] mt-1.5 ${m.from === 'ai' ? 'text-slate-400' : 'text-white/60'}`}>{m.time}</p>
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary-500" />
            </div>
            <div className="rounded-xl px-3.5 py-2.5 bg-slate-50 dark:bg-white/5 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-slate-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-2 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-700">
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-accent-500/10 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="p-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about production, machines, energy…"
          className="flex-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent focus:border-accent-500 focus:outline-none px-3.5 py-2.5 text-sm text-secondary-500 dark:text-slate-100 placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="h-10 w-10 rounded-lg bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
