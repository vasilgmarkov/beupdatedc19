<template>
   <v-container class="text-center" v-if="loading">
<Loading />
</v-container>
  <div class="country-chart" v-else>
 
        <div class="chart-container" >
          <div class="alert alert-info" >
       
          </div>
          <div v-show="chart != null">
            <canvas id="myChart"style="height:40vh; width:80vw" ></canvas>
          </div>
        </div>
   
  </div>
</template>

<script>
import axios from "axios"
import Loading from "../components/Loading.vue"

export default {
  name: "CountryChart",
  components:{
    Loading
  },
   props: ["code"],
  data() {
    return {
     chart: null,
    city: '',
    dates: [],
    temps: [],
    deaths:[],
    recovered:[],
    loading: true,
    errored: false,
    imelineitems:[],
    country:""
    // imelineitems: [
    // {
    //   "1/23/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 1,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/24/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 2,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/25/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 2,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/26/2020": {
    //     "new_daily_cases": 3,
    //     "new_daily_deaths": 0,
    //     "total_cases": 5,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/27/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 5,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/28/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 5,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/29/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 5,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/30/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 5,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "1/31/2020": {
    //     "new_daily_cases": 2,
    //     "new_daily_deaths": 0,
    //     "total_cases": 7,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/1/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 8,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/2/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 8,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/3/2020": {
    //     "new_daily_cases": 3,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/4/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/5/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/6/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/7/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/8/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 0,
    //     "total_deaths": 0
    //   },
    //   "2/9/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/10/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 11,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/11/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 12,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/12/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 12,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/13/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/14/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/15/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/16/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/17/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/18/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/19/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/20/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13,
    //     "total_recoveries": 3,
    //     "total_deaths": 0
    //   },
    //   "2/21/2020": {
    //     "new_daily_cases": 2,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 5,
    //     "total_deaths": 0
    //   },
    //   "2/22/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 5,
    //     "total_deaths": 0
    //   },
    //   "2/23/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 5,
    //     "total_deaths": 0
    //   },
    //   "2/24/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 5,
    //     "total_deaths": 0
    //   },
    //   "2/25/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 6,
    //     "total_deaths": 0
    //   },
    //   "2/26/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 15,
    //     "total_recoveries": 6,
    //     "total_deaths": 0
    //   },
    //   "2/27/2020": {
    //     "new_daily_cases": 1,
    //     "new_daily_deaths": 0,
    //     "total_cases": 16,
    //     "total_recoveries": 6,
    //     "total_deaths": 0
    //   },
    //   "2/28/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 16,
    //     "total_recoveries": 7,
    //     "total_deaths": 0
    //   },
    //   "2/29/2020": {
    //     "new_daily_cases": 8,
    //     "new_daily_deaths": 1,
    //     "total_cases": 24,
    //     "total_recoveries": 7,
    //     "total_deaths": 1
    //   },
    //   "3/1/2020": {
    //     "new_daily_cases": 6,
    //     "new_daily_deaths": 0,
    //     "total_cases": 30,
    //     "total_recoveries": 7,
    //     "total_deaths": 1
    //   },
    //   "3/2/2020": {
    //     "new_daily_cases": 23,
    //     "new_daily_deaths": 5,
    //     "total_cases": 53,
    //     "total_recoveries": 7,
    //     "total_deaths": 6
    //   },
    //   "3/3/2020": {
    //     "new_daily_cases": 20,
    //     "new_daily_deaths": 1,
    //     "total_cases": 73,
    //     "total_recoveries": 7,
    //     "total_deaths": 7
    //   },
    //   "3/4/2020": {
    //     "new_daily_cases": 31,
    //     "new_daily_deaths": 4,
    //     "total_cases": 104,
    //     "total_recoveries": 7,
    //     "total_deaths": 11
    //   },
    //   "3/5/2020": {
    //     "new_daily_cases": 68,
    //     "new_daily_deaths": 1,
    //     "total_cases": 172,
    //     "total_recoveries": 7,
    //     "total_deaths": 12
    //   },
    //   "3/6/2020": {
    //     "new_daily_cases": 45,
    //     "new_daily_deaths": 2,
    //     "total_cases": 217,
    //     "total_recoveries": 7,
    //     "total_deaths": 14
    //   },
    //   "3/7/2020": {
    //     "new_daily_cases": 140,
    //     "new_daily_deaths": 3,
    //     "total_cases": 357,
    //     "total_recoveries": 7,
    //     "total_deaths": 17
    //   },
    //   "3/8/2020": {
    //     "new_daily_cases": 116,
    //     "new_daily_deaths": 4,
    //     "total_cases": 473,
    //     "total_recoveries": 7,
    //     "total_deaths": 21
    //   },
    //   "3/9/2020": {
    //     "new_daily_cases": 65,
    //     "new_daily_deaths": 1,
    //     "total_cases": 538,
    //     "total_recoveries": 7,
    //     "total_deaths": 22
    //   },
    //   "3/10/2020": {
    //     "new_daily_cases": 375,
    //     "new_daily_deaths": 6,
    //     "total_cases": 913,
    //     "total_recoveries": 8,
    //     "total_deaths": 28
    //   },
    //   "3/11/2020": {
    //     "new_daily_cases": 322,
    //     "new_daily_deaths": 8,
    //     "total_cases": 1235,
    //     "total_recoveries": 8,
    //     "total_deaths": 36
    //   },
    //   "3/12/2020": {
    //     "new_daily_cases": 382,
    //     "new_daily_deaths": 4,
    //     "total_cases": 1617,
    //     "total_recoveries": 12,
    //     "total_deaths": 40
    //   },
    //   "3/13/2020": {
    //     "new_daily_cases": 516,
    //     "new_daily_deaths": 7,
    //     "total_cases": 2133,
    //     "total_recoveries": 12,
    //     "total_deaths": 47
    //   },
    //   "3/14/2020": {
    //     "new_daily_cases": 548,
    //     "new_daily_deaths": 7,
    //     "total_cases": 2681,
    //     "total_recoveries": 12,
    //     "total_deaths": 54
    //   },
    //   "3/15/2020": {
    //     "new_daily_cases": 772,
    //     "new_daily_deaths": 9,
    //     "total_cases": 3453,
    //     "total_recoveries": 12,
    //     "total_deaths": 63
    //   },
    //   "3/16/2020": {
    //     "new_daily_cases": 1132,
    //     "new_daily_deaths": 22,
    //     "total_cases": 4585,
    //     "total_recoveries": 17,
    //     "total_deaths": 85
    //   },
    //   "3/17/2020": {
    //     "new_daily_cases": 1789,
    //     "new_daily_deaths": 23,
    //     "total_cases": 6374,
    //     "total_recoveries": 17,
    //     "total_deaths": 108
    //   },
    //   "3/18/2020": {
    //     "new_daily_cases": 1362,
    //     "new_daily_deaths": 10,
    //     "total_cases": 7736,
    //     "total_recoveries": 0,
    //     "total_deaths": 118
    //   },
    //   "3/19/2020": {
    //     "new_daily_cases": 5894,
    //     "new_daily_deaths": 82,
    //     "total_cases": 13630,
    //     "total_recoveries": 0,
    //     "total_deaths": 200
    //   },
    //   "3/20/2020": {
    //     "new_daily_cases": 0,
    //     "new_daily_deaths": 0,
    //     "total_cases": 13630,
    //     "total_recoveries": 0,
    //     "total_deaths": 200
    //   },
    //   "stat": "ok"
    // }
  //]
    };
  },
  methods: {
    getData: function() {

     for(let key in this.imelineitems[0]){
      
       
      
      if(key != "stat"){
       
          this.dates.push(key)
          this.recovered.push(this.imelineitems[0][key].total_recoveries)
          this.temps.push(this.imelineitems[0][key].total_cases)
          this.deaths.push(this.imelineitems[0][key].total_deaths)
          
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
                    var label =
                      data.datasets[tooltipItem.datasetIndex].label || "";
      
                    if (label) {
                      label += ": ";
                    }
                  
                    label += Math.floor(tooltipItem.yLabel);
                    let test = `Confirmados ${Math.floor(tooltipItem.yLabel)}`
                    return "№ "+label;
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
                    
                        return "№ "+value;
                      }
                    }
                  }
                ]
              }
            }
          });

        
     
    }
    ,
    customTooltips: function(tooltip) {
			// Tooltip Element
			var tooltipEl = document.getElementById('chartjs-tooltip');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.id = 'chartjs-tooltip';
				tooltipEl.innerHTML = '<table></table>';
			this.cani.parentNode.appendChild(tooltipEl);
			}

			// Hide if no tooltip
			if (tooltip.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}

			// Set caret Position
			tooltipEl.classList.remove('above', 'below', 'no-transform');
			if (tooltip.yAlign) {
				tooltipEl.classList.add(tooltip.yAlign);
			} else {
				tooltipEl.classList.add('no-transform');
			}

			function getBody(bodyItem) {
				return bodyItem.lines;
			}

			// Set Text
			if (tooltip.body) {
				var titleLines = tooltip.title || [];
				var bodyLines = tooltip.body.map(getBody);

				var innerHtml = '<thead>';

				titleLines.forEach(function(title) {
					innerHtml += '<tr><th>' + title + '</th></tr>';
				});
				innerHtml += '</thead><tbody>';

				bodyLines.forEach(function(body, i) {
					var colors = tooltip.labelColors[i];
					var style = 'background:' + colors.backgroundColor;
					style += '; border-color:' + colors.borderColor;
					style += '; border-width: 2px';
					var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
					innerHtml += '<tr><td>' + span + body + '</td></tr>';
				});
				innerHtml += '</tbody>';

				var tableRoot = tooltipEl.querySelector('table');
				tableRoot.innerHTML = innerHtml;
			}

			var positionY = this.cani.offsetTop;
			var positionX = this.cani.offsetLeft;

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + tooltip.caretX + 'px';
			tooltipEl.style.top = positionY + tooltip.caretY + 'px';
			tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
			tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
			tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
			tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
		},
    getLiveData(){
       axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://thevirustracker.com/free-api?countryTimeline=${this.code}`
        )
        .then(res => {
          this.loading = false
          this.imelineitems = res.data.timelineitems
          this.country = res.data.countrytimelinedata[0].info.title
          setTimeout(()=>{ this.getData() }, 1);
        });
    }
  },
  created(){
    this.getLiveData()
  }
};
</script>