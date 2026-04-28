import "./asciiConvert.css";
import { asciiApi } from "../../apiRouter.js";

export function asciiConvert({ imageUrl, width }) {
  const container = document.createElement("div");
  const asciiBox = document.createElement("pre");
  asciiBox.className = "asciiOutput";

  container.appendChild(asciiBox);

  async function asciiImage(url) {
    //async function to allow for waiting when fetching data from API call
    try {
      const text = await asciiApi(url, width);
      //call to apirouter to access the backend function
      //place response in local variable
      asciiBox.textContent = text;
    } catch (error) {
      console.log(error);
    }
  }

  if (imageUrl) {
    asciiImage(imageUrl);
    //apply asciify if a starting image is provided
  }

  return {
    element: container,
    updateImage: asciiImage,
  };
  //return element to insert as DOM element
  //return asciffied image itself if later customisation or updating is needed
}
