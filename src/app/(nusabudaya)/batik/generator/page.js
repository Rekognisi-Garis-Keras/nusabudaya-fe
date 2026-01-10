"use client";
import React, { useState, useRef } from "react";
import { Download, RefreshCcw } from "lucide-react"; // Icon tambahan
import HeaderSection from "@/components/HeaderSection";
import PreviewArea from "@/components/BuatBatik/PreviewArea";
import UploadArea from "@/components/BuatBatik/UploadArea";
import { apiRequest } from "@/utils/api"; // Import api helper

const BuatBatikPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menyimpan hasil generate
  const [generatedImage, setGeneratedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      // Reset hasil sebelumnya jika user upload gambar baru
      setGeneratedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setPrompt("");
    setGeneratedImage(null); // Reset hasil generate
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!selectedFile || !prompt.trim()) return;

    setIsLoading(true);
    setGeneratedImage(null); // Bersihkan hasil sebelumnya saat mulai generate baru

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("deskripsi", prompt);

      const response = await apiRequest("/ai/batik", {
        method: "POST",
        isFormData: true,
        body: formData,
      });

      if (response && response.data) {
        setGeneratedImage(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Gagal membuat batik. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    // Pastikan prefix data uri ada agar bisa didownload sebagai gambar
    link.href = `data:image/jpeg;base64,${generatedImage}`;
    link.download = `batik-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#05121b] pb-20 md:pb-0">
      <div className="w-full h-full p-4 md:p-8">
        <HeaderSection
          breadcrumb="NusaBatik"
          sectionTitle="Ciptakan Motif Batik Modern dengan AI"
          description="Transformasikan ide kreatifmu menjadi desain batik autentik. Upload sketsa atau referensi visual, tambahkan deskripsi motif yang diinginkan, dan biarkan AI menciptakan karya batik unik untukmu."
        />

        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
          {/* Area Input & Preview Upload */}
          {!imagePreview ? (
            <UploadArea
              inputRef={fileInputRef}
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : (
            <PreviewArea
              onSubmit={handleSubmit}
              prompt={prompt}
              setPrompt={setPrompt}
              imagePreview={imagePreview}
              onRemoveImage={handleRemoveImage}
              isLoading={isLoading}
            />
          )}

          {/* Hidden Input File */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* RESULT SECTION */}
          {generatedImage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-[#5B5B5B]">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Hasil <span className="text-[#c8a668]">NusaBatik</span> Anda
              </h3>
              
              <div className="bg-[#1a2832]/50 border border-[#c8a668]/30 rounded-xl p-4 md:p-6">
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-[#5B5B5B] shadow-2xl">
                  <img
                    src={`data:image/jpeg;base64,${generatedImage}`}
                    alt="Generated Batik"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                  <button
                    onClick={handleDownload}
                    className="bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#c8a668]/20"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Batik</span>
                  </button>
                  
                  <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-transparent border border-[#5B5B5B] hover:border-[#c8a668] text-white hover:text-[#c8a668] font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    <span>Buat Lagi</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BuatBatikPage;