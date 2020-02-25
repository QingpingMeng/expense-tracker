<template>
  <v-container fluid class="add-transaction-layout fill-height">
    <v-container outline class="num-display">
      <v-container class="expression-container elevation-4 fill-height display-1">
        <p class="text-right fill-width">{{ this.draftTransaction.amount | toFixed}}</p>
      </v-container>
    </v-container>
    <div class="options">
      <category-list />
    </div>
    <div class="num-pad fill-height">
      <number-pad @onClear="onClear" @onBack="onBack" @onDigit="onDigit" />
    </div>
  </v-container>
</template>

<style scoped>
.add-transaction-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(2rem, 10%) minmax(3rem, 20%) 1fr;
  grid-template-areas:
    "num-display"
    "options"
    "num-pad";
}

.expression-container {
  border-radius: 3px;
}

.expression-container p {
  flex: 1;
  margin: 0;
}

.num-display {
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
import CategoryList from "../components/CategoryList.vue";
import { Decimal } from "decimal.js";

@Component({
  components: {
    NumberPad,
    CategoryList
  },
  filters: {
    toFixed: function(value: string) {
      return parseFloat(value).toFixed(2);
    }
  }
})
export default class AddTransaction extends Vue {
  @State private draftTransaction!: ITransactionInput;
  @Mutation private updateDraftTransaction!: (
    transactionInput: ITransactionInput
  ) => void;

  private updateAmount(amount: number) {
    this.$store.commit("updateDraftTransaction", {
      ...this.draftTransaction,
      amount
    });
  }

  public onClear() {
    this.updateAmount(0);
  }

  public onDigit(digit: number) {
    let currentValue = new Decimal(this.draftTransaction.amount);
    currentValue = currentValue.mul(10).add(new Decimal(digit).mul(0.01));
    this.updateAmount(currentValue.toNumber());
  }

  public onBack() {
    let currentValue = new Decimal(this.draftTransaction.amount);
    currentValue = currentValue
      .mul(100)
      .floor()
      .dividedBy(10)
      .floor()
      .dividedBy(100);
    this.updateAmount(currentValue.toNumber());
  }
}
</script>