import { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, Copy, Check } from 'lucide-react';

export function Community() {
  const [onlineUsers, setOnlineUsers] = useState(1402);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Discord Simulator Typing States
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  // Discord Chat Simulator State
  const [discordMessages, setDiscordMessages] = useState([
    { user: 'Sol_Sniper', avatar: '#00FF66', time: '14:02', text: 'bro that SOL leverage signal went straight to TP3' },
    { user: 'DegenLord', avatar: '#FF3366', time: '14:02', text: 'Printed $3,400 today off i5. literal cheating' },
    { user: 'WhaleWatcher', avatar: '#33CCFF', time: '14:03', text: 'Anyone monitoring the wallet tracker feed? Insiders are loading PEPE' },
    { user: 'PnL_Flexer', avatar: '#00FFCC', time: '14:03', text: '12 wins streak! VIP subscription paid for itself in 10 minutes' },
    { user: 'giga_chad', avatar: '#FF9900', time: '14:04', text: 'i5 is the only alpha channel i havent muted' }
  ]);

  useEffect(() => {
    // Online users fluctuation
    const usersInterval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 9) - 4);
    }, 3000);

    // Discord message generator simulation
    const chatUsers = [
      { name: 'MoonBoy_99', color: '#FF5733' },
      { name: 'AlphaSeeker', color: '#C70039' },
      { name: 'SatoshiJr', color: '#900C3F' },
      { name: 'LeverageGamer', color: '#581845' },
      { name: 'i5_Enjoyer', color: '#00FF66' },
      { name: 'DumpDetector', color: '#00E8FF' }
    ];
    const chatTexts = [
      'Just caught the SOL pump, thanks admin!',
      'holy leverage, 100x print was risky but i5 made it simple',
      'VIP lounge is insane right now',
      'we printed on that ETH dip scalp so hard',
      'Are they dropping another alpha entry soon?',
      'the win streak is now 15?! absolute madness',
      'FOMO hits hard if you fade the signal'
    ];

    const discordInterval = setInterval(() => {
      const randomUser = chatUsers[Math.floor(Math.random() * chatUsers.length)];
      const randomText = chatTexts[Math.floor(Math.random() * chatTexts.length)];
      
      // Show typing indicator 1.5 seconds before message arrives
      setTypingUser(randomUser.name);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setDiscordMessages((prev) => [
          ...prev.slice(-5), // Keep last 6 messages + new message
          { user: randomUser.name, avatar: randomUser.color, time: timeStr, text: randomText }
        ]);
      }, 1500);
    }, 4500);

    return () => {
      clearInterval(usersInterval);
      clearInterval(discordInterval);
    };
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="community" className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 select-none bg-black overflow-hidden">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] font-mono tracking-widest text-primary uppercase block mb-2">// JOIN THE INNER CIRCLE</span>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase">
          A CULT OF WINNING.
        </h2>
        <p className="text-white/60 font-body text-xs sm:text-sm mt-3 leading-relaxed">
          Crypto is a PvP game. Retail loses because they play alone. We share live trade executions, chart setups, and celebrate leverage profit flexes inside the premium room.
        </p>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Discord Scroll Simulator Box (Col 1-7) */}
        <div className="lg:col-span-7 border-2 border-white/15 bg-black p-4 flex flex-col font-mono text-xs relative h-[380px] select-none overflow-hidden group">
          {/* Cyberpunk terminal CRT overlays */}
          <div className="absolute inset-0 crt-scanline opacity-15 pointer-events-none z-20" />
          <div className="absolute inset-0 terminal-grain pointer-events-none z-20" />
          
          {/* Header info */}
          <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4 text-[10px] text-white/50 font-mono relative z-10">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-white font-bold tracking-tight">💬 #vip-signals-chat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>12,482 members • {onlineUsers.toLocaleString()} online</span>
            </div>
          </div>

          {/* Scroll Area simulating live Discord talk */}
          <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-thin pr-1 text-left relative z-10">
            {discordMessages.map((msg, index) => (
              <div key={index} className="flex gap-3 items-start animate-[fade-in_0.3s_ease-out]">
                {/* Avatar box */}
                <div 
                  className="h-8 w-8 rounded-none border border-black flex-shrink-0 flex items-center justify-center font-bold font-mono text-black text-sm select-none transition-transform duration-300 hover:scale-110 cursor-crosshair"
                  style={{ backgroundColor: msg.avatar }}
                >
                  {msg.user.substring(0, 2).toUpperCase()}
                </div>
                
                {/* Message body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="font-extrabold text-white text-xs tracking-tight hover:text-primary transition-colors cursor-pointer">{msg.user}</span>
                    <span className="text-[8px] text-white/30 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-white/80 leading-normal text-xs font-mono whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Live Typing Simulator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[9px] text-primary/80 font-mono animate-pulse pt-2 border-t border-white/5">
                <span className="flex gap-0.5 items-center">
                  <span className="h-1 w-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1 w-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1 w-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                <span>{typingUser} is typing alpha signals...</span>
              </div>
            )}
          </div>

          {/* Simulated Chat input */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-white/30 text-[10px] font-mono relative z-10">
            <span>You do not have permission to send messages here.</span>
            <span className="text-primary font-black uppercase hover:underline cursor-pointer flex items-center gap-1">
              GET ACCESS <ArrowRight className="h-3 w-3" />
            </span>
          </div>
          
        </div>

        {/* Social Proof Screenshots & Meme sticker cards collage (Col 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-6 relative">
          
          {/* Flex 1: Simulated PnL Tweet */}
          <div className="border border-white/20 bg-black p-4 tilted-element shadow-xl hover:rotate-0 hover:scale-[1.02] hover:border-primary transition-all duration-300 group/tweet">
            <style>{`
              @keyframes draw-chart-stroke {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
            <div className="flex justify-between items-start text-xs font-mono mb-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-white text-black font-black text-[9px] flex items-center justify-center">I5</div>
                <div>
                  <div className="font-extrabold text-white text-[10px] group-hover/tweet:text-primary transition-colors">@Crypto_Giga_King</div>
                  <span className="text-white/40 text-[8px]">10h ago</span>
                </div>
              </div>
              <span className="text-primary hover:underline cursor-pointer font-bold text-[9px]">VIEW SOURCE</span>
            </div>
            <p className="text-xs text-white/90 italic font-mono mb-3 leading-normal border-l border-primary/50 pl-2">
              "i5 signals generated BTC scalp entry. Took 75x leverage. Printed $8.4k in 1 hour. Literally just print money on command."
            </p>
            
            {/* Animated Scalp Chart visual overlay */}
            <div className="h-14 w-full bg-black border border-white/10 p-1.5 overflow-hidden relative mb-3">
              <svg viewBox="0 0 100 30" className="w-full h-full text-primary">
                <path 
                  d="M0,25 Q15,22 30,12 T65,18 T85,2 T100,5" 
                  fill="none" 
                  stroke="#00ffcc" 
                  strokeWidth="1.5" 
                  strokeDasharray="120" 
                  strokeDashoffset="120" 
                  style={{ animation: 'draw-chart-stroke 3s ease-out infinite' }}
                />
                <circle cx="85" cy="2" r="2.5" fill="#00ffcc" className="animate-ping" />
              </svg>
              <span className="absolute bottom-1 right-2 text-[7px] text-primary/70 font-mono tracking-widest font-bold uppercase">75x LEVERAGE CONFIRMED</span>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-2.5 flex justify-between items-center font-mono group-hover/tweet:bg-primary/10 transition-all duration-300">
              <span className="text-[10px] text-primary">REALIZED PNL:</span>
              <span className="text-lg font-black text-primary group-hover/tweet:scale-105 transition-transform">+342.1%</span>
            </div>
          </div>

          {/* Flex 2: Real-time copyable coupon/referral alpha */}
          <div className="border-2 border-primary bg-black p-4 text-center relative overflow-hidden group tilted-element-reverse shadow-[4px_4px_0px_#00ffcc] hover:scale-[1.02] hover:-rotate-1 transition-all duration-300">
            <style>{`
              @keyframes scan-sweep {
                0% { top: -10%; }
                100% { top: 110%; }
              }
            `}</style>
            
            {/* Glowing sweep line scanner */}
            <div className="absolute left-0 right-0 h-1 bg-[#00ffcc] opacity-0 group-hover:opacity-60 shadow-[0_0_10px_#00ffcc]" style={{ animation: 'scan-sweep 2.5s linear infinite' }} />

            <span className="bg-primary text-black font-mono font-black text-[9px] px-1.5 py-0.5 tracking-wider absolute top-0 left-0 border-r border-b border-black">
              LIMIT ACCESS CODE
            </span>
            
            <div className="mt-4 mb-2">
              <div className="text-[10px] text-white/50 font-mono uppercase">WAR_ROOM_KEY</div>
              <div className="text-xl font-display font-black text-white mt-1 select-all tracking-wider font-mono group-hover:text-primary transition-colors">
                I5-ALPHA-992
              </div>
            </div>

            <button 
              onClick={() => handleCopy('I5-ALPHA-992', 'key-copy')}
              className="mx-auto flex items-center justify-center gap-1.5 text-xs text-primary font-bold border border-primary/30 px-3 py-1 bg-primary/5 hover:bg-primary hover:text-black transition-colors cursor-pointer select-none font-mono"
            >
              {copiedId === 'key-copy' ? (
                <>
                  <Check className="h-3.5 w-3.5" /> COPIED!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> COPY PASSKEY
                </>
              )}
            </button>
          </div>

          {/* Flex 3: Degen meme sticker */}
          <div className="self-center bg-white text-black p-2 text-center text-xs font-black uppercase w-52 tilted-element shadow-2xl border-2 border-black hover:scale-110 hover:-rotate-3 transition-all duration-300 cursor-pointer active:scale-95 select-none animate-[pulse_3s_ease-in-out_infinite]">
            🤑 "DONT COPE, JOIN THE INNER CIRCLE"
          </div>

        </div>

      </div>

    </section>
  );
}
