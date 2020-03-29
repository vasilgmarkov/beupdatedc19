<template>
  <v-container class="text-center" v-if="loading">
    <Loading />
  </v-container>
  <div class="country-chart" v-else>
    <div class="chart-container">
      <div class="alert alert-info"></div>
      <div v-show="chart != null">
        <canvas id="myChart" style="height:40vh; width:80vw"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
  name: "CountryChart",
  components: {
    Loading
  },
  props: ["code"],
  data() {
    return {
      chart: null,
      city: "",
      dates: [],
      temps: [],
      deaths: [],
      recovered: [],
      loading: true,
      errored: false,
      imelineitems: [],
      country: ""
    };
  },
  methods: {
    getData: function() {
      const ordered = {};
      Object.keys(this.imelineitems[0])
        .sort()
        .forEach(key => {
          ordered[key] = this.imelineitems[0][key];
        });

      for (let key in ordered) {
        if (key != "stat") {
          this.dates.push(key);
          this.recovered.push(ordered[key].total_recoveries);
          this.temps.push(ordered[key].total_cases);
          this.deaths.push(ordered[key].total_deaths);
        }
      }

      var ctx = document.getElementById("myChart");
      let that = this;
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.dates,
          datasets: [
            {
              label: "Confirmed",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: this.temps
            },
            {
              label: "Deaths",
              backgroundColor: "#ce4b44",
              borderColor: "#ce4b44",
              fill: false,
              data: this.deaths
            },
            {
              label: "Recovered",
              backgroundColor: "#91c439",
              borderColor: "#91c439",
              fill: false,
              data: this.recovered
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: `The time line of the infection in ${this.country}`
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";

                if (label) {
                  label += ": ";
                }

                label += Math.floor(tooltipItem.yLabel);
                let test = `Confirmados ${Math.floor(tooltipItem.yLabel)}`;
                return "№ " + label;
              }
            }
          },
          scales: {
            xAxes: [
              {
                //type: "time",
                time: {
                  //  unit: "hour",
                  displayFormats: {
                    hour: "M/DD"
                  },
                  tooltipFormat: "MMM. DD"
                },
                scaleLabel: {
                  display: true,
                  labelString: "Date"
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "№ of infected"
                },

                ticks: {
                  callback: function(value, index, values) {
                    return "№ " + value;
                  }
                }
              }
            ]
          }
        }
      });
    },
    customTooltips: function(tooltip) {
      // Tooltip Element
      var tooltipEl = document.getElementById("chartjs-tooltip");

      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";
        tooltipEl.innerHTML = "<table></table>";
        this.cani.parentNode.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove("above", "below", "no-transform");
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add("no-transform");
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);

        var innerHtml = "<thead>";

        titleLines.forEach(function(title) {
          innerHtml += "<tr><th>" + title + "</th></tr>";
        });
        innerHtml += "</thead><tbody>";

        bodyLines.forEach(function(body, i) {
          var colors = tooltip.labelColors[i];
          var style = "background:" + colors.backgroundColor;
          style += "; border-color:" + colors.borderColor;
          style += "; border-width: 2px";
          var span =
            '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
          innerHtml += "<tr><td>" + span + body + "</td></tr>";
        });
        innerHtml += "</tbody>";

        var tableRoot = tooltipEl.querySelector("table");
        tableRoot.innerHTML = innerHtml;
      }

      var positionY = this.cani.offsetTop;
      var positionX = this.cani.offsetLeft;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + "px";
      tooltipEl.style.top = positionY + tooltip.caretY + "px";
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize + "px";
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding =
        tooltip.yPadding + "px " + tooltip.xPadding + "px";
    },
    getLiveData() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://thevirustracker.com/free-api?countryTimeline=${this.code}`
        )
        .then(res => {
          this.loading = false;
          this.imelineitems = res.data.timelineitems;
          this.country = res.data.countrytimelinedata[0].info.title;
          setTimeout(() => {
            this.getData();
          }, 1);
        });
    }
  },
  created() {
    this.getLiveData();
  }
};
</script>