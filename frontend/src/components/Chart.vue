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
              { src: require('@/assets/tomato.png'), width: 20, height: 20 },
              { src: require('@/assets/salad.png'), width: 20, height: 20 }
            ]
    }
  },
  mounted () {
    const vm = this;
    axios.get("/api/v1/user/my-plants", {})
    .then((response) => {
        this.plants = response.data;
        Console.log(this.plants);

        axios.get("/api/v1/plant/tomato/sowPeriod", {})
            .then((response) => {
                this.sowPeriod = response.data
                Console.log(this.sowPeriod);
                
            })
            .catch((errors) => {
                Console.log("Cannot log in. Error: " + errors.message);
            });
    })
    .catch((errors) => {
        Console.log("Cannot log in. Error: " + errors.message);
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
      animation: {
      duration: 1,
      onComplete: function() {
        
        let ctx = document.getElementById('doughnut-chart').getContext('2d');
        let controller = this.chart.controller;
        let xAxis = controller.scales['first-x-axis'];

        xAxis.ticks.forEach(function() {
          let xOffset = ctx.canvas.clientWidth;
          let yOffset = ctx.canvas.clientHeight;
          ctx.fillStyle = ''
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
        });

      }
    },
      scales: {
            xAxes: [{
                id: 'first-x-axis',
                type: 'category',
                position: 'top',
                display: false,
                gridLines: {
                    display : false
                }
              }]
            
        },
      cutoutPercentage: 60,
      rotation: 2 * Math.PI,
      responsive: false,
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
              text: '22',
              font: {
                size: '50',
                family: 'Karla',
                weight: 700
              },
              color: 'grey'
            },
            {
              text: '08',
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
    
    // this.chart.data.datasets[0].label


  }
}
</script>
