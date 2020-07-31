<template>
  <svg @click.stop="letterClicked" class="letter-box" viewBox="0 0 120 103.92304845413263">
    <polygon
      class="cell-fill"
      points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
      stroke="white"
      stroke-width="7.5"
    />
    <transition :duration="500" name="fade">
      <text class="cell-letter" x="50%" y="50%" dy="10.75%">{{ letter }}</text>
    </transition>
  </svg>
</template>

<script>
export default {
  name: "LetterBox",
  props: ["letter"],
  methods: {
    letterClicked: function () {
      this.$emit("letter-clicked", this.letter);
    },
  },
};
</script>

<style>
.letter-box {
  position: absolute;
  top: calc(100% / 3);
  left: 30%;
  width: 40%;
  height: calc(100% / 3);
  fill: #ccc;
}

.letter-box:hover {
  cursor: pointer;
}

.cell-fill:hover {
  width: 38%;
  transition: width 0.2s ease-out;
}

.cell-letter {
  fill: #000;
  font-weight: 700;
  font-size: 24px;
  text-anchor: middle;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
}

.letter-box:nth-child(1) {
  transform: translate(0, 0);
}

.letter-box:nth-child(2) {
  transform: translate(-75%, -50%);
}

.letter-box:nth-child(3) {
  transform: translate(0, -100%);
}

.letter-box:nth-child(4) {
  transform: translate(75%, -50%);
}

.letter-box:nth-child(5) {
  transform: translate(75%, 50%);
}

.letter-box:nth-child(6) {
  transform: translate(0, 100%);
}

.letter-box:nth-child(7) {
  transform: translate(-75%, 50%);
}

.center-tile {
  fill: #85b3ff;
}
</style>
