import React, { useState, useEffect } from "react";
import { Upload, Plus, Trash2, Download } from "lucide-react";
import mainFoto from "../assets/prewed4.jpeg";
export default function SendInvitation() {
  const [inviterName, setInviterName] = useState("");
  const [guestList, setGuestList] = useState("");
  const [selectedGreeting, setSelectedGreeting] = useState("Formal");
  const [customGreeting, setCustomGreeting] = useState("*Om Shanti, Shanti, Shanti, Om*\n\nTerima Kasih\n\nHormat kami,\n[mempelai]\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _");
  const [generatedGuests, setGeneratedGuests] = useState([]);

  // Get event ID from URL
  const eventId = new URLSearchParams(window.location.search).get("id") || "riki-nufus";
  // const invitationUrl = `https://digiat-app.vercel.app/${eventId}/send`;
  const invUrl = `https://digiat-app.vercel.app/${eventId}`;

  const greetingTemplates = {
    Formal:
      "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[nama]*\n_____________________\n\n*Selamat Pagi*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.\n\n*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :\n[link-undangan]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\n*Selamat Pagi*\n\nTerima Kasih\n\nHormat kami,\nHambali, S.Pd. dan Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. dan Suratun Nufus, S.M.\n____________________",

    Muslim:
      "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[nama]*\n_____________________\n\n*Bismillahirrahmanirrahim*\n*Assalamualaikum Wr. Wb.*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.\n\n*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :\n[link-undangan]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\nJazakallah Khair\n\n*Wassalamualaikum Wr. Wb.*\n\nHambali, S.Pd. dan Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. dan Suratun Nufus, S.M.\n____________________",

    Nasrani:
      "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[nama]*\n_____________________\n\n*Tuhan memberkati*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.\n\n*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :\n[link-undangan]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\nTerima kasih\n\nSalam kasih,\nHambali, S.Pd. dan Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. dan Suratun Nufus, S.M.\n____________________",

    Hindu:
      "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[nama]*\n_____________________\n\n*Om Swastiastu*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.\n\n*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :\n[link-undangan]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\n*Om Shanti, Shanti, Shanti, Om*\n\nTerima kasih\n\nHambali, S.Pd. dan Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. dan Suratun Nufus, S.M.\n____________________",

    Khitan:
      "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[nama]*\n_____________________\n\n*Barakallah*\n*Assalamualaikum Wr. Wb.*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara khitan putra kami.\n\n*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :\n[link-undangan]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\nTerima kasih\n\n*Wassalam*\n\nHambali, S.Pd. dan Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. dan Suratun Nufus, S.M.\n____________________",

    English:
      "Dear\nMr./Mrs./Ms.\n*[nama]*\n_____________________\n\n*Thank you*\n\nWith all due respect, we would like to invite you, our friend and companion, to attend our wedding ceremony.\n\n*Here is our invitation link*, for complete information about the event, please visit:\n[link-undangan]\n\nIt would be an honor for us if you could attend and give us your blessings.\n\nBest regards,\nHambali, S.Pd. & Nur Asiyah, S.Pd.\nRiki Nurhamzah, S.H. & Suratun Nufus, S.M.\n____________________",
  };

  useEffect(() => {
    if (selectedGreeting !== "Custom") {
      setCustomGreeting(greetingTemplates[selectedGreeting]);
    }
  }, [selectedGreeting]);

  const handleImportExcel = () => {
    alert("Fitur import Excel akan segera hadir!");
  };

  const sendToWhatsApp = (message) => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const generateInvitations = () => {
    const names = guestList.split("\n").filter((name) => name.trim());

    const guests = names.map((name, index) => ({
      id: index + 1,
      name: name.trim(),
      link: `${invUrl}?to=${encodeURIComponent(name.trim())}`,
      message: generateMessage(selectedGreeting === "Custom" ? customGreeting : greetingTemplates[selectedGreeting], name.trim()),
    }));

    setGeneratedGuests(guests);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link berhasil disalin!");
  };

  const exportAllData = () => {
    const data = generatedGuests.map((guest) => `${guest.name}\t${guest.link}`).join("\n");

    const blob = new Blob([`Nama Tamu\tLink Undangan\n${data}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `undangan-${eventId}.txt`;
    a.click();
  };

  const deleteAllData = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
      setGeneratedGuests([]);
      setGuestList("");
    }
  };

  const generateMessage = (template, name) => {
    return template
      .replace(/\*\[nama\]\*/g, name)
      .replace("[link-undangan]", `${invUrl}?to=${encodeURIComponent(name)}`)
      // .replace("[mempelai]", inviterName || "")
      .trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Share Invitation Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              URL Anda:{" "}
              <a
                href={invUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {invUrl}
              </a>
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-gray-700">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yang Mengundang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={inviterName}
              onChange={(e) => setInviterName(e.target.value)}
              placeholder="Fajar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">List Nama Tamu Undangan</label>
            <p className="text-xs text-blue-600 mb-2">
              * <strong>Gunakan baris baru (+)</strong> untuk memisahkan nama yang akan diundang.
            </p>
            <textarea
              value={guestList}
              onChange={(e) => setGuestList(e.target.value)}
              placeholder="Nama Tamu 1 (+)"
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleImportExcel}
              className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <Upload size={16} />
              Import dari File Excel
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Pilihan Teks Pengantar</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.keys(greetingTemplates).map((template) => (
                <button
                  key={template}
                  onClick={() => setSelectedGreeting(template)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${selectedGreeting === template ? "bg-yellow-400 text-gray-800" : "bg-yellow-100 text-gray-700 hover:bg-yellow-200"}`}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Isi Kata Pengantar</label>
            <textarea
              value={customGreeting}
              onChange={(e) => setCustomGreeting(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Ket: Teks Pengantar dapat di edit/custom, namun jangan mengedit/menghapus <span className="text-red-600 font-semibold">[nama] [link-undangan] [mempelai]</span>
            </p>
          </div>

          <button
            onClick={generateInvitations}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Buat Daftar Nama Tamu
          </button>
        </div>

        {/* Generated Invitations */}
        {generatedGuests.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <h3 className="text-lg font-bold text-gray-800">Nama Tamu</h3>
              <span className="text-lg font-bold text-gray-800">Pilihan</span>
            </div>

            <div className="space-y-3 mb-6">
              {generatedGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">{guest.name}</span>
                  <button
                    onClick={() => copyToClipboard(guest.link)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Salin Link
                  </button>
                  <button
                    onClick={() => sendToWhatsApp(guest.message)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    Kirim
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={exportAllData}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={20} />
                Export Semua Data Tamu
              </button>

              <button
                onClick={deleteAllData}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 size={20} />
                Hapus Semua Daftar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
