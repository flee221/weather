import { initTitleBar } from "./components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { githubApi } from "./apiRouter.js";
import { githubRepos } from "./apiRouter.js";
import { githubLanguages } from "./apiRouter.js";
import { textanimate } from "./components/ui_components/textanimate.js";
import { asciiConvert } from "./components/ui_components/asciiConvert.js";
import { barChart } from "./components/ui_components/barChart.js";
import "./style.css";

function initApp() {
  const app = document.getElementById("app");
  const userName = "beachatel";
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
  //const titleBar = initTitleBar(props);

  const mainContainer = document.createElement("div");
  mainContainer.id = "main";

  const userContainer = document.createElement("div");
  userContainer.id = "user-container";

  const textBox = document.createElement("div");
  textBox.id = "text-box";

  const textItem = document.createElement("p");
  textItem.id = "text-element";

  const textItem2 = document.createElement("p");
  textItem2.id = "text-element";
  const textItem3 = document.createElement("p");
  textItem3.id = "text-element";

  const gridText = document.createElement("div");
  gridText.id = "grid-text";
  gridText.textContent = "TESTING GRID";
  const gridText2 = document.createElement("div");
  gridText2.id = "grid-text2";
  gridText2.textContent = "TESTING GRID";

  const info = document.createElement("div");
  info.id = "info";

  const search = searchInput({
    placeholder: "Enter town or city...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  //contentDiv.appendChild(search);

  //app.appendChild(titleBar);
  app.appendChild(textanimate("GITHUB DASHBOARD: " + userName, 50));
  app.appendChild(mainContainer);
  mainContainer.appendChild(userContainer);
  mainContainer.appendChild(gridText);
  mainContainer.appendChild(gridText2);

  //const asciiBox = document.createElement("pre");
  //asciiBox.id = "ascii-output";

  //app.appendChild(asciiBox);
  //asciiImage("http://localhost:3000/images/github.png");

  githubApi(userName).then((result) => {
    if (!result?.data?.avatar_url) {
      return;
    }
    //console.log(result.data);
    const ascii = asciiConvert({
      imageUrl: result.data.avatar_url,
      width: 45,
    });
    userContainer.appendChild(ascii.element);
    userContainer.appendChild(textBox);

    textItem3.textContent = `USERNAME: ` + userName;
    textItem.textContent = `NAME: ${result.data.name || "//"}`;
    textItem2.textContent = `BIO: ${result.data.bio || "//"}`;
  });
  textBox.appendChild(textItem3);
  textBox.appendChild(textItem);
  textBox.appendChild(textItem2);

  githubRepos(userName).then((result) => {
    info.textContent = JSON.stringify(result.data[0].name);
    console.log(result.data);
  });

  githubLanguages(userName).then((result) => {
    console.log(result);
    info.textContent = JSON.stringify(result);
    const stats = result.data;
    const xValues = Object.keys(stats);
    const rawValues = Object.values(stats);
    const totalSum = rawValues.reduce((a, b) => a + b, 0);
    //a = current total, b = current Item
    const yValues = rawValues.map(
      (currentValue) => (currentValue / totalSum) * 100,
    );
    const chartInfo = barChart(xValues, yValues);
    mainContainer.appendChild(chartInfo.element);
  });
  mainContainer.appendChild(info);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const handleKeyInput = (event, inputElement) => {
  if (event.key === "Enter") {
    const query = inputElement.value.trim();
    // console.log(query);
    //weatherApi(query);
    inputElement.value = "";
  }
};

const handleButtonClick = (event, inputElement) => {
  const query = inputElement.value.trim();
  //console.log(query);
  //geocoding(query);
  //weatherApi(query);
  inputElement.value = "";
};

//async function asciiImage(imageurl) {
//const res = await fetch(
//`http://localhost:3000/ascii?url=${encodeURIComponent(imageurl)}`,
//);

//const text = await res.text();

//const asciiBox = document.getElementById("ascii-output");
//asciiBox.textContent = text;
//}
