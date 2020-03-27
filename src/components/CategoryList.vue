<template>
  <v-row fluid :style="{ height: categoryListHeight}">
    <v-col cols="12" style="padding:0">
      <v-window
        v-model="curPage"
        :show-arrows="showArrowsOnHover"
        :show-arrows-on-hover="showArrowsOnHover"
        :style="windowInlineStyle"
      >
        <v-window-item class="category-list-layout" v-for="n in page" :key="`card-${n}`">
          <div v-for="(item, index) in currentPateCategory" :key="index">
            <v-btn
              :height="categoryTileHeight"
              v-bind:tile="isSelected(item)"
              v-bind:text="!isSelected(item)"
              @click="$emit('onSelect', item.id)"
              :color="isSelected(item)? 'primary': 'default'"
              class="category-block"
            >
              <div class="category-tile">
                <v-icon small>mdi-{{item.icon}}</v-icon>
                <div style="font-size:0.6rem">{{ item.name }}</div>
              </div>
            </v-btn>
          </div>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-spacer />
        <v-item-group v-model="curPage" class="text-center" mandatory>
          <v-item v-for="n in page" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon small>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-spacer />
      </v-card-actions>
    </v-col>
  </v-row>
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
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Category from '../models/category';

@Component
export default class CategoryList extends Vue {

  get maxRowCount(): number {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return 3;
      case 'sm':
        return 3;
      case 'md':
        return 4;
      case 'lg':
        return 6;
      case 'xl':
        return 6;
      default:
        return 6;
    }
  }

  get showArrowsOnHover(): boolean {
    return this.$vuetify.breakpoint.mdAndUp;
  }

  get maxColumnCount(): number {
    return Math.floor(this.$vuetify.breakpoint.width / 80);
  }

  get pageSize(): number {
    return this.maxRowCount * this.maxColumnCount;
  }

  get categoryListHeight(): number {
    return this.maxRowCount * this.categoryTileHeight;
  }

  get page() {
    if (!this.categories) { return 0; }
    return Math.ceil(this.categories.length / this.pageSize);
  }

  get currentPateCategory() {
    return this.categories.slice(
      this.curPage * this.pageSize,
      (this.curPage + 1) * this.pageSize,
    );
  }
  @Prop(String) public readonly selectedId!: string;
  @State('localCategories') private categories!: Category[];

  private curPage = 0;

  private categoryTileHeight = 64;

  private windowInlineStyle = {
    height: `${this.categoryListHeight}px`,
  };

  public isSelected(item: Category): boolean {
    return this.selectedId === item.id;
  }
}
</script>