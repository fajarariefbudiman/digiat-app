import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [name, setName] = useState("");
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    // Simulate checking without localStorage
    setVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGreeted(true);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "9c2d3e04-e2c8-4716-ae94-c6ceb472dfe3",
          name,
          message: `User ${name} baru saja mengunjungi website kamu.`,
        }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        onFinish();
      }, 1000);
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white transition-opacity duration-1000 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-2xl">
        {!greeted ? (
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-4 text-center">
              <div className="inline-block animate-bounce">
                <span className="text-5xl md:text-6xl">👋</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-2 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                Hai, bagaimana kalau kita mulai dengan perkenalan kecil
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-center">
              <Input
                type="text"
                placeholder="Masukkan nama kamu..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full sm:w-72 md:w-80 h-12 md:h-14 bg-gray-800/50 backdrop-blur-sm text-white border-2 border-gray-700 focus:border-red-500 placeholder:text-gray-400 text-base md:text-lg px-4 md:px-6 rounded-lg transition-all duration-300 hover:border-red-600/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    handleSubmit(e as any);
                  }
                }}
              />
              <Button
                onClick={(e) => handleSubmit(e as any)}
                disabled={!name.trim()}
                className="h-12 md:h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 md:px-10 rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-red-500/50 hover:scale-[1.02] text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Kirim
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 text-center animate-fade-in">
            <div className="space-y-3 md:space-y-4">
              <div className="text-5xl md:text-6xl animate-wave inline-block">
                👋
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                Hi, {name}!
              </h2>
            </div>
            <div className="h-1 w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed px-4">
              Salam kenal, selamat datang di web personal Fajar Arief. Jangan sungkan untuk menghubungiku langsung melalui media sosial yang ada {name}.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};