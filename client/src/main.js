import { initTitleBar } from "./components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { weatherApi } from "./apiRouter.js";
import { textanimate } from "./components/ui_components/textanimate.js";
import "./style.css";

function initApp() {
  const app = document.getElementById("app");

  // Title Bar Configuration with props
  const props = {
    title: "title",
    menuConfig: {
      menuIcon: "\u2630",
      menuStyle: "large",
      menuItems: [
        { text: "About", href: "about" },
        { text: "Contact", href: "contact" },
        { text: "Services", href: "services" },
      ],
    },
  };
  const titleBar = initTitleBar(props);

  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";

  const search = searchInput({
    placeholder: "Enter town or city...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  contentDiv.appendChild(search);

  app.appendChild(titleBar);
  app.appendChild(contentDiv);
  app.appendChild(textanimate("Weather Alert!", 10));

  const asciiBox = document.createElement("pre");
  asciiBox.id = "ascii-output";

  app.appendChild(asciiBox);
  asciiImage("http://localhost:3000/images/github.png");
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const handleKeyInput = (event, inputElement) => {
  if (event.key === "Enter") {
    const query = inputElement.value.trim();
    // console.log(query);
    weatherApi(query);
    inputElement.value = "";
  }
};

const handleButtonClick = (event, inputElement) => {
  const query = inputElement.value.trim();
  //console.log(query);
  //geocoding(query);
  weatherApi(query);
  inputElement.value = "";
};

async function asciiImage(imageurl) {
  const res = await fetch(
    `http://localhost:3000/ascii?url=${encodeURIComponent(imageurl)}`,
  );

  const text = await res.text();

  const asciiBox = document.getElementById("ascii-output");
  asciiBox.textContent = text;
}
