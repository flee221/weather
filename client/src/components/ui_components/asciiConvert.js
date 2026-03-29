import "./asciiConvert.css";

export function asciiConvert({ imageUrl, width }) {
  const container = document.createElement("div");
  const asciiBox = document.createElement("pre");
  asciiBox.className = "ascii-output";

  container.appendChild(asciiBox);

  async function asciiImage(url) {
    try {
      const res = await fetch(
        `http://localhost:3000/ascii?url=${encodeURIComponent(url)}&width=${width}`,
      );
      const text = await res.text();
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
