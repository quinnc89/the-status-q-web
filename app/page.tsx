import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: 'Status Q Copy | Premium Scriptwriting Studio',
  description: 'Transparent process. Modern scripts. Genuine results. Copy that converts.',
  generator: 'v0.app',
}

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-center">
        The Status Q <span className="text-blue-600">Gap</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">
        High-level earners are scaling past their tech. Don't run a 7-figure business on a 5-figure website.
      </p>
      <div className="mt-8">
        <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
          Secure Your Status
        </button>
      </div>
    </main>
  );
}