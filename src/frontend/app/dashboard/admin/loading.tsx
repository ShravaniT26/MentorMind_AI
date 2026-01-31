import React from "react";

// You can style the spinner using CSS or inline styles
const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #3498db",
  borderRadius: "60%",
  animation: "spin 1s linear infinite",
  margin: "50px auto",
};

// Adding keyframes for spin animation
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default function Loading() {
  return (
    <div>
      <div style={spinnerStyle}></div>
      <p style={{ textAlign: "center", fontSize: "16px" }}>Loading...</p>
    </div>
  );
}
