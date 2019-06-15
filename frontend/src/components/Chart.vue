<script>

import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  name: 'Doughnut',
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: [
            '#ed4558',
            'blue',
            '#34ed11'
          ],
          data: [40, 20, 12]
        }
      ]
    },
    {
      responsive: false,
      legend: {
            display: true,
            position: 'bottom'
      },
      layout: {
            padding:{
              left: 30,
              right: 30,
              top: 30,
              bottom: 30
            }
      }
    })
  }
}
</script>
