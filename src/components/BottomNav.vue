<template>
  <v-bottom-navigation
    grow
    fixed
    height="76"
    v-model="bottomNav"
    color="primary"
  >
    <v-btn value="home">
      <span>Home</span>
      <v-icon medium>home</v-icon>
    </v-btn>

    <v-btn value="code">
      <span>Chart</span>
      <v-icon>pie_chart</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Sync</span>
      <v-icon>sync</v-icon>
    </v-btn>

  </v-bottom-navigation>

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class';
@Component
export default class BottomNav extends Vue {
  private bottomNav: string = 'home';
}
</script>