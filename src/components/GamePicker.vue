<template>
  <div class="game-picker">
    <h1 class="games-header">Current Games</h1>
    <ul class="game-list">
      <li class="game-box" v-for="game in gameObjs" :key="game.id">
        <el-card class="box-card game-list-card">
          <router-link class="game-link" :to="{name: 'home', params: { gameId: game.id}}">{{ new Date(game.date).toDateString() }}</router-link>
        </el-card>
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
          "http://localhost:3000/game/"
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

  .game-box {
    width: 95%;
    display: inline-block;
    margin: 10px auto;
    text-align: center;
  }

  .game-list-card {
    margin: 0 auto;
  }

  .game-link {
    text-decoration: none;
    font-weight: bold;
  }
</style>
