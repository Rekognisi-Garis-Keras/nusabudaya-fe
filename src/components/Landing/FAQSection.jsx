"use client";

import React, { useState, useRef } from "react";
import { LIST_FAQ } from "@/constants/listFaq";
import { Plus, Minus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register plugin kalau belum (biasanya di root, tapi aman ditaruh sini buat jaga-jaga)
gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ item, isOpen, onClick, index }) => {
  const contentRef = useRef(null);

  // Animasi buka-tutup yang smooth pake GSAP
  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between group text-left transition-all"
      >
        <span
          className={`text-lg md:text-xl font-medium transition-colors duration-300 ${
            isOpen
              ? "text-(--color-secondary)"
              : "text-white group-hover:text-(--color-secondary)"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`p-2 rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-(--color-secondary) text-(--color-secondary) rotate-180"
              : "border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <p className="pb-5 text-[#b5b5b5] leading-relaxed md:text-lg">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default yang pertama kebuka
  const containerRef = useRef(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animasi masuk pas scroll
  useGSAP(
    () => {
      gsap.from(".faq-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".faq-list-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="faq"
      ref={containerRef}
      className="max-w-6xl w-full mx-auto bg-(--color-primary) py-20 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Side: Header Sticky */}
        <div className="lg:w-1/3 faq-header-anim">
          <div className="lg:sticky lg:top-32">
            <span className="uppercase tracking-widest text-(--color-secondary) text-sm font-semibold mb-3 block">
              Tanya Jawab
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Masih Bingung? <br /> Yuk Cari Tahu.
            </h2>
            <p className="text-[#b5b5b5] text-lg mb-8">
              Temukan jawaban untuk pertanyaan yang paling sering diajukan oleh
              pengguna NusaBudaya di sini.
            </p>

            {/* Optional: CTA Button kecil */}
            <a
              href="mailto:support@nusabudaya.com"
              className="inline-flex text-white font-medium border-b border-(--color-secondary) pb-1 hover:text-(--color-secondary) transition-colors"
            >
              Punya pertanyaan lain? Hubungi Kami
            </a>
          </div>
        </div>

        {/* Right Side: Accordion List */}
        <div className="lg:w-2/3 faq-list-anim">
          <div className="bg-white/5 rounded-xl px-6 py-3  md:p-8 md:py-5 border border-white/5 backdrop-blur-sm">
            {LIST_FAQ.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
