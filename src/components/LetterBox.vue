<template>
  <svg
    @touchstart.prevent="letterTapped"
    @touchend.prevent="letterUntapped"
    @mousedown="letterClicked"
    @mouseup="letterUnclicked"
    @animationend="resetAnimation"
    class="letter-box"
    v-bind:class="{ diffanimate: animated }"
    viewBox="0 0 120 103.92304845413263"
  >
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
  data: function () {
    return {
      animated: false,
    };
  },
  methods: {
    letterClicked: function () {
      this.animated = true;
      console.log("clicked");
      this.$emit("letter-clicked", this.letter);
    },

    letterUnclicked: function () {
      this.animated = false;
    },

    letterTapped: function () {
      this.animated = true;
      console.log("clicked");
      this.$emit("letter-clicked", this.letter);
    },

    letterUntapped: function () {
      this.animated = false;
    },

    resetAnimation: function () {
      this.animated = false;
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
  transition: height 0.1s;
}

.letter-box:hover {
  cursor: pointer;
}

.diffanimate {
  /* animation-name: pop; */
  height: calc(100% / 3.1);
  animation-duration: 0.1s;
}

@keyframes pop {
  0% {
    height: calc(100% / 3.1);
  }
  100% {
    height: calc(100% / 3);
  }
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
