<template>
  <div @click="expandWords" class="modal-container">
    <p class="found-words-header">Found words</p>
    <ul class="found-words" v-bind:class="{ 'expanded-container': isModal }">
      <!-- <el-button
        type="primary"
        icon="el-icon-close"
        @click.stop="expandWords"
        class="x-button button"
        v-bind:class="{ hidden: !isModal }"
        circle
      ></el-button> -->
      <li v-for="word in foundWords" :key="word" class="found-word">
        {{ word }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FoundWords",
  components: {},
  props: {
    foundWords: Array,
  },
  data: function () {
    return {
      isModal: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    expandWords: function () {
      console.log("expand");
      this.isModal = !this.isModal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.found-words-header {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
}
.expanded-container > li {
  display: block;
}
.found-words {
  width: 300px;
  max-width: 360px;
  border: 1px solid #ddd;
  margin: 10px auto;
  border-radius: 8px;
  padding: 10px;
  overflow-x: scroll;
  display: inline-block;
  white-space: nowrap;
}

.found-words:hover {
  cursor: pointer;
}

.found-word {
  display: inline;
}

/*
.modal-container {
  display: inline-block;
  padding: 0;
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
  position: fixed;
  max-width: 100%;
  margin: 0;
  top: -45%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  background-color: white;
  z-index: 4;
  border: 1px solid #ddd;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.08);
}

.found-words-modal {
  background: white;
  border: none;
  overflow: scroll;
  max-width: 100%;
}

.found-words-modal > li {
  display: block;
  padding: 5px;
  border: none;
}
*/

.hidden {
  display: none;
}

@media (min-width: 768px) {
  .found-words {
    height: 65vh;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 1px solid #eee;
  }

  .found-words > li {
    display: block;
    padding: 2px;
    margin: 0 auto;
  }

  .found-word {
    font-size: 1rem;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .expanded-container {
    height: 65vh;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 1px solid #eee;
  }

  .expanded-container > .found-word {
    display: block;
    padding: 2px;
    margin: 0 auto;
    font-size: 1rem;
    font-weight: 500;
  }

  /* .expanded-container > .x-button {
    display: inline-block;
    position: fixed;
    right: 5%;
    top: -43%;
  } */
}
</style>
