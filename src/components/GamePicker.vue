<template>
  <div class="game-picker">
    <ul class="game-list">
      <li v-for="gameId in gameIds" :key="gameId">
        This is a link
        <router-link :to="{name: 'home', params: { gameId: gameId}}">{{ gameId }}</router-link>
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
    console.log("fetching published games");
    this.fetchGames();
  },
  data: function () {
    return {
      gameIds: ["", "", "", "", "", ""],
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
        this.gameIds = response.data.map(record => record._id);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
