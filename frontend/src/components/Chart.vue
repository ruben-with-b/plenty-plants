<script>

import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-labels';

import axios from "axios"
import Console from "console"

export default {
  extends: Doughnut,
  name: 'Doughnut',
  props: ['data', 'options'],
  data() {
    return {
      plants: null,
      sowPeriod: null
    }
  },
  mounted () {
    // const vm = this;

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
          data: [4,3,1,2]
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
          data: [1,2,4,3]
        }
      ]
    },
    {
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
            images: [
              { src:  require('@/assets/tomato.png'), width: 20, height: 20 },
              { src: require('@/assets/salad.png'), width: 20, height: 20 },
            ],
            
          }
        ]
      }
    })
    
    
    // this.chart.data.datasets[0].label


  }
}
</script>
