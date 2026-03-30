import "./asciiConvert.css";
import { asciiApi } from "../../apiRouter.js";

export function asciiConvert({ imageUrl, width }) {
  const container = document.createElement("div");
  const asciiBox = document.createElement("pre");
  asciiBox.className = "ascii-output";

  container.appendChild(asciiBox);

  async function asciiImage(url) {
    try {
      const text = await asciiApi(url, width);
      asciiBox.textContent = text;
    } catch (error) {
      console.log(error);
    }
  }

  if (imageUrl) {
    asciiImage(imageUrl);
  }

  return {
    element: container,
    updateImage: asciiImage,
  };
}
