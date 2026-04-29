import express from "express";
import dotenv from "dotenv";
import { generateAscii } from "./asciiConvert.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;
const githubKey = process.env.GITHUB_KEY;
app.use(cors());

app.listen(port, () => {
  console.log("server is running");
});

app.get("/ascii", async (req, res) => {
  try {
    const { url, width } = req.query;
    //place parameters into variables
    const ascii = await generateAscii(url, { width: Number(width) });
    //url is received from front end
    res.type("text/plain");
    //convert result to text format
    res.send(ascii);
    //return result to front end
  } catch (err) {
    res.status(500).send("Error w ASCII");
  }
});

app.get("/github", async (req, res) => {
  //Uses express to define an endpoint on the server
  try {
    const { username } = req.query;
    //places parameter into variable (received from front end)
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${githubKey}`,
        //send across API key alongside request
        Accept: "application/vnd.github+json",
        //result format must be json
      },
      //backend acts as client for http request to github API
    });
    const data = await response.json();
    //converts into readable forman

    res.json({ data });
    //returns to frontend
  } catch (err) {
    console.log(err);
    //try catch block to catch errors and log in console
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
    //place into variable
    const languageStats = [];
    const total = {};
    for (const repo of allRepos) {
      const res = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${githubKey}`,
          Accept: "application/vnd.github+json",
        },
      });
      //second call to get language statistics for all repos

      const data = await res.json();
      languageStats.push(data);
      //add language statistics in array
    }

    languageStats.forEach((languages) => {
      for (const langauge in languages) {
        total[langauge] = (total[langauge] || 0) + languages[langauge];
        //cumulative sum of all languages
      }
    });

    res.json({ data: total });
  } catch (err) {
    console.log(err);
  }
});

app.get("/github/repo", async (req, res) => {
  try {
    const { username, reponame } = req.query;
    const response = await fetch(
      `https://api.github.com/repos/${username}/${reponame}`,
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

app.use(express.static(path.join(process.cwd(), "../client")));
app.use(express.static(path.join(process.cwd(), "../client/public")));
