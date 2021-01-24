<template>
  <div class="game-picker">
    <h1 class="games-header">Current Games</h1>
    <ul class="game-list">
      <li @click="navigateToGame(game.id)" class="game-box" v-for="game in gameObjs" :key="game.id">
        <router-link :to="{name: 'home', params: { gameId: game.id}}">{{ new Date(game.date).toDateString() }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// import _ from "lodash";

export default {
  name: "GamePicker",
  components: {
  },
  props: {
    msg: String,
  },
  created() {
    this.fetchGames();
  },
  data: function () {
    return {
      gameObjs: [],
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    fetchGames: async function() {
      try {
        const response = await axios.get(
          "http://f767c91e79e0.ngrok.io/game/"
        );
        console.log(response.data);
        this.gameObjs = response.data.map(record => { 
          console.log(record._id);
          return { id: record._id, date: record.date };
        });
      } catch (err) {
        console.log(err);
      }
    },

    navigateToGame(gameId) {
      this.$router.push({name: 'home', params: { gameId: gameId}});
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .game-list {
    width: 95%;
  }

  .game-box {
    width: 100%;
    border: 1px solid #ddd;
    display: inline-block;
    padding: 10px 0;
    margin=: 0 auto;
    text-align: center;
  }
</style>
