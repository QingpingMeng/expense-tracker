<template>
  <div class="swipe-list-item">
    <div class="swipe-list-viewport" :style="[pinnedStyle, panningStyle]">
      <div class="left fill-height" ref="left">
        <slot name="left"></slot>
      </div>
      <div class="center fill-height" ref="center">
        <slot name="center"></slot>
      </div>
      <div class="right fill-height" ref="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swipe-list-item {
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}

.swipe-list-viewport {
  z-index: 1000;
  width: 100%;
  position: relative;
  left: -33%;
  display: grid;
  grid-template-columns: 33% 100% 33%;
  align-items: stretch;
}

/* .swipe-list-item div {
  display: inline-block;
} */
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import Hammer from "hammerjs";
@Component({
  components: {}
})
export default class SwipeListItem extends Vue {
  private position = 0;
  private swipeActionWidth = 50;
  private isPanning = false;
  private panDeltaX = 0;
  private panThreshold = 40;

  public mounted() {
    let center = this.$refs.center as HTMLElement;
    let hammer = new Hammer(center);
    hammer.on("panstart", this.onPanStart);
    hammer.on("panmove", this.onPanMove);
    hammer.on("panend", this.onPanStop);
    hammer.on("pancancel", this.onPanStop);
  }

  public onPanStart(e: HammerInput) {
    this.isPanning = true;
  }

  public onPanMove(e: HammerInput) {
    this.panDeltaX = e.deltaX;
  }

  public onPanStop(e: HammerInput) {
    this.isPanning = false;

    if(Math.abs(e.deltaX) < this.panThreshold){
      return;
    }

    const direction = e.offsetDirection;
    if (direction === Hammer.DIRECTION_LEFT) {
      this.position = Math.max(this.position - 1, -1);
    }

    if (direction === Hammer.DIRECTION_RIGHT) {
      this.position = Math.min(this.position + 1, 1);
    }
  }

  get pinnedStyle() {
    if (!this.isPanning) {
      return {
        transform: `translateX(${this.position * 33}%)`,
        transition: "0.5s"
      };
    }
  }

  get panningStyle() {
    if (this.isPanning) {
      return {
        transform: `translateX(${this.panDeltaX}px)`
      };
    } 
  }
}
</script>