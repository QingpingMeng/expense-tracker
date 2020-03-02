<template>

    <v-list-item-avatar>
      <v-icon v-text="transaction.icon"></v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="transaction.title"></v-list-item-title>
      <v-list-item-subtitle v-text="transaction.dateString"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Transaction from "../models/transaction";
import dayjs from "dayjs";
@Component({
  components: {}
})
export default class extends Vue {
  @Prop(Transaction) private transaction!: Transaction;
}
</script>