<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { ITransactionInput } from "@/models/transaction";

@Component
export default class DatePicker extends Vue {
  @State private draftTransaction!: ITransactionInput;

  private menu = false;

  get date() {
    return new Date(this.draftTransaction.timestamp)
      .toISOString()
      .substring(0, 10);
  }

  set date(value) {
    let date = new Date(value);
    this.$store.commit("updateDraftTransaction", {
      ...this.draftTransaction,
      timestamp: date.valueOf()
    });
  }
}
</script>