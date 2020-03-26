<template>
  <v-container fluid class="chart-layout">
    <v-row class="trend-row">
      <v-col cols="12" style="padding-top:0">
        <expense-trend></expense-trend>
      </v-col>
    </v-row>
    <v-row class="category-row">
      <v-col cols="12" style="padding-top:0">
        <expense-category></expense-category>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.chart-layout{
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
}

.trend-row{
  flex:1;
}

.category-row{
  flex:1;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import ExpenseTrend from "../components/Charts/ExpenseTrend.vue";
import ExpenseCategory from "../components/Charts/ExpenseCategory.vue";
@Component({
  components: {
    ExpenseTrend,
    ExpenseCategory
  }
})
export default class ViewChart extends Vue {}
</script>