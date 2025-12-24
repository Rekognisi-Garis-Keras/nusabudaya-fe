"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GoldEmblem from "@/app/loading/page";

export default function GoogleCallbackPage() {
   const router = useRouter();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
         localStorage.setItem("token", token);
         router.push("/atlas");
      } else {
         alert("Login gagal!");
         router.push("/login");
      }
   }, [router]);

   return <GoldEmblem />;
}
