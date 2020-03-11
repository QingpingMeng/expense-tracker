<template>
<v-container>
  <v-row>
    <v-col cols="12" style="padding-top:0">
      <transaction-list></transaction-list>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Transaction from "../models/transaction";
import TransactionList from "../components/TransactionList.vue";

@Component({
  components: {
    TransactionList
  }
})
export default class Home extends Vue {}
</script>