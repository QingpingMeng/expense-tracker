<template>
  <v-app>

    <TopToolbar></TopToolbar>
    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <BottomNav></BottomNav>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopToolbar from "./components/TopToolbar.vue";
import BottomNav from "./components/BottomNav.vue";
@Component({
  components: {
    TopToolbar,
    BottomNav
  }
})
export default class extends Vue {}
</script>