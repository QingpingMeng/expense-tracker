<template>
  <canvas width="100%" ref="canvas" class="fill-height"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Chart from "chart.js";
import dayjs from "dayjs";
import Transaction from "@/models/transaction";
@Component
export default class ExpenseTrend extends Vue {
  @Getter("orderedTransactions") private localTransactions!: Transaction[];
  @Getter transactionDates!: string[];

  private lineChart!: Chart;
  private dayRange = this.getDaysRange();

  @Watch("localTransactions")
  onTransactionChanged(val: string, oldVal: string) {
    this.lineChart.data.datasets![0].data = this.getExpenseData();
    this.lineChart.data.labels = this.dayRange.map(d => d.format("MM/DD"));
    this.lineChart.update();
  }

  public mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement;
    const mdAndUp = this.$vuetify.breakpoint.mdAndUp;
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.dayRange.map(d => d.format("MM/DD")),
        datasets: [
          {
            label: "Daily Expense",
            data: this.getExpenseData(),
            backgroundColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 3
          }
        ]
      },
      options: {
        aspectRatio: mdAndUp ? 2 : 1.5,
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

  public updated() {
    this.lineChart.data.datasets![0].data = this.getExpenseData();
    this.lineChart.update();
  }

  private getDaysRange() {
    const now = dayjs();
    const days = [];
    for (let i = 4; i > 0; i--) {
      days.push(now.subtract(i, "day"));
    }
    days.push(now);
    for (let i = 1; i <= 4; i++) {
      days.push(now.add(i, "day"));
    }
    return days;
  }

  private getExpenseData() {
    const startTimeStamp = this.dayRange[0].valueOf();
    const endTimeStamp = this.dayRange
      .slice(-1)
      .pop()!
      .add(1, "day")
      .valueOf();
    let transactionsInRange = this.localTransactions.filter(
      t => t.timestamp < endTimeStamp && t.timestamp >= startTimeStamp
    );

    return this.dayRange.map(day => {
      if (
        !this.transactionDates.find(date => date === day.format("YYYY-MM-DD"))
      ) {
        return 0;
      } else {
        let date = day.format("YYYY-MM-DD");
        let totalAmountInDay = transactionsInRange
          .filter(t => t.dateString === date)
          .reduce((sum, currentT) => sum + currentT.amount, 0);
        return totalAmountInDay;
      }
    });
  }
}
</script>