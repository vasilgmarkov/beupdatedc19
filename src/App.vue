<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <img src="@/assets/live.gif" alt="live" />

      <!-- <v-btn to="/" text>
        <span class="mr-2">Be Updated Covid-19</span>
        <span>🦠</span>
      </v-btn>-->
      <GlobalStats />
      <v-icon
        class="back-button"
        v-if="$router.history.current.name!='Home'"
        @click="$router.go(-1)"
      >mdi-arrow-left-bold-circle-outline</v-icon>
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-if="this.$route.name != 'Home'">
            <router-link to="/">
              <v-list-item-title>🏠 Home</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/news">
              <v-list-item-title>📰 News</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>-->
    <v-content>
      <router-view />
    </v-content>
    <v-bottom-navigation
      v-model="bottomNav"
      background-color="primary"
      color="white"
      class="bottom-nav"
    >
      <v-btn value="home" to="/">
        <span>Map</span>
        <v-icon>mdi-earth</v-icon>
      </v-btn>

      <v-btn value="news" to="/news">
        <span>News</span>
        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn value="ranking" to="/ranking">
        <span>Ranking</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>



<script>
import GlobalStats from "./components/GlobalStats.vue";

export default {
  name: "App",
  components: {
    GlobalStats
  },
  data: () => ({
    drawer: false,
    group: null,
    bottomNav: "recent"
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  created() {}
};
</script>

<style>
.v-navigation-drawer--temporary,
.bottom-nav {
  z-index: 9999 !important;
}
.bottom-nav {
  position: sticky !important;
}
.v-toolbar__content img {
  width: 30px;
  margin-right: 5px;
}
.back-button {
  font-size: 30px;
  margin-left: 5px;
}
.v-bottom-navigation.bottom-nav.v-item-group.theme--light.primary.white--text
  a {
  height: 100%;
}
</style>
