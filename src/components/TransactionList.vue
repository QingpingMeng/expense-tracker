<template>
  <v-list subheader>
    <div v-for="date in transactionDates" :key="date">
      <v-subheader>{{ date }}</v-subheader>
      <template v-for="t in transactionsInDate(date)">
        <swipe-list-item :key="t.id">
          <template v-slot:left>
            <div style="background-color:red;width:100%">Left</div>
          </template>
          <template v-slot:center>
            <transaction-list-item :transaction="t" :key="t.id"></transaction-list-item>
          </template>

          <template v-slot:right>
            <div style="background-color:blue;width:100%">right</div>
          </template>
        </swipe-list-item>
      </template>
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Transaction from "../models/transaction";
import TransactionListItem from "../components/TransactionListItem.vue";
import SwipeListItem from "../components/SwipeList/SwipeListItem.vue";
import dayjs from "dayjs";

@Component({
  components: {
    TransactionListItem,
    SwipeListItem
  }
})
export default class TransactionList extends Vue {
  @State private localTransactions!: Transaction[];
  @Getter transactionDates!: string[];

  public transactionsInDate(date: string) {
    return this.localTransactions.filter(t => t.dateString === date);
  }
}
</script>