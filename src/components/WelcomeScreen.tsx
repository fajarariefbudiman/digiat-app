import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const WelcomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [name, setName] = useState("");
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setVisible(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGreeted(true);

    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "9c2d3e04-e2c8-4716-ae94-c6ceb472dfe3",
        name,
        message: `User ${name} baru saja mengunjungi website kamu.`,
      }),
    });

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        localStorage.setItem("visited", "true");
      }, 1000); 
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-center bg-background text-foreground transition-opacity duration-1000 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
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
              className="w-64 sm:w-80 bg-muted border-border"
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
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Salam kenal, selamat datang di web personal Fajar Arief. Jangan sungkan untuk menghubungiku langsung melalui media sosial yang ada {name}.</p>
        </div>
      )}
    </div>
  );
};
