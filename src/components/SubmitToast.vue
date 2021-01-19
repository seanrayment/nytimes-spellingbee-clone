<template>
	<div class="toast-container">+4 points</div>
</template>

<script>
export default {
  name: "SubmitToast",
  components: {
  },
  props: {
  },
  data: function () {
    return {
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {

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
		animation-name: flash;
		animation-duration: 0.5s;
		opacity: 0;
	}

	@keyframes flash {
		0%   {
			opacity: 0;
			transform: translate(-50%, -50%);

		}
		80%  {
			opacity: 1; 
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -90%);

		}
	}
</style>
