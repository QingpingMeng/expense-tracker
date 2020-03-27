<template>
  <v-bottom-navigation
    grow
    fixed
    height="76"
    v-model="bottomNav"
    style="z-index:1000;"
    color="primary"
  >
    <v-btn to="/home" value="/home">
      <span>Home</span>
      <v-icon medium>home</v-icon>
    </v-btn>

    <v-btn to="/chart" value="/chart">
      <span>Chart</span>
      <v-icon>pie_chart</v-icon>
    </v-btn>

    <v-btn value="settings">
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>

  </v-bottom-navigation>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component
export default class BottomNav extends Vue {
  private bottomNav: string = 'home';

  public mounted() {
    this.bottomNav = this.$route.path;
  }
}
</script>