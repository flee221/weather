import { dailyForecast } from "./components/ui_components/weatherTile.js";

export async function weatherApi(placename) {
  const url = `/weather?placename=${placename}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data.daily);
  dailyForecast(data.data.current, data.data.daily);
}

export async function githubApi(username) {
  try {
    const res = await fetch(`/github?username=${encodeURIComponent(username)}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
  //try catch block in the event of incorrect username
}

export async function githubRepos(username) {
  try {
    const res = await fetch(
      `/github/repos?username=${encodeURIComponent(username)}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function githubLanguages(username) {
  try {
    const res = await fetch(
      `/github/languages?username=${encodeURIComponent(username)}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function asciiApi(url, width) {
  const res = await fetch(
    `/ascii?url=${encodeURIComponent(url)}&width=${width}`,
  );
  return await res.text();
}
