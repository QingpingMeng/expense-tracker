<template>
  <v-list subheader>
    <div v-show="localTransactions.length > 0" v-for="date in transactionDates" :key="date">
      <v-subheader style="padding:0">{{ date }}</v-subheader>
      <template v-for="t in transactionsInDate(date)">
        <swipe-actions :key="t.id">
          <template v-slot:left>
            <v-btn class="ma-2" tile x-large color="primary">
              <v-icon>mdi-file-document-edit</v-icon>
            </v-btn>
          </template>
          <template v-slot:center>
            <transaction-list-item :transaction="t" :key="t.id"></transaction-list-item>
          </template>

          <template v-slot:right>
            <div>
             <v-btn @click="deleteTransaction(t.id)" class="ma-2" tile x-large color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </div>
          </template>
        </swipe-actions>
      </template>
    </div>
    <div v-show="localTransactions.length <= 0">
      No
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Transaction from "../models/transaction";
import TransactionListItem from "../components/TransactionListItem.vue";
import SwipeActions from "../components/SwipeList/SwipeActions.vue";
import dayjs from "dayjs";

@Component({
  components: {
    TransactionListItem,
    SwipeActions
  }
})
export default class TransactionList extends Vue {
  @Getter('orderedTransactions') private localTransactions!: Transaction[];
  @Getter transactionDates!: string[];

  public transactionsInDate(date: string) {
    return this.localTransactions.filter(t => t.dateString === date);
  }

  public async deleteTransaction(id: string){
    await this.$store.dispatch('removeTransactionAsync', id);
  }
}
</script>