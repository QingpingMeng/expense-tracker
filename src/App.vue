<template>
  <v-app>
    <TopToolbar v-if="showTopBar"></TopToolbar>
    <!-- Sizes your content based upon application components -->
    <v-content fluid>

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height overflow-hidden">
        <!-- If using vue-router -->
        <router-view class="router-view"></router-view>
      </v-container>
    </v-content>
    <BottomNav v-if="showBottomNav"></BottomNav>
  </v-app>
</template>

<style scoped>
.router-view{
  max-width: 768px;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopToolbar from './components/TopToolbar.vue';
import BottomNav from './components/BottomNav.vue';
import db from './db';
import { State } from 'vuex-class';
@Component({
  components: {
    TopToolbar,
    BottomNav,
  },
})
export default class extends Vue {
  @State private showBottomNav!: boolean;
  @State private showTopBar!: boolean;

  public async mounted() {
    await db.initCategory();
    await this.$store.dispatch('loadCategoriesFromDb');
    await this.$store.dispatch('loadTransactionFromDb');
  }
}
</script>