<template>
  <canvas width="100%" ref="canvas" class="fill-height"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import Chart from "chart.js";
@Component
export default class ExpenseTrend extends Vue {
  private lineChart!: Chart;
  private weelyData = [0, 0, 0, 0, 0, 0, 0];

  public mounted() {
    var ctx = this.$refs.canvas as HTMLCanvasElement;
    var lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Daily Expense",
            data: this.weelyData,
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
</script>