<template>
  <div
    v-on:flash-points="animate"
    @animationend="nextAnimation()"
    class="toast-container"
    v-bind:class="{ animate: animated }"
  >
    {{ animationValue }} points
  </div>
</template>

<script>
export default {
  name: "SubmitToast",
  components: {},
  props: {},
  data: function () {
    return {
      animated: false,
    };
  },
  computed: {
    animations() {
      return this.$store.state.animations;
    },
    animationValue() {
      const val = this.$store.state.animations[
        this.$store.state.animations.length - 1
      ];
      console.log(val);
      return val;
    },
  },
  watch: {
    animations(newAnimations) {
      if (newAnimations.length > 0 && !this.animated) {
        console.log("more animations");
        this.animated = true;
      }
    },
  },
  methods: {
    animate: function () {
      console.log("hello");
      this.animated = true;
    },
    nextAnimation: async function () {
      this.animated = false;
      if (this.animations.length > 0) {
        console.log("more animations");
        const self = this;
        setTimeout(function () {
          console.log("waited");
          self.$store.commit("popAnimation");
        }, 50);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.toast-container {
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  background: #85b3ff;
  padding: 15px;
  position: absolute;
  width: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0;
  user-select: none;
}

.animate {
  animation-name: flash;
  animation-duration: 0.5s;
}

@keyframes flash {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -90%);
  }
}
</style>
