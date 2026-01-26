import type React from "react"

interface MentorMindSyncProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: "light" | "dark"
}

/**
 * MentorMindAI – Video Evaluation & Accessibility Flow UI
 * Generated from Figma via MCP (482×300px)
 */
const MentorMindSync: React.FC<MentorMindSyncProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  const themeVars =
    theme === "light"
      ? {
          "--yws-surface": "#ffffff",
          "--yws-text-primary": "#37322f",
          "--yws-text-secondary": "#6b7280",
          "--yws-bubble-light": "#e8e5e3",
          "--yws-bubble-dark": "#37322f",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(0,0,0,0.08)",
          "--yws-shadow": "rgba(0,0,0,0.08)",
        }
      : ({
          "--yws-surface": "#1f2937",
          "--yws-text-primary": "#f9fafb",
          "--yws-text-secondary": "#d1d5db",
          "--yws-bubble-light": "#374151",
          "--yws-bubble-dark": "#111827",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(255,255,255,0.12)",
          "--yws-shadow": "rgba(0,0,0,0.24)",
        } as React.CSSProperties)

  const imgFrame2147223205 = "/professional-woman-avatar-with-short-brown-hair-an.jpg"
  const imgFrame2147223206 = "/professional-man-avatar-with-beard-and-glasses-loo.jpg"
  const imgFrame2147223207 = "/professional-person-avatar-with-curly-hair-and-war.jpg"
  const imgArrowUp =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m5 12 7-7 7 7'/%3E%3Cpath d='M12 19V5'/%3E%3C/svg%3E"

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: "relative",
        background: "transparent",
        ...themeVars,
      }}
      role="img"
      aria-label="MentorMindAI video evaluation and accessibility feedback flow"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "356px",
          height: "216px",
        }}
      >
        <div style={{ width: "356px", height: "216px", position: "relative", transform: "scale(1.1)" }}>
          
          {/* Message 1 */}
          <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 44,
                backgroundImage: `url('${imgFrame2147223205}')`,
                backgroundSize: "cover",
                border: "1px solid var(--yws-border)",
              }}
            />
            <div
              style={{
                background: theme === "light" ? "#e8e5e3" : "var(--yws-bubble-light)",
                borderRadius: 999,
                padding: "0 12px",
                height: 36,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 500 }}>
                Video uploaded for evaluation
              </span>
            </div>
          </div>

          {/* Message 2 */}
          <div style={{ position: "absolute", right: 0, top: 60, display: "flex", gap: 10 }}>
            <div
              style={{
                background: theme === "light" ? "#37322f" : "var(--yws-bubble-dark)",
                borderRadius: 999,
                padding: "0 12px",
                height: 36,
                display: "flex",
                alignItems: "center",
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              AI analysis in progress
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 44,
                backgroundImage: `url('${imgFrame2147223206}')`,
                backgroundSize: "cover",
                border: "1px solid var(--yws-border)",
              }}
            />
          </div>

          {/* Message 3 */}
          <div style={{ position: "absolute", left: 0, top: 120, display: "flex", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 44,
                backgroundImage: `url('${imgFrame2147223207}')`,
                backgroundSize: "cover",
                border: "1px solid var(--yws-border)",
              }}
            />
            <div
              style={{
                background: theme === "light" ? "#e8e5e3" : "var(--yws-bubble-light)",
                borderRadius: 999,
                padding: "0 12px",
                height: 36,
                display: "flex",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Accessibility modes generated
            </div>
          </div>

          {/* Final Output */}
          <div style={{ position: "absolute", left: 146, top: 180, display: "flex", gap: 10 }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "0 12px",
                height: 36,
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08)",
                fontSize: 14,
              }}
            >
              Evaluation report ready
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 44,
                background: theme === "light" ? "#37322f" : "var(--yws-bubble-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={imgArrowUp} alt="View result" style={{ width: 20, height: 20 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorMindSync
