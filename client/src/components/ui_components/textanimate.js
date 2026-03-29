import "./textanimate.css";

export function textanimate(text, speed = 2) {
  const textContainer = document.createElement("div");
  textContainer.className = "textContainer";

  const textElement = document.createElement("span");
  let textNo = innerWidth / 40;
  textElement.textContent = `${text}`;
  textElement.style.animation = `animatedText ${speed}s linear infinite`;

  textContainer.appendChild(textElement);
  return textContainer;
}
