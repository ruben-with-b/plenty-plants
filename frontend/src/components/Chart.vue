<script>

import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-labels';
import 'chartjs-plugin-doughnutlabel';

import axios from "axios"
import Console from "console"
import {router} from "../main.js"

export default {
  extends: Doughnut,
  name: 'Doughnut',
  props: ['data', 'options'],
  data() {
      return {
          projects: new Array,
          ringDataSet: new Array,
          ringDataList: new Array,
          calenderIcons: [
              {src: require('@/assets/tomate.png'), width: 0, height: 0},
              {src: require('@/assets/tomate.png'), width: 20, height: 20}
          ],
          currentDay: this.getDay(),
          currentMonth: this.getMonth(),
          datasets: []
      }
    },
    async mounted () {
      const vm = this;

      await axios.get("/api/v1/user/my-plants", {})
          .then((response) => {
              vm.projects = response.data;
          })
          .catch((errors) => {
              Console.log("Cannot log in. Error: " + errors.message);
          });

      for (let index = 0; index < vm.projects.length; index++) {
          let plantPeriods = [];

        await axios.get("/api/v1/plant/" + vm.projects[index] + "/sowPeriod", {})
            .then((response) => {
                plantPeriods.push(response.data.firstMonth);
                return axios.get("/api/v1/plant/" + vm.projects[index] + "/plantPeriod", {});
            }).then((response) => {
                plantPeriods.push(response.data.firstMonth);
                return axios.get("/api/v1/plant/" + vm.projects[index] + "/harvestPeriod", {});
            }).then((response) => {
                plantPeriods.push(response.data.firstMonth);
                return axios.get("/api/v1/plant/" + vm.projects[index] + "/harvestPeriod", {});
            }).then((response) => {
                plantPeriods.push(response.data.lastMonth); //
            }).then(() => {
                
                this.datasets[index] = {
                  label: vm.projects[index],
                  backgroundColor: [
                    '#f1f1f1',
                    '#9fd6b7',
                    '#a8cacb',
                    '#f9b797',
                    '#f1f1f1'
                  ],
                  borderWidth: 1,
                  data: [
                    plantPeriods[0] - 1,
                    plantPeriods[1] - plantPeriods[0],
                    plantPeriods[2] - plantPeriods[1],
                    (plantPeriods[3] - plantPeriods[2]) + 1,
                    12 - plantPeriods[3]
                  ]
                }

            }).catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });
      }

    this.addPlugin({
      id: 'myPlugin',
      afterUpdate (chart) {
        let a=chart.config.data.datasets.length -1;
        for (let i in chart.config.data.datasets) {
          for(let j = chart.config.data.datasets[i].data.length - 1; j>= 0;--j) { 
            if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
              continue;
              let arc = chart.getDatasetMeta(i).data[j];
              arc.round = {
                x: (chart.chartArea.left + chart.chartArea.right) / 2,
                y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                radius: chart.innerRadius + chart.radiusLength / 2 + (a * chart.radiusLength),
                thickness: chart.radiusLength / 2 - 1,
                backgroundColor: arc._model.backgroundColor
              }
          }
          a--;
        }
      },
      afterDraw (chart) {
        let ctx = chart.chart.ctx;
        for (let i in chart.config.data.datasets) {
          for(let j = chart.config.data.datasets[i].data.length - 1; j>= 0;--j) { 
            if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
              continue;
              let arc = chart.getDatasetMeta(i).data[j];
              let startAngle = Math.PI / 2 - arc._view.startAngle;
              let endAngle = Math.PI / 2 - arc._view.endAngle;

              ctx.save();
              ctx.translate(arc.round.x, arc.round.y);
              ctx.fillStyle = arc.round.backgroundColor;
              ctx.beginPath();
              ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
              ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            }
        }
      },
      beforeDraw() {
        let ctx = document.getElementById('doughnut-chart').getContext('2d');
        
        let xOffset = ctx.canvas.clientWidth;
        let yOffset = ctx.canvas.clientHeight;
        // Month indicators
        ctx.fillStyle = '#cfcfcf'
        ctx.font = '14px Karla';
        ctx.fillText('Jan', xOffset - xOffset/2.5, yOffset - yOffset/1.02 );
        ctx.fillText('Feb', xOffset - xOffset/8, yOffset - yOffset/1.2 );
        ctx.fillText('Mär', xOffset - xOffset/30, yOffset - yOffset/1.5 );
        ctx.fillText('Apr', xOffset - xOffset/30, yOffset - yOffset/2.2 );
        ctx.fillText('Mai', xOffset - xOffset/8, yOffset - yOffset/3.8 );
        ctx.fillText('Aug', xOffset - xOffset/1.16, yOffset - yOffset/3.8 );
        ctx.fillText('Sep', xOffset - xOffset/1.05, yOffset - yOffset/2.2 );
        ctx.fillText('Okt', xOffset - xOffset/1.05, yOffset - yOffset/1.5 );
        ctx.fillText('Nov', xOffset - xOffset/1.16, yOffset - yOffset/1.2 );
        ctx.fillText('Dez', xOffset - xOffset/1.5, yOffset - yOffset/1.02 );
      }
    });

    
    this.renderChart({
      labels: ['Aussaat', 'Umpflanzen', 'Ernte'],
      datasets: this.datasets
    },
    {
      tooltips: {
        enabled: false,
        custom: function() {
                  router.push({ path: '/project?plant=Tomate' }); // ?plant=Rucola
                }
      },
      events: ['click'],
      scales: {
        xAxes: [{
          id: 'first-x-axis',
          type: 'category',
          position: 'top',
          display: false,
          gridLines: {
            display : false
          },
        }]    
      },
      cutoutPercentage: 60,
      rotation: -0.5 * Math.PI,
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom',
        onClick: null,
        labels: {
          boxWidth: 15,
          fontStyle: 'bold',
          fontSize: 14,
          fontFamily: "'Karla', 'Helvetica', 'Arial', sans-serif",
          padding: 20
        }
      },
      layout: {
        padding:{
          left: 30,
          right: 30,
          top: 30,
          bottom: 30
        }
      },
      plugins: {
        labels: [
          {
            render: 'image',
            images: vm.calenderIcons,
          }
        ],
        doughnutlabel: {
          labels: [
            {
              text: this.currentDay,
              font: {
                size: '50',
                family: 'Karla',
                weight: 700
              },
              color: 'grey'
            },
            {
              text: this.currentMonth,
              font: {
                size: '20',
                family: 'Karla',
                weight: 700
              },
              color: 'grey'
            }
          ]
        }
      }
    })
  },
  methods: {
    getDay () {
      let date = new Date();
      let day = date.getDate();
      return day;
    },
    getMonth () {
      let date = new Date();
      let monthList = new Array();
      monthList[0] = "Januar";
      monthList[1] = "Februar";
      monthList[2] = "März";
      monthList[3] = "April";
      monthList[4] = "Mai";
      monthList[5] = "Juni";
      monthList[6] = "Juli";
      monthList[7] = "August";
      monthList[8] = "September";
      monthList[9] = "Oktober";
      monthList[10] = "November";
      monthList[11] = "Dezember";
      let month = monthList[date.getMonth()];

      return month.toUpperCase();
    }
  }
}
</script>
