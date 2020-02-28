<template>
  <div fluid class="category-list-layout fill-height">
    <div v-for="(item, index) in categories" :key="index">
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
  </div>
</template>

<style scoped>
.category-list-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
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
}
</script>