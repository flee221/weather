import "./textanimate.css";

export function textanimate(text, speed) {
  const textContainer = document.createElement("div");
  textContainer.className = "textContainer";

  const textElement = document.createElement("span");
  let textNo = innerWidth / 50;
  textElement.textContent = (text + " / ").repeat(textNo);
  textElement.style.animation = `animatedText ${speed}s linear infinite,
  glow 2s ease-in-out infinite alternate`;
  textContainer.appendChild(textElement);
  return textContainer;
}
