<template>
  <v-container fluid>
    <v-list subheader>
      <div v-for="date in transactionDates" :key="date">
        <v-subheader>{{ date }}</v-subheader>
        <v-list-item v-for="t in transactionsInDate(date)" :key="t.id">
             <v-list-item-avatar>
      <v-icon v-text="food"></v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="t.notes"></v-list-item-title>
      <v-list-item-subtitle v-text="t.dateString"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
        </v-list-item>
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Transaction from "../models/transaction";
import TransactionListItem from '../components/TransactionListItem.vue'
import dayjs from "dayjs";

@Component({
  components: {
      TransactionListItem
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