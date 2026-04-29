import { searchInput } from "./components/ui_components/searchInput.js";
import { githubApi } from "./apiRouter.js";
import { githubRepos } from "./apiRouter.js";
import { githubLanguages } from "./apiRouter.js";
import { githubRepo } from "./apiRouter.js";
import { textanimate } from "./components/ui_components/textanimate.js";
import { asciiConvert } from "./components/ui_components/asciiConvert.js";
import { barChart } from "./components/ui_components/barChart.js";
import "./style.css";

function initApp() {
  const app = document.getElementById("app");
  const userName = "flee221";

  const handleKeyInput = (event, inputElement) => {
    if (event.key === "Enter") {
      const query = inputElement.value.trim();
      loadRepo(query, userName, repoInfo, repoLink);
      inputElement.value = "";
    }
  };

  const handleButtonClick = (event, inputElement) => {
    const query = inputElement.value.trim();
    loadRepo(query, userName, repoInfo, repoLink);
    inputElement.value = "";
  };

  //All event handlers instantiated^

  //DOM elements
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
  gridText.style.whiteSpace = "pre-line";
  const repoInfo = document.createElement("div");
  const gridText2 = document.createElement("div");
  gridText2.id = "grid-text2";
  gridText2.textContent = "Link to repo:";
  const repoLink = document.createElement("a");
  repoLink.id = "repo-link";

  const repoList = document.createElement("div");
  repoList.id = "repo-list";

  const repoTitle = document.createElement("div");
  repoTitle.id = "repo-title";
  repoTitle.textContent = "List of repos:";
  const info = document.createElement("div");
  info.id = "info";
  info.style.whiteSpace = "pre-line";

  const search = searchInput({
    placeholder: "Enter repo name...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  app.appendChild(textanimate("GITHUB DASHBOARD: " + userName, 50));
  app.appendChild(mainContainer);
  mainContainer.appendChild(userContainer);
  gridText.appendChild(search);
  gridText.appendChild(repoInfo);
  gridText2.appendChild(repoLink);
  mainContainer.appendChild(gridText);
  mainContainer.appendChild(gridText2);
  //DOM elements ^

  githubApi(userName).then((result) => {
    if (!result?.data?.avatar_url) {
      return;
    }
    //return nothing if profile picture doesn't exist
    const ascii = asciiConvert({
      imageUrl: result.data.avatar_url,
      width: 45,
    });
    //send profile photo url to asciify
    userContainer.appendChild(ascii.element);
    //display on dashboard
    userContainer.appendChild(textBox);

    textItem3.textContent = `USERNAME: ` + userName;
    textItem.textContent = `NAME: ${result.data.name || "//"}`;
    textItem2.textContent = `BIO: ${result.data.bio || "//"}`;
    //object destructuring to split the returned object into
    //a readable format
  });
  textBox.appendChild(textItem3);
  textBox.appendChild(textItem);
  textBox.appendChild(textItem2);
  //display user infor to dashboard
  githubRepos(userName).then((result) => {
    repoList.textContent = "";
    result.data.forEach((repo) => {
      repoList.textContent += repo.name + "\n" + "\n";
    });
    //\n adds breaks (new lines) between each item

    loadRepo(result.data[0].name, userName, repoInfo, repoLink);
  });

  githubLanguages(userName).then((result) => {
    const stats = result.data;
    const xValues = Object.keys(stats);
    const rawValues = Object.values(stats);
    const totalSum = rawValues.reduce((a, b) => a + b, 0);
    //a = current total, b = current Item
    const yValues = rawValues.map(
      (currentValue) => (currentValue / totalSum) * 100,
      //map the values to change range -> better for bar chart display
    );
    const chartInfo = barChart(xValues, yValues);
    mainContainer.appendChild(chartInfo.element);
  });
  mainContainer.appendChild(info);
  info.appendChild(repoTitle);
  info.appendChild(repoList);
  //display repo information to dashboard
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function loadRepo(repoName, userName, repoInfo, repoLink) {
  githubRepo(userName, repoName).then((result) => {
    const repo = result.data;
    console.log(result.data);
    repoInfo.textContent = `Repo Name: ${repo.name}
    Date Created: ${repo.created_at}
    Main Language: ${repo.language} 
    Last Updated: ${repo.updated_at}`;
    repoLink.href = repo.html_url;
    repoLink.textContent = repo.html_url;
    repoLink.target = "_blank";
    //opens link in new tab
  });
}
