<template>
    <v-container class="number-pad-layout fill-height">
        <v-btn tile class="operator display-1">=</v-btn>
        <v-btn tile class="digit display-1">1</v-btn>
        <v-btn tile class="digit display-1">2</v-btn>
        <v-btn tile class="digit display-1">3</v-btn>
        <v-btn tile class="operator display-1">*</v-btn>
        <v-btn tile class="digit display-1">4</v-btn>
        <v-btn tile class="digit display-1">5</v-btn>
        <v-btn tile class="digit display-1">6</v-btn>
        <v-btn tile class="operator display-1">-</v-btn>
        <v-btn tile class="digit display-1">7</v-btn>
        <v-btn tile class="digit display-1">8</v-btn>
        <v-btn tile class="digit display-1">9</v-btn>
        <v-btn tile class="operator display-1">+</v-btn>
        <v-btn tile class="digit display-1">00</v-btn>
        <v-btn tile class="digit display-1">0</v-btn>
        <v-btn tile class="operator display-1">&#9003;</v-btn>
    </v-container>
</template>

<style scoped>
.number-pad-layout{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
}

button{
    height: 100%
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue{
    private amount = 0;

    private onAmountChanged(digit: string){
    }
}
</script>