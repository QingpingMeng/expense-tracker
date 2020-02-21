import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Transaction, { ITransactionInput } from './models/transaction';
import db from './db';

Vue.use(Vuex);

export interface IRootState{
  localTransactions: Array<Transaction>
  isOfflineMode: boolean
}

const store: StoreOptions<IRootState> = {
  state: {
    localTransactions : new Array(),
    isOfflineMode: true,
  },
  mutations: {
    addTransaction(state, transaction: Transaction){
      state.localTransactions = [...state.localTransactions, transaction];
    },
    removeTransaction(state, id: string){
      state.localTransactions = state.localTransactions.filter(t => t.id != id)
    },
    updateTransaction(state, transaction: Transaction){
      state.localTransactions = [...state.localTransactions.filter(t => t.id != transaction.id), transaction];
    }
  },
  actions: {
    async addTransactionAsync(context, transactionInput: ITransactionInput){
      let transaction = new Transaction(transactionInput);
      await db.transactions.add(transaction);
      context.commit('addTransaction', transaction);
    },
    async removeTransactionAsync(context, id){
      await db.transactions.delete(id);
      context.commit('removeTransaction', id);
    },
    async updateTransactionAsync(context, transactionInput: ITransactionInput){
      let transaction = new Transaction(transactionInput);
      await db.transactions.update(transaction.id, transaction);
    }
  },
}

export default new Vuex.Store(store);
