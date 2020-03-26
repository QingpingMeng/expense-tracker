<template>
  <canvas width="100%" ref="canvas" class="fill-height">hi</canvas>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import Chart from "chart.js";
import Transaction from "@/models/transaction";
import dayjs from "dayjs";
import { uniq, keyBy, times, flatten } from "lodash-es";
import Category from "@/models/category";
@Component
export default class ExpenseCategory extends Vue {
  @Getter("orderedTransactions") private localTransactions!: Transaction[];
  @State private localCategories!: Category[];
  private pieChart!: Chart;

  @Watch("localTransactions")
  onTransactionChanged(val: string, oldVal: string) {
    const data = this.datasets;
    this.pieChart.data.datasets![0].data = data.map(d => d.sum);
    this.pieChart.data.labels = data.map(d => d.name);
    this.pieChart.update();
  }

  public mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement;
    const data = this.datasets;
    const mdAndUp = this.$vuetify.breakpoint.mdAndUp;
    const colorPattern = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"];
    this.pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(d => d.name),
        datasets: [
          {
            data: data.map(d => d.sum),
            backgroundColor: flatten(times(5, n => colorPattern)),
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        aspectRatio: mdAndUp ? 2 : 1.2,
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

  private get datasets() {
    const firstDayOfMonth = dayjs().startOf("month");
    const transactionsThisMonth = this.localTransactions.filter(
      t => t.timestamp >= firstDayOfMonth.valueOf()
    );

    const categoryIds = uniq(transactionsThisMonth.map(t => t.categoryId));

    const categoryExpense = keyBy(
      categoryIds.map(id => {
        return {
          id,
          name: this.localCategories.find(c => c.id === id)!.name,
          sum: 0
        };
      }),
      "id"
    );

    transactionsThisMonth.forEach(t => {
      categoryExpense[t.categoryId].sum += t.amount;
    });

    return Object.values(categoryExpense);
  }
}
</script>
