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

  public mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement;
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.dayRange.map(d => d.format("MM/DD")),
        datasets: [
          {
            label: "Daily Expense",
            data: this.getExpenseData(),
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