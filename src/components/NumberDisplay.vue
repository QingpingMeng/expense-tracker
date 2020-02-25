<template>
  <v-container fluid class="fill-height">
      <label>{{ amount }}</label>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NumberDisplay extends Vue{
    private amount = 0;
}
</script>