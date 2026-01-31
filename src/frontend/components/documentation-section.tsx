"use client"

import { useState, useEffect } from "react"
import type React from "react"

// Badge component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] rounded-[90px] flex items-center gap-[8px] border border-[rgba(2,6,23,0.08)]">
      <div className="w-[14px] h-[14px] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-[#37322F] text-xs font-medium font-sans">
        {text}
      </div>
    </div>
  )
}

export default function MentorMindSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const cards = [
    {
      title: "AI-based Teaching Evaluation",
      description:
        "Upload recorded teaching sessions.\nGet objective scores for clarity, engagement, pace, and depth.",
    },
    {
      title: "Deterministic & Fair Scoring",
      description:
        "Independent ONNX models ensure\nreproducible, unbiased evaluation results.",
    },
    {
      title: "Accessibility-First Learning",
      description:
        "Automatically generate Blind,\nDeaf, and Easy learning modes.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [cards.length])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center">
        <div className="max-w-[600px] flex flex-col items-center gap-4 text-center">
          <Badge
            icon={
              <div className="w-[10px] h-[10px] rounded-full border border-[#37322F]" />
            }
            text="MentorMindAI"
          />

          <h2 className="text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight">
            Teaching Evaluation Engine
          </h2>

          <p className="text-[#605A57] text-base leading-7">
            Evaluate teaching quality and generate inclusive learning formats
            <br />
            using AI-powered video analysis.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-9">
        <div className="py-8 md:py-11 flex flex-col md:flex-row items-center gap-10">
          
          {/* Feature Cards */}
          <div className="w-full md:max-w-[420px] flex flex-col gap-4 order-2 md:order-1">
            {cards.map((card, index) => {
              const isActive = index === activeCard

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-white shadow-[0px_0px_0px_1px_#E0DEDB_inset]"
                      : "border border-[rgba(2,6,23,0.08)]"
                  }`}
                >
                  <div
                    className={`h-0.5 bg-[rgba(50,45,43,0.08)] ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards]"
                    />
                  </div>

                  <div className="px-6 py-5 flex flex-col gap-2">
                    <h3 className="text-[#49423D] text-sm font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-[#605A57] text-[13px] leading-[22px] whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Visual Area */}
          <div className="order-1 md:order-2">
            <div className="w-full md:w-[580px] h-[260px] md:h-[420px] rounded-lg overflow-hidden shadow border">
              <div
                className={`w-full h-full transition-all duration-300 ${
                  activeCard === 0
                    ? "bg-gradient-to-br from-slate-50 to-slate-100"
                    : activeCard === 1
                    ? "bg-gradient-to-br from-indigo-50 to-indigo-100"
                    : "bg-gradient-to-br from-emerald-50 to-emerald-100"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}
