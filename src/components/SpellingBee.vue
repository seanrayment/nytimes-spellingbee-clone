<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="game-container">
      <input autofocus v-model="enteredLetters" placeholder="edit me">
        <div class="board-container">
            <div class="letters-container">
                <LetterBox v-on:letter-clicked="letterClicked" :letter="centerLetter" :key="centerLetter"/>
                <LetterBox v-on:letter-clicked="letterClicked" v-for="letter in letters" :key="letter" :letter="letter"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import LetterBox from './LetterBox.vue'

export default {
  name: 'SpellingBee',
  components: {
      LetterBox
  },
  props: {
    msg: String
  },
  data: function () {
    return {
      letters: ['T','Y','E','A','G','M'],
      centerLetter: 'B',
      enteredLetters: ''
    }
  },
	methods: {
		increment: function () {
			this.$store.commit('increment')
			console.log(this.$store.state.count)
    },
    
    letterClicked: function(letter) {
      this.enteredLetters += letter;
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.game-container {
    width: 100%;
    position: relative;
    height: 90vh;
    min-height: 550px;
    max-height: 960px;
}

.board-container {
    width: 90vw;
    max-width: 290px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
}

.letters-container {
    position: relative;
    width: 100%;
    padding-bottom: 103.92305%

}
</style>
