import express from "express";
import dotenv from "dotenv";
import { generateAscii } from "./asciiConvert.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;
const githubKey = process.env.GITHUB_KEY;
app.use(cors());

async function geocoding(placename) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=1&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { lat, lon } = data[0];
    const weatherdata = await getWeatherData(lat, lon);
    return weatherdata;
  } catch (error) {
    console.log(error);
  }
}

async function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;

  //dailyForecast(data.current, data.daily);
}

app.get("/weather", async (req, res) => {
  console.log(req.query);
  const { placename } = req.query;
  const data = await geocoding(placename);
  res.send({ data: data });
});

app.listen(port, () => {
  console.log("server is running");
});

app.get("/ascii", async (req, res) => {
  try {
    const { url, width } = req.query;

    const ascii = await generateAscii(url, { width: Number(width) });
    res.type("text/plain");
    res.send(ascii);
  } catch (err) {
    res.status(500).send("Error w ASCII");
  }
});

app.get("/github", async (req, res) => {
  try {
    const { username } = req.query;

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${githubKey}`,
        Accept: "application/vnd.github+json",
      },
    });
    const data = await response.json();

    res.json({ data });
  } catch (err) {
    console.log(err);
  }
});

app.get("/github/repos", async (req, res) => {
  try {
    const { username } = req.query;

    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${githubKey}`,
          Accept: "application/vnd.github+json",
        },
      },
    );
    const data = await response.json();

    res.json({ data });
  } catch (err) {
    console.log(err);
  }
});

app.get("/github/languages", async (req, res) => {
  try {
    const { username } = req.query;
    const fetchRepos = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${githubKey}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const allRepos = await fetchRepos.json();
    const languageStats = [];
    const total = {};
    for (const repo of allRepos) {
      const res = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${githubKey}`,
          Accept: "application/vnd.github+json",
        },
      });

      const data = await res.json();
      languageStats.push(data);
    }

    languageStats.forEach((languages) => {
      for (const langauge in languages) {
        total[langauge] = (total[langauge] || 0) + languages[langauge];
      }
    });

    res.json({ data: total });
  } catch (err) {
    console.log(err);
  }
});

app.use(express.static(path.join(process.cwd(), "../client")));
app.use(express.static(path.join(process.cwd(), "../client/public")));
