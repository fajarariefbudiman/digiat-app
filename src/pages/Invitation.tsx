import React, { useState, useEffect, useRef } from "react";
import cover from "../assets/Cover.png";
import sectionName from "../assets/section-name.png";
import biodata from "../assets/Biodata.png";
import ornament from "../assets/ornament.png";
import underline from "../assets/underline.png";
import qr from "../assets/QR Code Alamat.png";
import prewed1 from "../assets/prewed1.jpeg";
import prewed2 from "../assets/prewed2.jpeg";
import prewed3 from "../assets/prewed3.jpeg";
import prewed4 from "../assets/prewed4.jpeg";
import prewed5 from "../assets/prewed5.jpeg";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const URL = "https://script.google.com/macros/s/AKfycbxkcX6fof7xOlHWZEnPhg9epXOSe8VYnEoxf_Q1LJ6w78YWS_xzecsBjGQxXMSLEinQ/exec";
const UrlUcapan = "https://script.google.com/macros/s/AKfycbw4A470l6s_WodY1qlYkfl9lkQclFR_RdQq1jYZrXxIDfzmqyp1MSxs915nSvCPRDsWuQ/exec";

const useIntersectionObserver = (isOpened, options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpened) return; // ⛔ sebelum undangan dibuka, jangan animasi

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isOpened]); // 🔥 depend on isOpened

  return [ref, isVisible];
};

export default function Invitation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const [coverRef, coverVisible] = useIntersectionObserver(isOpened);
  const [ayatRef, ayatVisible] = useIntersectionObserver(isOpened);
  const [greetingRef, greetingVisible] = useIntersectionObserver(isOpened);
  const [page3Ref, page3Visible] = useIntersectionObserver(isOpened);
  const [page4Ref, page4Visible] = useIntersectionObserver(isOpened);
  const [page5Ref, page5Visible] = useIntersectionObserver(isOpened);
  const [page6Ref, page6Visible] = useIntersectionObserver(isOpened);
  const [page7Ref, page7Visible] = useIntersectionObserver(isOpened);
  const [page8Ref, page8Visible] = useIntersectionObserver(isOpened);
  const [page9Ref, page9Visible] = useIntersectionObserver(isOpened);
  const [footer, footerVisible] = useIntersectionObserver(isOpened);

  const [searchParams] = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [wishForm, setWishForm] = useState({ nama: "", pesan: "" }); // untuk form
  const [wishes, setWishes] = useState([]);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [ucapan, setUcapan] = useState([]);

  const fetchWishes = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`${UrlUcapan}?page=${pageNum}`);
      const result = await response.json();

      setWishes(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 0);
      setPage(result.page || 1);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishes(1);
  }, []);

  const handlePrevPage = () => {
    if (page > 1) {
      fetchWishes(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      fetchWishes(page + 1);
    }
  };
  // RSVP
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: guestName,
    address: "",
    count: "1",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(form),
    });
    console.log("RSVP", form);

    setLoading(false);
    toast("Konfirmasi kehadiran berhasil dikirim.");
  };

  const handleWishes = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(UrlUcapan, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(wishForm),
    });
    console.log("", wishForm);

    setLoading(false);
    toast("Ucapan dan doa berhasil dikirim.");
  };

  function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    React.useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBox = ({ value, label }) => (
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-gray-800 tabular-nums">{String(value).padStart(2, "0")}</div>
        <div className="text-xs text-gray-600 mt-1 font-serif">{label}</div>
      </div>
    );

    return (
      <div className="relative bg-white/60 backdrop-blur-sm rounded-full px-8 py-6 shadow-lg border border-gray-200">
        {/* Sparkle kiri */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0l1.5 8L12 16l-1.5-8L12 0zM0 12l8-1.5L16 12l-8 1.5L0 12z" />
          </svg>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <TimeBox
            value={timeLeft.days}
            label="Hari"
          />
          <span className="text-3xl font-bold text-gray-800 -mt-4">:</span>
          <TimeBox
            value={timeLeft.hours}
            label="Jam"
          />
          <span className="text-3xl font-bold text-gray-800 -mt-4">:</span>
          <TimeBox
            value={timeLeft.minutes}
            label="Menit"
          />
          <span className="text-3xl font-bold text-gray-800 -mt-4">:</span>
          <TimeBox
            value={timeLeft.seconds}
            label="Detik"
          />
        </div>

        {/* Sparkle kanan */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0l1.5 8L12 16l-1.5-8L12 0zM0 12l8-1.5L16 12l-8 1.5L0 12z" />
          </svg>
        </div>
      </div>
    );
  }

  // Auto play music when invitation opened
  useEffect(() => {
    if (!isOpened) return;

    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay was prevented. User interaction needed.");
        }
      }
    };

    const timer = setTimeout(playAudio, 500);
    return () => clearTimeout(timer);
  }, [isOpened]);

  // Handle page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (document.hidden) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(() => {
            console.log("Could not resume playback");
          });
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // in seconds

    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <>
      {/* Audio Player */}
      <audio
        ref={audioRef}
        loop
      >
        <source
          src="/songs/song.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Music Control Button - Only show after opened */}
      {isOpened && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 bg-black/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}

      {/* Cover Page - Fixed position mobile size */}
      {!isOpened && (
        <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-white z-50">
          <div className="relative w-full max-w-[430px] h-full flex items-center justify-center py-11">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={cover}
                alt="Cover"
                className="max-w-[430px] h-full object-cover"
              />
            </div>

            {/* Cover Content */}
            <div className="relative z-10 px-12 text-center w-full flex flex-col items-center justify-between h-full py-10">
              {/* Top Section */}
              <div className="flex flex-col items-center space-y-6">
                {/* R & N */}
                <div className="animate-slideDown">
                  <h1 className="text-2xl font-amoresa [color:#000000] tracking-wider drop-shadow-lg">R & N</h1>
                </div>

                {/* Undangan Acara Walimah */}
                <div className="animate-slideRight">
                  <p className="text-base tracking-widest text-gray-800 font-light uppercase drop-shadow-md">UNDANGAN ACARA WALIMAH</p>
                  <p className="text-base text-gray-800 mt-1 tracking-wide drop-shadow-md">"NGUNDUH MANTU"</p>
                </div>
              </div>

              {/* Middle Section - Names */}
              <div className="animate-scaleUp">
                <h2 className="text-4xl font-amoresa text-gray-700 drop-shadow-lg">Riki & Nufus</h2>
              </div>

              {/* Bottom Section - Guest Info */}
              <div className="animate-slideUp flex flex-col items-center space-y-6">
                {/* Card Section */}
                <div
                  className="w-[280px] h-[154px] bg-cover bg-center rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                  style={{ backgroundImage: `url(${sectionName})` }}
                >
                  <p className="text-[10px] text-gray-700 font-light tracking-wide">Kepada Yth Bapak/Ibu/Saudara/i,</p>
                  <p className="text-xl font-serif text-gray-800 mt-3 mb-1 font-medium">{guestName}</p>
                  <div className="border-t border-gray-400 w-2/3 my-2 opacity-60" />
                  <p className="text-[11px] font-serif text-gray-600 font-light">di</p>
                  <p className="text-sm font-serif text-gray-700 mt-1 font-medium">Tempat</p>
                </div>

                {/* Open Invitation Button */}
                <button
                  onClick={handleOpenInvitation}
                  className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 rounded-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm tracking-widest uppercase font-medium">Open Invitation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Scroll window langsung */}
      {isOpened && (
        <div className="w-full min-h-screen bg-gray-100">
          <div className="w-full min-h-screen flex justify-center">
            <div className="relative w-full max-w-[430px] min-h-screen mx-auto ">
              {/* Background FIXED (works on iOS) */}
              <img
                src={cover}
                alt="Cover Background"
                className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-full object-cover z-0"
              />

              {/* PAGE 1 - COVER */}
              <section
                ref={coverRef}
                className="relative z-10 w-full h-screen flex items-center justify-center"
              >
                <div className="px-5 text-center w-full h-full flex flex-col justify-between py-20">
                  {/* TOP SECTION */}
                  <div className={`${coverVisible ? "animate-slideDown" : "scroll-animate"}`}>
                    <p className="text-base font-serif tracking-widest text-gray-800 font-light uppercase drop-shadow-md">UNDANGAN ACARA WALIMAH</p>

                    <p
                      className="text-base font-serif text-gray-800 tracking-wide drop-shadow-md mt-2"
                      style={{ animationDelay: "0.2s" }}
                    >
                      "NGUNDUH MANTU"
                    </p>

                    <p
                      className="text-base font-serif text-gray-800 tracking-wide drop-shadow-md mt-2"
                      style={{ animationDelay: "0.2s" }}
                    >
                      PUTRA PERTAMA DARI PASANGAN
                    </p>
                  </div>

                  {/* CENTER SECTION */}
                  <div
                    className={`${coverVisible ? "animate-scaleUp" : "scroll-animate"}`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    <h2 className="text-2xl font-fugi text-gray-700 italic drop-shadow-lg">BAPAK HAMBALI, S.Pd.</h2>

                    <h2 className="text-2xl font-fugi mt-5 text-gray-700 italic drop-shadow-lg">&</h2>

                    <h2 className="text-2xl font-fugi mt-5 text-gray-700 italic drop-shadow-lg">IBU NUR ASIYAH, S.Pd.</h2>
                  </div>

                  {/* BOTTOM SECTION */}
                  <div
                    className={`${coverVisible ? "animate-scaleUp" : "scroll-animate"}`}
                    style={{ animationDelay: "0.6s" }}
                  >
                    <p className="text-xl md:text-2xl font-serif text-gray-800 font-medium">22 . 12 . 2025</p>
                  </div>
                </div>
              </section>

              {/* Page 2 - Ayat & Greeting */}
              <section
                ref={ayatRef}
                className="relative w-full px-8 py-12 flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-gray-800 opacity-90 z-0"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center text-3xl font-amoresa text-white mb-10 tracking-[0.25em]">
                    <span className={`${ayatVisible ? "animate-slideLeft" : "scroll-animate"}`}>R</span>
                    <span
                      className={`mx-4 ${ayatVisible ? "animate-fadeIn" : "scroll-animate"}`}
                      style={{ animationDelay: "0.3s" }}
                    >
                      |
                    </span>
                    <span className={`${ayatVisible ? "animate-slideRight" : "scroll-animate"}`}>N</span>
                  </div>

                  <div className={`text-white text-center max-w-lg ${ayatVisible ? "animate-scaleUp" : "scroll-animate"}`}>
                    <p className="text-xl font-serif leading-relaxed mb-4">
                      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                    </p>
                    <p className="text-lg font-serif mt-3">Q.S Ar-Rum : 21</p>
                  </div>
                </div>
              </section>

              <section
                ref={greetingRef}
                className="w-full bg-transparent bg-opacity-90 px-8 py-12 flex flex-col items-center"
              >
                {/* Title */}
                <div className={`text-center mb-12 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>
                  <h2 className="text-xl font-amoresa text-gray-700">R & N</h2>
                </div>
                <div className={`bg-black bg-opacity-10 border border-white rounded-xl p-8 mt-4 max-w-md w-full shadow-md backdrop-blur-sm ${greetingVisible ? "animate-slideUp" : "scroll-animate"}`}>
                  <p className={`text-gray-700 text-center font-serif text-base mb-6 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                  <p className={`text-gray-700 text-center font-serif text-sm leading-relaxed mb-8 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>
                    Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara "Walimah Ngunduh Mantu" pernikahan putra-putri kami:
                  </p>

                  <div className={`text-center mb-8 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>
                    <h3 className="text-3xl font-amoresa text-gray-700 mb-1">Riki</h3>
                    <p className="text-gray-700 font-amoresa text-3xl font-semibold mb-1">&</p>
                    <h3 className="text-3xl font-amoresa text-gray-700">Nufus</h3>
                  </div>

                  <p className={`text-gray-700 text-center font-serif text-sm leading-relaxed mb-6 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>Atas perhatian dan do'a restunya, kami mengucapkan terima kasih.</p>
                  <p className={`text-gray-700 text-center font-serif text-sm leading-relaxed mb-6 ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>
                    Hormat kami,
                    <br />
                    <span className="font-semibold">Hambali, S.Pd. & Ibu Nur Asiyah, S.Pd.</span>
                  </p>
                  {/* <p className={`text-gray-700 text-center font-serif text-xs ${greetingVisible ? "animate-scaleUp" : "scroll-animate"}`}>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p> */}
                </div>
              </section>

              {/* Page 3 - Biodata & Gallery */}
              <section
                ref={page3Ref}
                className="w-full min-h-screen bg-black bg-opacity-20 px-4 sm:px-8 py-16"
              >
                <div className="max-w-6xl mx-auto">
                  {/* Title */}
                  {/* <div className={`text-center mb-12 ${isOpened && page3Visible ? "animate-slideDown" : "scroll-animate"}`}>
                    <h2 className="text-xl font-amoresa text-gray-700 mb-4">R & N</h2>
                  </div> */}

                  <div className={`mb-6 relative w-64 mx-auto ${isOpened && page3Visible ? "animate-scaleUp" : "scroll-animate"}`}>
                    {/* Ornamen Daun Atas */}
                    <img
                      src={ornament}
                      className="w-40 absolute -top-10 left-16 -translate-x-1/2 opacity-80"
                      alt="Leaf Ornament"
                    />

                    {/* Foto Bulat */}
                    <div className="w-64 h-64 mb-5 mx-auto overflow-hidden rounded-full shadow-lg border-4 border-white/40 relative z-10">
                      <img
                        src={prewed4}
                        alt="Main Prewedding"
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>

                    {/* Ornamen Daun Bawah */}
                    <img
                      src={ornament}
                      className="w-40 absolute -bottom-10 left-52 -translate-x-1/2 opacity-80"
                      alt="Leaf Ornament"
                    />
                  </div>

                  {/* 4 Photos Grid */}
                  <div className={`grid grid-cols-3 gap-4 ${isOpened && page3Visible ? "animate-slideUp" : "scroll-animate"}`}>
                    {[prewed1, prewed3, prewed5].map((img, i) => (
                      <div
                        key={i}
                        className="aspect-square overflow-hidden rounded-lg shadow-lg"
                      >
                        <img
                          src={img}
                          alt={`Prewedding ${i + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className={`w-64 h-32 mx-auto ${isOpened && page3Visible ? "animate-scaleUp" : "scroll-animate"}`}>
                    <img
                      src={underline}
                      alt=""
                    />
                  </div>

                  {/* Couple Details */}
                  <div className="grid grid-cols-1 gap-3 max-w-5xl mx-auto">
                    {/* Groom */}
                    <div className={`text-center bg-white bg-opacity-50 py-10 rounded-lg ${isOpened && page3Visible ? "animate-scaleUp" : "scroll-animate"}`}>
                      <h4 className="font-alexbrush text-4xl text-gray-700 mb-1">Riki Nurhamzah, S.H.</h4>

                      <p className="text-[12px] font-serif text-gray-700 mb-6 leading-relaxed">Putra Pertama dari Bpk Hambali, S.Pd & Ibu Nur Asiyah, S.Pd.</p>
                      <div className="bg-black bg-opacity-5 rounded-md w-fit px-2 py-1 mx-auto">
                        <a
                          href="https://instagram.com/rikihamzah_mc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-700 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          @rikihamzah_mc
                        </a>
                      </div>
                    </div>

                    {/* Divider for mobile */}
                    <div className={`font-amoresa text-4xl mx-auto text-gray-700 ${isOpened && page3Visible ? "animate-scaleUp" : "scroll-animate"}`}>&</div>

                    {/* Bride */}
                    <div className={`text-center bg-white bg-opacity-50 py-10 rounded-lg ${isOpened && page3Visible ? "animate-scaleUp" : "scroll-animate"}`}>
                      <h4 className="font-alexbrush text-4xl text-gray-700 mb-1">Suratun Nufus, S.M.</h4>

                      <p className="text-[12px] font-serif text-gray-700 mb-6 leading-relaxed">Putri Bungsu Bpk. A. Suja'ih Ardiansyah & Ibu Arsiah</p>
                      <div className="bg-black bg-opacity-5 rounded-md w-fit px-2 py-1 mx-auto">
                        <a
                          href="https://instagram.com/zhrtnufuss"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          @zhrtnufuss
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Page 4 - Save The Date */}
              <section
                ref={page4Ref}
                className="relative w-full px-8 py-12 flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-800"
              >
                {/* Layer background solid untuk iOS */}
                <div className="absolute inset-0 bg-gray-900/90 z-0"></div>

                {/* Konten */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* Title */}
                  {/* <div className={`text-center mb-12 ${page4Visible ? "animate-slideDown" : ""}`}>
                    <h2 className="text-xl font-amoresa text-gray-200 mb-4">R & N</h2>
                  </div> */}

                  <div className="py-8 flex flex-col items-center justify-center">
                    <h2 className={`text-4xl font-amoresa text-white mb-8 ${page4Visible ? "animate-slideDown" : ""}`}>Save The Date</h2>

                    <p className={`text-white text-center font-serif text-lg mb-12 ${page4Visible ? "animate-slideUp" : ""}`}>Kami mengundang Anda untuk berbagi kebahagiaan di hari istimewa kami</p>

                    <div className={page4Visible ? "animate-scaleUp" : ""}>
                      <CountdownTimer targetDate="2025-12-22T00:00:00" />
                    </div>

                    <div className={`mt-12 text-center ${page4Visible ? "animate-scaleUp" : ""}`}>
                      <p className="text-white font-alice text-2xl mb-2">Senin</p>
                      <p className="text-white font-alice text-3xl font-bold mb-2">22 Desember 2025</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Page 5 - Detail Acara */}
              <section
                ref={page5Ref}
                className="relative w-full min-h-screen px-8 py-16 flex flex-col items-center"
              >
                {/* Konten */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* R & N */}
                  {/* <h2 className={`text-xl font-amoresa text-gray-700 mb-2 ${page5Visible ? "animate-slideDown" : ""}`}>R & N</h2> */}

                  <h2 className={`text-4xl font-alice text-gray-800 mb-2 tracking-widest ${page5Visible ? "animate-scaleUp" : ""}`}>ACARA</h2>

                  <p className={`text-sm text-gray-700 font-alice mb-8 ${page5Visible ? "animate-scaleUp" : ""}`}>Yang akan kami selenggarakan :</p>

                  {/* Tanggal Besar */}
                  <div className={`text-center mb-12 ${page5Visible ? "animate-slideUp" : ""}`}>
                    <h3 className="text-[34px] font-alice text-gray-800 mb-2">SENIN</h3>

                    <div className="flex items-center justify-center gap-4 text-gray-700 font-alice text-xl">
                      <span>22</span>
                      <span className="text-3xl">|</span>
                      <span>DESEMBER</span>
                      <span className="text-3xl">|</span>
                      <span>2025</span>
                    </div>

                    <p className="text-gray-700 font-serif mt-4">09.00 WIB</p>

                    <div className="w-64 h-32 mx-auto -mt-12">
                      <img
                        className="w-full h-full object-cover object-top"
                        src={underline}
                        alt=""
                      />
                    </div>
                  </div>

                  {/* Card Lokasi */}
                  <div className={`bg-white bg-opacity-45 border border-gray-300 rounded-xl w-full max-w-lg py-6 shadow-md text-center ${page5Visible ? "animate-scaleUp" : ""}`}>
                    <svg
                      className="w-6 h-6 flex mx-auto mb-2"
                      fill="black"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="font-serif text-gray-800 font-bold text-sm mb-1">KEDIAMAN RUMAH</p>
                    <p className="font-serif text-gray-800 text-[12px] font-semibold mb-3">BPK. HAMBALI, S.Pd & IBU NUR ASIYAH, S.Pd.</p>

                    <p className="text-gray-600 font-serif text-xs leading-relaxed">Kp. Renged (Buyut Ketul), Ds. Renged RT/RW. 02/01, Kresek, Tangerang, Banten (Jl. Raya Kresek - Balaraja)</p>
                  </div>

                  {/* Tombol Google Maps */}
                  <a
                    href="https://www.google.com/maps/place/6%C2%B008'21.5%22S+106%C2%B023'06.7%22E/@-6.1393056,106.3851944,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.1393056!4d106.3851944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 flex items-center font-serif font-medium gap-2 px-6 py-3 bg-white bg-opacity-45 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-all shadow-lg ${page5Visible ? "animate-fadeIn-delay" : ""}`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    LOKASI DI GOOGLE MAP
                  </a>

                  {/* OR */}
                  <p className={`text-gray-700 font-serif mt-4 ${page5Visible ? "animate-slideUp" : ""}`}>or</p>

                  {/* QR Code */}
                  <div className={`mt-4 ${page5Visible ? "animate-slideUp" : ""}`}>
                    <img
                      src={qr}
                      alt="QR Code"
                      className="w-32 h-32 mx-auto"
                    />
                    <p className="text-xs text-gray-600 mt-2">Scan Here to Google Map</p>
                  </div>
                </div>
              </section>

              {/* Page 6 - Turut Mengundang */}
              <section
                ref={page6Ref}
                className="relative w-full min-h-screen px-8 py-16 flex flex-col items-center justify-center"
              >
                {/* Background Layer */}
                <div className="absolute inset-0 bg-gray-800 opacity-90 z-0" />

                {/* Konten */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Judul */}
                  <h2 className={`text-3xl font-amoresa text-white mb-8 ${page6Visible ? "animate-slideDown" : ""}`}>Turut Mengundang</h2>

                  {/* Deskripsi */}
                  <p className={`text-white text-center font-serif text-base mb-12 max-w-md ${page6Visible ? "animate-slideUp" : ""}`}>Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami</p>

                  {/* Card List Undangan */}
                  <div className={`bg-white/10 backdrop-blur-sm border border-white rounded-xl p-8 max-w-md w-full ${page6Visible ? "animate-scaleUp" : ""}`}>
                    <div className="space-y-4 text-center">
                      <p className="text-white font-serif text-base">Keluarga Bapak Sanin Rosyidin - Renged, Kresek</p>
                      <div className="border-t border-white/40 my-3"></div>

                      <p className="text-white font-serif text-base">Keluarga Bapak Ust. Jukri (Alm) - Grobogan, Ceplak, Sukamulya</p>
                      <div className="border-t border-white/40 my-3"></div>

                      <p className="text-white font-serif text-base">Keluarga Bapak A. Suja'ih Ardiansyah - Pekapuran, Kronjo</p>
                      <div className="border-t border-white/40 my-3"></div>

                      <p className="text-white font-serif text-base">Keluarga Bintang Motor - Renged, Kresek</p>
                      <div className="border-t border-white/40 my-3"></div>

                      <p className="text-white font-serif text-base">Keluarga Az-Zahro Crew</p>
                    </div>
                  </div>

                  {/* Penutup */}
                  <p className={`text-white text-center font-serif text-base mt-12 italic ${page6Visible ? "animate-scaleUp" : ""}`}>Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu</p>
                </div>
              </section>

              {/* Page 7 - RSVP */}
              <section
                ref={page7Ref}
                className="w-full min-h-screen bg-gray-700 bg-opacity-5 px-8 py-16 flex flex-col items-center"
              >
                {/* Title */}
                {/* <div className={`text-center mb-12 ${page7Visible ? "animate-slideDown" : ""}`}>
                  <h2 className="text-xl font-amoresa text-gray-700">R & N</h2>
                </div> */}

                {/* Heading */}
                <h2 className={`text-4xl font-fugi text-gray-800 mb-4 ${page7Visible ? "animate-slideUp" : ""}`}>RSVP</h2>

                {/* Subheading */}
                <p className={`text-gray-600 text-center font-serif text-sm mb-12 ${page7Visible ? "animate-slideUp" : ""}`}>Mohon konfirmasi kehadiran Anda</p>

                {/* Form Card */}
                <div className={`bg-white border-2 border-gray-300 rounded-xl p-8 w-full max-w-md shadow-lg ${page7Visible ? "animate-scaleUp" : ""}`}>
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    {/* NAMA */}
                    <div>
                      <label className="block text-gray-700 font-serif text-sm mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                        placeholder="Masukkan nama Anda"
                        required
                      />
                    </div>

                    {/* ALAMAT */}
                    <div>
                      <label className="block text-gray-700 font-serif text-sm mb-2">Alamat</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                        placeholder="Masukkan alamat Anda"
                        required
                      />
                    </div>

                    {/* JUMLAH */}
                    <div>
                      <label className="block text-gray-700 font-serif text-sm mb-2">Jumlah Tamu</label>
                      <select
                        value={form.count}
                        onChange={(e) => setForm({ ...form, count: e.target.value })}
                        className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      >
                        <option value="1">1 Orang</option>
                        <option value="2">2 Orang</option>
                        <option value="3">3 Orang</option>
                        <option value="4">4 Orang</option>
                        <option value="5+">5+ Orang</option>
                      </select>
                    </div>

                    {/* KEHADIRAN */}
                    <div>
                      <label className="block text-gray-700 font-serif text-sm mb-2">Konfirmasi Kehadiran</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attendance"
                            value="Ya, Saya Bersedia Hadir"
                            checked={form.status === "Ya, Saya Bersedia Hadir"}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="mr-3"
                            required
                          />
                          <span className="text-gray-700 font-serif">Hadir</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attendance"
                            value="Maaf, Saya Tidak Hadir"
                            checked={form.status === "Maaf, Saya Tidak Hadir"}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="mr-3"
                          />
                          <span className="text-gray-700 font-serif">Tidak Hadir</span>
                        </label>
                      </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 rounded-lg font-serif shadow-lg transition-all ${loading ? "bg-gray-500 cursor-not-allowed text-white" : "bg-gray-800 hover:bg-gray-700 text-white"}`}
                    >
                      {loading ? "Mengirim..." : "Kirim Konfirmasi"}
                    </button>
                  </form>
                </div>
              </section>

              {/* Page 8 - Wishes */}
              <section
                ref={page8Ref}
                className="relative w-full min-h-screen px-8 py-16 flex flex-col items-center"
              >
                {/* Background Layer */}
                <div className="absolute inset-0 bg-gray-800 opacity-90 z-0" />

                {/* Konten */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* Judul */}
                  <h2 className={`text-4xl font-amoresa text-white mb-4 ${page8Visible ? "animate-slideDown" : ""}`}>Ucapan & Doa</h2>

                  {/* Subjudul */}
                  <p className={`text-white text-center font-serif text-sm mb-12 ${page8Visible ? "animate-slideDown" : ""}`}>Berikan ucapan dan doa untuk kami</p>

                  {/* Form Ucapan */}
                  <div className={`bg-white/10 backdrop-blur-sm border border-white rounded-xl p-8 w-full max-w-md mb-8 ${page8Visible ? "animate-scaleUp" : ""}`}>
                    <form
                      className="space-y-4"
                      onSubmit={handleWishes}
                    >
                      <input
                        type="text"
                        value={wishForm.nama}
                        onChange={(e) => setWishForm({ ...wishForm, nama: e.target.value })}
                        className="w-full px-4 py-3 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/60"
                        placeholder="Nama Anda"
                      />

                      <textarea
                        rows={4}
                        value={wishForm.pesan}
                        onChange={(e) => setWishForm({ ...wishForm, pesan: e.target.value })}
                        className="w-full px-4 py-3 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/60"
                        placeholder="Tulis ucapan dan doa Anda..."
                      />

                      <button
                        type="submit"
                        className="w-full bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-100 transition-all font-serif font-semibold shadow-lg"
                      >
                        Kirim Ucapan
                      </button>
                    </form>
                  </div>

                  {/* Daftar Ucapan */}
                  <div className={`w-full max-w-md space-y-4 ${page8Visible ? "animate-fadeIn-delay" : ""}`}>
                    {loading && <p className="text-white/70 font-serif text-center">Memuat ucapan...</p>}

                    {!loading && wishes.length === 0 && <p className="text-white/70 font-serif text-center">Belum ada ucapan.</p>}

                    {!loading &&
                      wishes.map((item, index) => (
                        <div
                          key={index}
                          className={`bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6 ${page8Visible ? "animate-fadeInUp" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={`w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ${page8Visible ? "animate-scaleUp" : ""}`}>
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>

                            {/* Konten Wish */}
                            <div className="flex-1">
                              <h4 className="text-white font-serif font-semibold mb-1">{item.nama || "Tamu"}</h4>

                              <p className="text-white/80 font-serif text-sm leading-relaxed">{item.pesan}</p>

                              <p className="text-white/60 font-serif text-xs mt-2">{timeAgo(item.waktu)}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Pagination */}
                    <div className="flex justify-between items-center text-white mt-6">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg font-serif border border-white/40 ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
                      >
                        Prev
                      </button>

                      <p className="font-serif text-sm text-white/80">
                        Halaman {page} / {totalPages}
                      </p>

                      <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded-lg font-serif border border-white/40 ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Page 9 - Penutup */}
              <section
                className="w-full bg-gray-700 bg-opacity-5 px-5 py-16 flex flex-col items-center justify-center"
                ref={page9Ref}
              >
                {/* Judul */}
                <h2 className={`text-4xl font-amoresa text-gray-800 mb-8 ${page9Visible ? "animate-slideDown" : ""}`}>Terima Kasih</h2>

                {/* Paragraf */}
                <div className={`text-center max-w-md mb-12 ${page9Visible ? "animate-scaleUp" : ""}`}>
                  <p className="text-gray-700 font-serif text-lg leading-relaxed mb-6">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.</p>
                  <p className="text-gray-600 font-serif text-lg">Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.</p>
                  {/* <div className={`border-t border-gray-300 w-32 mb-8 ${page9Visible ? "animate-scaleUp" : ""}`} /> */}
                  <p className={`text-gray-600 font-serif text-center font-semibold text-[17px] pt-6 pb-2 ${page9Visible ? "animate-slideDown" : ""}`}>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
                </div>

                {/* Divider */}
                <div className={`border-t border-gray-300 w-32 mb-8 ${page9Visible ? "animate-scaleUp" : ""}`} />

                {/* Penutup */}
                <div className="text-center w-full">
                  <p className={`text-gray-600 font-serif font-base text-[17px] mb-4 ${page9Visible ? "animate-slideDown" : ""}`}>Hormat Kami</p>

                  {/* Nama pasangan 1 */}
                  <span className="font-semibold text-gray-700 text-center">Hambali, S.Pd. & Nur Asiyah, S.Pd.</span>
                  <br />
                  {/* Nama pasangan 2 */}
                  <span className="font-semibold text-gray-700 text-center">Riki Nurhamzah, S.H. & Suratun Nufus, S.M.</span>
                </div>
                {/* Divider image */}
                <div className={`w-64 h-32 mx-auto -mt-14 ${page9Visible ? "animate-scaleUp" : ""}`}>
                  <img
                    src={underline}
                    alt=""
                  />
                </div>

                {/* Social Media */}
                {/* <div className="flex gap-4 mt-12">
                  <a
                    href="https://instagram.com/rikihamzah_mc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-all ${page9Visible ? "animate-scaleUp" : ""}`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/zhrtnufuss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-all ${page9Visible ? "animate-scaleUp" : ""}`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div> */}
              </section>

              {/* Footer - DigiatGroup */}
              <footer
                ref={footer}
                className="relative w-full px-8 py-12 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Background image layer */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-30"
                  style={{ backgroundImage: `url(${cover})` }}
                ></div>

                {/* Overlay hitam transparan */}
                <div className="absolute inset-0 bg-gray-700"></div>

                {/* Content */}
                <div className={`relative z-10 text-center ${footerVisible ? "animate-fadeIn" : ""}`}>
                  <p className="text-white/60 font-serif text-xs mb-2">Made with ❤️ by</p>

                  <h3 className={`text-2xl font-bold text-white mb-1 ${footerVisible ? "animate-slideUp" : ""}`}>DiGiatGroup</h3>
                  <div className="flex items-center justify-center pb-2 pt-1">
                    <a
                      href="https://instagram.com/zhrtnufuss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-all ${page9Visible ? "animate-scaleUp" : ""}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                  <p className={`text-white/40 font-serif text-xs ${footerVisible ? "animate-slideDown" : ""}`}>Digital Wedding Invitation</p>
                </div>

                <div className={`relative z-10 border-t border-white/20 w-full max-w-xs my-4 ${footerVisible ? "animate-scaleUp" : ""}`}></div>

                <p className={`relative z-10 text-white/40 text-xs font-serif ${footerVisible ? "animate-slideDown" : ""}`}>© 2025 All Rights Reserved</p>
              </footer>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 1s ease-out forwards;
        }
        
        .animate-slideRight {
          animation: slideRight 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slideLeft {
          animation: slideLeft 1s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-scaleUp {
          animation: scaleUp 1s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        @font-face {
          font-family: 'Amoresa';
          src: local('Brush Script MT'), local('Lucida Handwriting'), cursive;
        }
        
        .font-amoresa {
          font-family: 'Amoresa', 'Brush Script MT', 'Lucida Handwriting', cursive;
        }
        
        .font-fugi {
          font-family: 'Times New Roman', serif;
        }
      `}</style>
    </>
  );
}
