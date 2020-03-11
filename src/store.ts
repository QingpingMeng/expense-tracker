import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Transaction, { ITransactionInput } from './models/transaction';
import db from './db';
import Category from './models/category';
import dayjs from 'dayjs'
import { uniq, orderBy } from 'lodash-es';

Vue.use(Vuex);

export interface IRootState {
  localTransactions: Array<Transaction>
  isOfflineMode: boolean
  draftTransaction: ITransactionInput,
  localCategories: Array<Category>,
  showBottomNav: boolean,
  showTopBar: boolean,
}

const store: StoreOptions<IRootState> = {
  state: {
    localTransactions: new Array(),
    localCategories: new Array(),
    isOfflineMode: true,
    draftTransaction: {
      amount: 0,
      timestamp: Date.now(),
      categoryId: "",
      notes: ""
    },
    showBottomNav: true,
    showTopBar: true,
  },
  getters: {
    transactionDates: state => {
      return orderBy(uniq(state.localTransactions.map(t => {
        return t.dateString
      })), String, "desc")
    },
    orderedTransactions: state => {
      return orderBy(state.localTransactions, ['timestamp'], ["desc"])
    }
  },
  mutations: {
    setTransactions(state, transactions: Transaction[]) {
      state.localTransactions = transactions;
    },
    addTransaction(state, transaction: Transaction) {
      state.localTransactions = [...state.localTransactions, transaction];
    },
    removeTransaction(state, id: string) {
      state.localTransactions = state.localTransactions.filter(t => t.id != id)
    },
    updateTransaction(state, transaction: Transaction) {
      state.localTransactions = [...state.localTransactions.filter(t => t.id != transaction.id), transaction];
    },
    updateDraftTransaction(state, transactionInput: ITransactionInput) {
      state.draftTransaction = { ...transactionInput }
    },
    resetDraftTransaction(state) {
      state.draftTransaction = {
        amount: 0,
        timestamp: Date.now(),
        categoryId: "",
        notes: ""
      }
    },
    setCategories(state, categories: Category[]) {
      state.localCategories = categories;
    },
    setBottomNav(state, value: boolean) {
      state.showBottomNav = value;
    },
    setShowTopBar(state, value: boolean) {
      state.showTopBar = value;
    }
  },
  actions: {
    async addTransactionAsync(context, transactionInput: ITransactionInput) {
      let transaction = new Transaction(transactionInput);
      await db.transactions.add(transaction);
      context.commit('addTransaction', transaction);
    },
    async loadTransactionFromDb(context) {
      context.commit('setTransactions', []);
      let transactionsFromDb = await db.transactions.toArray()
      transactionsFromDb = transactionsFromDb.map(t => Transaction.fromJson(t));
      context.commit('setTransactions', [...transactionsFromDb]);
    },
    async loadCategoriesFromDb(context) {
      context.commit('setCategories', []);
      const categoriesFromDb = await db.categories.toArray();
      context.commit('setCategories', [...categoriesFromDb]);
    },
    async removeTransactionAsync(context, id) {
      await db.transactions.delete(id);
      context.commit('removeTransaction', id);
    },
    async updateTransactionAsync(context, transactionInput: ITransactionInput) {
      let transaction = new Transaction(transactionInput);
      await db.transactions.update(transaction.id, transaction);
    }
  },
}

export default new Vuex.Store(store);
