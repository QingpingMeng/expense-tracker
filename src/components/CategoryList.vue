<template>
  <v-container fluid class="category-list-layout fill-height">
    <div v-for="(item, index) in categories" :key="index">
      <v-btn height="48" text class="category-block">
        <div class="category-tile">
          <v-icon small>mdi-{{item.icon}}</v-icon>
          <div class="overline">{{ item.name }}</div>
        </div>
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.category-list-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.category-tile{
    display: blcok;
}

.category-block{
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
}
</script>