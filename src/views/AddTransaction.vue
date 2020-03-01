<template>
  <v-container fluid class="add-transaction-layout fill-height">
    <v-toolbar class="nav-buttons" absolute color="primary" dense>
      <v-btn color="white" style="margin-left:-12px" @click="onCancel" text>
        <v-icon>mdi-arrow-left</v-icon>Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn style="margin-right:-12px" @click="onSave" color="white" text>
        <v-icon>mdi-check</v-icon>Save
      </v-btn>
    </v-toolbar>
    <v-container fluid class="num-display">
      <v-container fluid class="num-display-container elevation-2 fill-height display-1">
        <p class="currencySymbol">$</p>
        <p class="text-right fill-width">{{ draftTransaction.amount | toFixed}}</p>
      </v-container>
    </v-container>
    <div class="options">
      <v-container fluid style="padding:0">
        <v-text-field prepend-icon="mdi-pencil" label="Add notes" v-model="notes" />
        <date-picker />
      </v-container>

      <category-list
        v-bind:selectedId="this.draftTransaction.categoryId.toString()"
        @onSelect="updateCategoryId"
      />
    </div>
    <div class="num-pad fill-height">
      <number-pad @onClear="onClear" @onBack="onBack" @onDigit="onDigit" />
    </div>
  </v-container>
</template>

<style scoped>
.add-transaction-layout {
  display: grid;
  grid-row-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(2rem, auto) minmax(3rem, 1fr);
  grid-template-areas:
    "num-display"
    "options"
    "num-pad";
  padding-top: 48px;
}

.nav-buttons {
  width: 100%;
  left: 0;
}

.button-group {
  grid-area: nav-buttons;
  padding: 0;
}

.num-display-container {
  border-radius: 3px;
  display: flex;
}

.currencySymbol{
  flex: 0;
}

.num-display-container p {
  flex: 1;
  margin: 0;
}

.num-display {
  grid-area: num-display;
  padding: 0;
}

.num-pads {
  grid-area: num-pad;
}

.options {
  grid-area: options;
  padding: 0;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { ITransactionInput } from "../models/transaction";
import NumberPad from "../components/NumberPad.vue";
import CategoryList from "../components/CategoryList.vue";
import DatePicker from "../components/DatePicker.vue";
import { Decimal } from "decimal.js";

@Component({
  components: {
    NumberPad,
    CategoryList,
    DatePicker
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

  public mounted() {
    this.$store.commit("setBottomNav", false);
    this.$store.commit("setShowTopBar", false);
  }

  public beforeDestroy() {
    this.$store.commit("setBottomNav", true);
    this.$store.commit("setShowTopBar", true);
  }

  public onCancel(){
    this.$router.push('/');
  }

  public async onSave(){
    await this.$store.dispatch('addTransactionAsync', this.draftTransaction)
    this.$router.push('/');
  }

  get notes() {
    return this.draftTransaction.notes;
  }

  set notes(value) {
    this.$store.commit("updateDraftTransaction", {
      ...this.draftTransaction,
      notes: value
    });
  }

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

  public updateCategoryId(id: string) {
    this.$store.commit("updateDraftTransaction", {
      ...this.draftTransaction,
      categoryId: id
    });
  }
}
</script>