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
        dense
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { ITransactionInput } from '@/models/transaction';
import dayjs from 'dayjs';

@Component
export default class DatePicker extends Vue {
  @State private draftTransaction!: ITransactionInput;

  private menu = false;

  get date() {
    return dayjs(this.draftTransaction.timestamp)
      .format('YYYY-MM-DD');
  }

  set date(value) {
    const date = dayjs(value);
    this.$store.commit('updateDraftTransaction', {
      ...this.draftTransaction,
      timestamp: date.valueOf(),
    });
  }
}
</script>