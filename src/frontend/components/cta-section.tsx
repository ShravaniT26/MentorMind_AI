"use client"

export default function CTASectionAlt() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[rgba(55,50,47,0.12)]">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f4f6fb] via-white to-[#eef2f8]" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-center flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#2A2E35] leading-tight">
          Smarter teaching starts with better evaluation.
        </h2>

        <p className="text-base md:text-lg text-[#565B66] leading-7 font-medium">
          Mentor Mind uses AI to assess teaching effectiveness, interpret student responses,
          and provide clear feedback that helps educators improve continuously.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="relative h-11 px-12 rounded-full bg-[#2A2E35] text-white text-sm font-medium shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] hover:bg-[#1E2228] transition-all">
            <span className="relative z-10">Explore Mentor Mind</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-black/10 mix-blend-multiply" />
          </button>
        </div>
      </div>
    </section>
  )
}
