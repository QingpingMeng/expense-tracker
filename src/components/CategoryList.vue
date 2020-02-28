<template>
  <v-window v-model="curPage">
    <v-window-item class="category-list-layout" v-for="n in page" :key="`card-${n}`">
      <div v-for="(item, index) in currentPateCategory" :key="index">
        <v-btn
          height="48"
          v-bind:tile="selectedId == item.id"
          v-bind:text="selectedId != item.id"
          @click="$emit('onSelect', item.id)"
          class="category-block"
        >
          <div class="category-tile">
            <v-icon small>mdi-{{item.icon}}</v-icon>
            <div style="font-size:0.5rem">{{ item.name }}</div>
          </div>
        </v-btn>
      </div>
    </v-window-item>
  </v-window>
</template>

<style scoped>
.category-list-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  height: 200px;
}

.category-tile {
  display: blcok;
}

.category-block {
  padding: 3px 0 0 0 !important;
  width: 100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { State } from "vuex-class";
import Category from "../models/category";

@Component
export default class CategoryList extends Vue {
  @State("localCategories") private categories!: Array<Category>;
  @Prop(String) readonly selectedId!: string;

  private curPage = 0;
  private pageSize = 12;

  get page() {
    if (this.categories === null || this.categories === undefined) return 0;
    return Math.ceil(this.categories.length / this.pageSize);
  }

  get currentPateCategory(){
      return this.categories.slice(this.curPage*this.pageSize, (this.curPage+1) * this.pageSize)
  }
}
</script>