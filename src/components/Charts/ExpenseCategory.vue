<template>
  <canvas width="100%" ref="canvas" class="fill-height">hi</canvas>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import Chart from "chart.js";
import Transaction from "@/models/transaction";
import dayjs from "dayjs";
import { uniq, keyBy } from "lodash-es";
import Category from "@/models/category";
@Component
export default class ExpenseCategory extends Vue {
  @Getter("orderedTransactions") private localTransactions!: Transaction[];
  @State private localCategories!: Category[];
  private pieChart!: Chart;

  public mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement;
    const data = this.getData();
    this.pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(d => d.name),
        datasets: [
          {
            label: "# of Votes",
            data: data.map(d => d.sum),
            borderWidth: 1
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

  private getData() {
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
