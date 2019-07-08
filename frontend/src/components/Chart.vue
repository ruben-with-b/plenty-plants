<script>

import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-labels';
import 'chartjs-plugin-doughnutlabel';

import axios from "axios"
import Console from "console"

export default {
  extends: Doughnut,
  name: 'Doughnut',
  props: ['data', 'options'],
  data() {
    return {
      plants: null,
      sowPeriod: null,
      calenderIcons: [
              { src: require('@/assets/tomato.png'), width: 20, height: 20 }
            ],
      currentDay: this.getDay(),
      currentMonth: this.getMonth()
    }
  },
  mounted () {
    const vm = this;
    axios.get("/api/v1/user/my-plants", {})
    .then((response) => {
        vm.plants = response.data;
        Console.log(vm.plants);

        axios.get("/api/v1/plant/Tomate/sowPeriod", {})
            .then((response) => {
                vm.sowPeriod = response.data
                Console.log(vm.sowPeriod);
                
            })
            .catch((errors) => {
                Console.log("Cannot log in. Error: " + errors.message);
            });
    })
    .catch((errors) => {
        Console.log("Cannot log in. Error: " + errors.message);
    });

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
        ctx.fillText('Apr', xOffset - xOffset/30, yOffset - yOffset/2.2 );          ctx.fillText('Mai', xOffset - xOffset/8, yOffset - yOffset/3.8 );
        ctx.fillText('Aug', xOffset - xOffset/1.16, yOffset - yOffset/3.8 );
        ctx.fillText('Sep', xOffset - xOffset/1.05, yOffset - yOffset/2.2 );
        ctx.fillText('Okt', xOffset - xOffset/1.05, yOffset - yOffset/1.5 );
        ctx.fillText('Nov', xOffset - xOffset/1.16, yOffset - yOffset/1.2 );
        ctx.fillText('Dez', xOffset - xOffset/1.5, yOffset - yOffset/1.02 );
      }
    });

    
    this.renderChart({
      labels: ['Aussaat', 'Umpflanzen', 'Ernte'],
      datasets: [
        {
          label: 'tomato',
          backgroundColor: [
            '#efcd58',
            '#28be98',
            '#7c8f9c',
            '#e6e6e6'
          ],
          borderWidth: 0,
          data: [5,4,1,2]
        },
        {
          label: 'salad',
          backgroundColor: [
            '#efcd58',
            '#28be98',
            '#7c8f9c',
            '#e6e6e6'
          ],
          borderWidth: 0,
          data: [1,3,5,3]
        }
      ]
    },
    {
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
      rotation: 1.5 * Math.PI,
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
