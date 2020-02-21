<template>
  <v-container fluid class="add-transaction-layout fill-height">
    <div class="num-display">1</div>
    <div class="options">1</div>
    <div class="num-pad fill-height">
      <number-pad />
    </div>
  </v-container>
</template>

<style scoped>
.add-transaction-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(3rem, 20%) minmax(3rem, 20%) 1fr;
  grid-template-areas:
    "num-display"
    "options"
    "num-pad";
}

.num-Display {
  grid-area: num-display;
}

.num-pads {
  grid-area: num-pad;
}

.options {
  grid-area: options;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { ITransactionInput } from "../models/transaction";
import NumberPad from "../components/NumberPad.vue";

@Component({
  components: {
    NumberPad,
  }
})
export default class AddTransaction extends Vue {
  @State private draftTransaction!: ITransactionInput;
  @Mutation private updateDraftTransaction!: (
    transactionInput: ITransactionInput
  ) => void;

  private enterAmount(event: Event) {
    this.$store.commit("updateDraftTransaction", {
      ...this.draftTransaction,
      amount: 10
    });
  }
}
</script>