<template>
  <v-container>
    <v-row>
      <div class="transaction-list-view-item-layout">
          <div>
            <v-icon medium color="primary">mdi-{{ categoryInfo.icon }}</v-icon>
          </div>
          <div class="transation-detail">
            <div class="body1">{{ transaction.notes || categoryInfo.name }}</div>
            <div class="caption">{{ transaction.dateString }}</div>
          </div>
          <div>
            ${{ transaction.amount | toFixed }}
          </div>
      </div>
    </v-row>
  </v-container>
</template>

<style scoped>
.transaction-list-view-item-layout{
  display: grid;
  width: 100%;
  grid-template-columns: minmax(50px, auto) 1fr minmax(40px, auto);
}

.transaction-list-view-item-layout > div{
  align-self: center;
}

.transation-detail{
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import Transaction from '../models/transaction';
import toFixedAmount from '../filters/toFixedAmount';
import dayjs from 'dayjs';
import Category from '../models/category';
@Component({
  components: {},
  filters: {
    toFixed: toFixedAmount,
  },
})
export default class extends Vue {
  @Prop(Transaction) private transaction!: Transaction;
  @State private localCategories!: Category[];

  private categoryInfo: Category = new Category('loading', 'refresh');

  public mounted() {
    this.categoryInfo = this.localCategories.find((c) => c.id === this.transaction.categoryId)!;
  }
}
</script>