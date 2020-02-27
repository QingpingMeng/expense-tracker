<template>
  <v-app>

    <TopToolbar></TopToolbar>
    <!-- Sizes your content based upon application components -->
    <v-content fluid>

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <!-- If using vue-router -->
        <router-view class="router-view"></router-view>
      </v-container>
    </v-content>
    <BottomNav></BottomNav>

  </v-app>
</template>

<style scoped>
.router-view{
  max-width: 768px;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopToolbar from "./components/TopToolbar.vue";
import BottomNav from "./components/BottomNav.vue";
import db from './db';
@Component({
  components: {
    TopToolbar,
    BottomNav
  }
})
export default class extends Vue {
  public async mounted() {
    await db.initCategory(); 
    await this.$store.dispatch('loadCategoriesFromDb');
    await this.$store.dispatch('loadTransactionFromDb');
  }
}
</script>