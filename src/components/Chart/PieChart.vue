<template>
  <div class="pie-box">
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { shallowRef } from 'vue';

export default {
  name: 'MovieChart',
  data() {
    this.chart = {
        type: "pie",
        data: {
          labels: [],
        datasets: [{
          label: 'My First Dataset',
          data: [],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 105, 86)',
            'rgb(155, 105, 386)',
            'rgb(25, 105, 46)',

          ],
          hoverOffset: 4
        }],
        options: {
          layout: {
            padding: {
              right: -150
            }
          },
          responsive: false,
      }
        }
      }
    return {
      testChart: null,
      labelData: "New value",
      dataValue: 10,
      chartInfo: {}

    }
  },
  props: {
    movies: Array
  },
  beforeUpdate() {

    const ctx = document.getElementById('pie-chart');
    //this.testChart = new Chart(ctx, this.chart);
    if(this.chart.data.labels.length === 0){
      this.movies.map((movie, index) => {
      this.chart.data.labels.push(movie.title)
      this.chart.data.datasets[0].data.push(movie.votes.length)
    })
    } else {
      this.chart.data.datasets[0].data = []
      this.movies.map((movie, index) => {
      this.chart.data.datasets[0].data.push(movie.votes.length)
    })
      this.testChart.update()
    }
    this.testChart = shallowRef(
        new Chart(ctx, this.chart)
      );
  },
  methods: {
    addData() {
      if(this.testChart.data.datasets.length > 0) {
        this.testChart.data.datasets[0].data.push(+1)
        this.testChart.data.labels.push(this.labelData);
      this.testChart.update();
    }  
},
  removeData() {
    this.chart.data.labels.pop();
    this.chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
    });
    this.chart.update();
},
destoryChart() {
  this.testChart.destroy()
}
},
}
</script>

<style scoped>
.pie-box {
  position: relative;
  width: 100%;
}
</style>