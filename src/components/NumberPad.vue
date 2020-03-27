<template>
  <v-row fluid class="fill-height">
    <v-col cols="12" style="padding:0">
      <div class="number-pad-layout">
        <v-btn height="60" @click="$emit('onDigit', 1)" tile class="digit body-1">1</v-btn>
        <v-btn @click="$emit('onDigit', 2)" tile class="digit body-1">2</v-btn>
        <v-btn @click="$emit('onDigit', 3)" tile class="digit body-1">3</v-btn>
        <v-btn @click="$emit('onDigit', 4)" tile class="digit body-1">4</v-btn>
        <v-btn @click="$emit('onDigit', 5)" tile class="digit body-1">5</v-btn>
        <v-btn @click="$emit('onDigit', 6)" tile class="digit body-1">6</v-btn>
        <v-btn @click="$emit('onDigit', 7)" tile class="digit body-1">7</v-btn>
        <v-btn @click="$emit('onDigit', 8)" tile class="digit body-1">8</v-btn>
        <v-btn @click="$emit('onDigit', 9)" tile class="digit body-1">9</v-btn>
        <v-btn @click="$emit('onDigit', 0)" tile class="digit body-1">0</v-btn>
        <v-btn @click="$emit('onClear')" tile class="operator body-1">C</v-btn>
        <v-btn @click="$emit('onBack')" tile class="operator body-1">&#9003;</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.number-pad-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 0;
}

.number-pad-layout .operator,
.number-pad-layout .digit {
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {}
</script>