<template>
  <Loading v-if="!globalStats" />
  <div v-else class="global-stats">
    <marquee behavior="scroll" direction="left">
      <h3 style="display:inline-block; color:#ce4b44">TODAY Update Every 1 Minute:</h3>
      <v-chip class="ma-2" color="#527397" outlined>
        <span left>🤒 🦠</span>
        Today № Infected {{globalStats.results[0].total_new_cases_today}}
      </v-chip>
      <v-chip class="ma-2" color="black" outlined pill>
        <span left>😔</span>
        Today № Deaths {{globalStats.results[0].total_new_deaths_today}}
      </v-chip>
      <h3 style="display:inline-block; color:#ce4b44">World Live Update Every 1 Minute:</h3>
      <v-chip class="ma-2" color="#527397" outlined>
        <span left>🤒 🦠</span>
        № Infected {{globalStats.results[0].total_cases}}
      </v-chip>
      <v-chip class="ma-2" color="black" outlined pill>
        <span left>😔</span>
        № Deaths {{globalStats.results[0].total_deaths}}
      </v-chip>
      <v-chip class="ma-2" color="#91c439" outlined>
        <span left>💪</span>
        № Recovered {{globalStats.results[0].total_recovered}}
        <span right>✅</span>
      </v-chip>
      <v-chip class="ma-2" color="#9191AC" outlined pill>
        <span left>🧐</span>
        № Unresolved {{globalStats.results[0].total_unresolved}}
      </v-chip>
      <v-chip class="ma-2" color="#527397" outlined>
        <span left>🤒 🦠</span>
        № Active {{globalStats.results[0].total_active_cases}}
      </v-chip>
      <v-chip class="ma-2" color="red" outlined>
        <span left>🚨</span>
        № Serious {{globalStats.results[0].total_serious_cases}}
      </v-chip>
    </marquee>
  </div>
</template>
<script>
import Loading from "./Loading.vue";
import axios from "axios";
export default {
  name: "GlobalStats",
  components: {
    Loading
  },
  data() {
    return {
      globalStats: null,
      interval: null
    };
  },
  methods: {
    getGlobalStats() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://thevirustracker.com/free-api?global=stats"
        )
        .then(res => {
          this.globalStats = res.data;
          console.log(this.globalStats);
        });
    }
  },
  created() {
    this.getGlobalStats();
    this.interval = setInterval(() => {
      this.getGlobalStats();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.global-stats {
  display: flex;
}
.global-stats > marquee {
  background-color: white;
  border-radius: 30px;
}
marquee h3 {
  vertical-align: middle;
}
</style>