<template>
<v-container class="home-layout">
  <v-row>
    <v-col cols="12" style="padding-top:0">
      <transaction-list></transaction-list>
    </v-col>
  </v-row>
</v-container>
</template>

<style scoped>
.home-layout{
  overflow-y: auto;
  max-height: calc(100vh - 140px);
  padding-top:0;
  margin-top: -20px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import Transaction from '../models/transaction';
import TransactionList from '../components/TransactionList.vue';

@Component({
  components: {
    TransactionList,
  },
})
export default class Home extends Vue {}
</script>