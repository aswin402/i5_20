import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700 font-mono select-none">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black leading-none tracking-tighter text-white/5 select-none font-display">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl font-display font-black tracking-tight text-primary">LIQUIDATION DETECTED</p>
        </div>
      </div>
      
      <p className="text-base text-white/60 mb-12 max-w-md mx-auto leading-relaxed">
        The route you are requesting has been liquidated or doesn't exist on this chain.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-primary text-black border-2 border-black font-display font-black px-8 py-4 uppercase rounded-none shadow-[4px_4px_0px_#ffffff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
      >
        <MoveLeft className="w-5 h-5" /> Go Back to Terminal
      </Link>
    </div>
  );
}
