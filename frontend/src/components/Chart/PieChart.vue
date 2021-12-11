<template>
  <div>
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import pieChartData from "./pieChart-data"

export default {
  name: 'PieChart',
  data() {
    return {
      pieChartData: pieChartData
    }
  },
  mounted() {
    const ctx = document.getElementById('pie-chart');
    new Chart(ctx, this.pieChartData);
  
  }
}
</script>