<template>
  <div class="swipe-list-item">
    <div class="swipe-list-viewport" :style="[swipeStyle]">
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

.swipe-list-viewport{
  z-index: 1000;
  width: 100%;
  position: relative;
  left: -33%;
}

.swipe-list-item div {
  display: inline-block;
}

.center {
  width: 100%;
}

.left {
  width: 33%;
}

.right {
  width: 33%;
}
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

  public swipeLeft() {
    this.position = Math.max(this.position - 1, -1);
  }

  public swipeRight() {
    this.position = Math.min(this.position + 1, 1);
  }

  public mounted() {
    let center = this.$refs.center as HTMLElement;
    let hammer = new Hammer(center);
    hammer.on("swipe", this.swipeHandler);

    // this.swipeActionWidth = this.$refs.left
  }

  public swipeHandler(e: HammerInput) {
    // if (Math.abs(e.deltaX) < 40) {
    //   return;
    // }

    const direction = e.offsetDirection;

    if (direction === Hammer.DIRECTION_LEFT) {
      this.position = Math.max(this.position - 1, -1);
    }

    if (direction === Hammer.DIRECTION_RIGHT) {
      this.position = Math.min(this.position + 1, 1);
    }
  }

  get swipeStyle() {
    return {
      transform: `translateX(${this.position * 33}%)`,
      transition: "0.5s"
    };
  }
}
</script>