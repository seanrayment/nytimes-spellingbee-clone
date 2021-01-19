<template>
	<div @click="expandWords" class='modal-container' v-bind:class="{'modal-container-active': isModal}">
		<el-button type="primary" icon="el-icon-close" @click.stop="expandWords" class="x-button button" v-bind:class="{hidden: !isModal}" circle></el-button>
		<ul class="found-words" v-bind:class="{ 'found-words-modal': isModal}">
			<li v-for="word in foundWords" :key="word" class="found-word">{{ word }}</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: "FoundWords",
  components: {
  },
  props: {
    foundWords: Array
  },
  data: function () {
    return {
      isModal: false
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    expandWords: function() {
      this.isModal = !this.isModal;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.found-words {
  max-width: 400px;
  border: 1px solid #ddd;
  margin: 20px auto;
  border-radius: 8px;
  padding: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
}

.found-words:hover {
	cursor: pointer;
}

.found-word {
  display: inline;
  text-overflow: ellipsis;
}

.modal-container {
  padding: 20px;
  border-radius: 8px;
}

.modal-container-active {
	position: absolute;
	display: block;
	width: 90%;
  min-width: 300px;
  max-width: 500px;
	z-index: 4;
	border: 1px solid #ddd;
	background-color: white;
	min-height: 300px;
  max-height: 600px;
	left: 50%;
	transform: translate(-50%, 0);
  overflow-y: scroll;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 0px;
  transition: min-height 0.2s;
  transition: max-height 0.2s;
}

.found-words-modal {
	background: white;
	overflow-x: hidden;
	border: none;
	overflow: visible;

}

.found-words-modal > li {
	display: block;
	padding: 5px;
  border: none;

}

.x-button {
	display: inline-block;
  position: fixed;
  right: 5%;
  top: 5%;
}

.hidden {
	display: none;
}

</style>
