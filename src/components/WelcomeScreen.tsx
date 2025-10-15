import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [name, setName] = useState("");
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setVisible(true);
    } else {
      onFinish();
    }
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
        localStorage.setItem("visited", "true");
        onFinish();
      }, 1000);
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-center bg-black text-white transition-opacity duration-1000 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      {!greeted ? (
        <>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">Hai👋, bagaimana kalau kita kenalan terlebih dahulu?</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-slide-up"
          >
            <Input
              type="text"
              placeholder="Masukkan nama kamu..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-64 sm:w-80 bg-gray-800 text-white border-gray-600"
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
            >
              Kirim
            </Button>
          </form>
        </>
      ) : (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-4xl font-semibold">Hi, {name}! 👋</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">Salam kenal, selamat datang di web personal Fajar Arief. Jangan sungkan untuk menghubungiku langsung melalui media sosial yang ada {name}.</p>
        </div>
      )}
    </div>
  );
};
