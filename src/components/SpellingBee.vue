<template>
  <div class="hello">
    <div ref="confetti" class="confetti-container"></div>
    <div class="game-container">
      <el-progress
        class="progress"
        :text-inside="false"
        :percentage="gameProgress"
      ></el-progress>
      <span class="user-input placeholder" v-if="enteredLetters === ''"
        >Enter a word</span
      >
      <span v-else class="user-input">{{ enteredLetters.toUpperCase() }}</span>
      <div>
        <el-button @click="backspace" round>Delete</el-button>
        <el-button @click="checkAnswer" type="primary" round>Enter</el-button>
      </div>

      <div class="game-layout-container">
        <FoundWords :foundWords="reversedWords" />
        <div ref="game" class="board-container">
          <SubmitToast />
          <div class="letters-container">
            <LetterBox
              v-on:letter-clicked="letterClicked"
              class="center-tile"
              :letter="centerLetter"
            />
            <LetterBox
              v-on:letter-clicked="letterClicked"
              v-for="(letter, index) in letters"
              :key="`fruit-${index}`"
              :letter="letter"
            />
          </div>
          <div class="button-container">
            <el-button
              @click="scramble"
              class="refresh-button"
              icon="el-icon-refresh"
              circle
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LetterBox from "./LetterBox.vue";
import FoundWords from "./FoundWords.vue";
import SubmitToast from "./SubmitToast.vue";
import { confetti } from "dom-confetti";
import _ from "lodash";

export default {
  name: "SpellingBee",
  components: {
    LetterBox,
    FoundWords,
    SubmitToast,
  },
  props: {
    msg: String,
  },
  created() {
    console.log(this.$route.params);
    console.log("fetching game data");
    this.fetchGame();
    let self = this;
    window.addEventListener("keydown", (event) => {
      console.log(event.key);
      self.keyPressed(event.key);
    });
  },
  data: function () {
    return {
      letters: ["", "", "", "", "", ""],
      centerLetter: "",
      enteredLetters: "",
      answers: [],
      foundWords: [],
    };
  },
  computed: {
    reversedWords: function () {
      let reversed = this.foundWords;
      reversed.reverse();
      return reversed;
    },

    totalScore: function () {
      if (this.answers.length === 0) {
        return undefined;
      }
      let score = 0;
      this.answers.forEach((ans) => {
        if (ans.length === 4) {
          score += 1;
        } else {
          score += ans.length;
        }
      });
      return score;
    },

    winningScore: function () {
      if (this.totalScore === undefined) {
        return undefined;
      }
      return Math.min(Math.floor(0.6 * this.totalScore), 200);
    },

    currScore: function () {
      let score = 0;
      this.foundWords.forEach((ans) => {
        if (ans.length === 4) {
          score += 1;
        } else {
          score += ans.length;
        }
      });
      return score;
    },
    gameProgress: function () {
      if (this.winningScore === undefined) {
        return 0;
      }
      return Math.max(
        0,
        Math.min(Math.floor((this.currScore / this.winningScore) * 100), 100)
      );
    },
  },
  watch: {
    foundWords: function () {
      if (this.currScore >= this.winningScore) {
        confetti(this.$refs.confetti, {
          duration: 5000,
          elementCount: 200,
        });
      }
    },
  },
  methods: {
    fetchGame: async function () {
      try {
        console.log(this.$route.params.gameId);
        const response = await axios.get(
          `http://localhost:3000/game/${this.$route.params.gameId}/`
        );
        console.log(response.data);
        this.letters = response.data.letters.filter(
          (c) => c != response.data.centerLetter
        );
        this.centerLetter = response.data.centerLetter;
        this.answers = response.data.answers;
      } catch (err) {
        console.log(err);
      }
    },

    increment: function () {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },

    scramble: function () {
      this.letters = _.shuffle(this.letters);
    },

    letterClicked: function (letter) {
      this.enteredLetters += letter;
    },

    keyPressed: function (letter) {
      if ((this.letters + this.centerLetter).includes(letter)) {
        this.enteredLetters += letter;
      } else if (letter == "Backspace" || letter == "Delete") {
        this.backspace();
      } else if (letter == "Enter") {
        this.checkAnswer();
      }
    },

    backspace: function () {
      this.enteredLetters = this.enteredLetters.slice(0, -1);
    },

    checkAnswer: function () {
      const word = this.enteredLetters.toLowerCase();
      if (
        !this.foundWords.includes(word) &&
        this.answers.includes(word) &&
        word.includes(this.centerLetter.toLowerCase())
      ) {
        const word = this.enteredLetters.toLowerCase();
        const score = word.length === 4 ? 1 : word.length;
        this.foundWords.push(this.enteredLetters.toLowerCase());
        this.$store.commit("pushAnimation", score);
      }
      this.enteredLetters = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  margin: 0;
}

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

.hello {
  overflow: hidden;
}

.game-container {
  width: 100%;
  position: relative;
  height: 85vh;
  min-height: 750px;
  max-height: 960px;
  overflow: hidden;
}

.game-layout-container {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  flex-wrap: wrap;
}

.game-layout-container > * {
  padding: 15px;
}

.board-container {
  /* width: 90vw; */
  min-width: 290px;
  /* position: absolute; */
  /* top: 52%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 3;
}

.letters-container {
  position: relative;
  width: 100%;
  padding-bottom: 103.92305%;
}

.sp-input {
  border: 1px solid #ccc;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  caret-color: black;
  padding: 5px;
  border-radius: 5px;
}

.sp-input:focus {
  border: 1px solid #ccc;
  outline: none;
}

.user-input {
  font-size: 36px;
  font-weight: 700;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.placeholder {
  color: #ddd;
  font-weight: 0;
}

.button-container {
  padding: 20px;
}

.progress {
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.confetti-container {
  position: fixed;
  top: 60%;
  left: 50%;
  z-index: 10000;
}

@media (max-width: 768px) {
  .game-layout-container {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  .game-layout-container > * {
    padding: 5px;
  }
}
</style>
