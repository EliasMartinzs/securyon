"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Header } from "./_components/header";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");

  return (
    <main className="w-full h-screen relative">
      <Header />
      <div className="absolute top-0 left-0 -z-10 saturate-200 blur-[80px] rounded-full w-[15%] h-20 bg-gradient-to-r from-[#2b0a19] to-[#0e192e]" />
      <div className="w-full h-svh flex items-center justify-center">
        <div className="max-sm:max-w-sm max-w-3xl relative">
          <div className="w-[35%] blur-[120px] saturate-200 rounded-left h-96 absolute left-0 top-0 bg-[#2b0a19] -z-10 opacity-50" />
          <h1 className="text-center text-7xl max-sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-slate-500 py-8">
            Protegendo suas senhas, simplificando sua vida.
          </h1>
          <div className="w-[35%] blur-[120px] saturate-200 rounded-right h-96 absolute right-0 top-0 bg-[#0E192E] -z-10 opacity-50" />
        </div>
      </div>
    </main>
  );
}
