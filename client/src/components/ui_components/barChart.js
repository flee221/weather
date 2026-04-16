import Chart from "chart.js/auto";
import "./barChart.css";

export function barChart(xValues = [], yValues = []) {
  const container = document.createElement("div");
  container.id = "barchart";

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const colourOptions = barColours(xValues.length);
  const myChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        { label: "Languages", backgroundColor: colourOptions, data: yValues },
      ],
    },
    options: {
      maintainAspectRatio: false, // 👈 IMPORTANT

      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "LanguageChart",
        },
      },
    },
  });
  return {
    element: container,
    chart: myChart,
  };
}

function barColours(length) {
  const allColours = [
    "rgb(255, 206, 73)",
    "rgb(255, 186, 58)",
    "rgb(184, 119, 0)",
    "rgb(241, 211, 155)",
  ];

  const colours = [];

  for (let i = 0; i < length; i++) {
    colours.push(allColours[i % allColours.length]);
  }

  return colours;
}
