<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/" text>
        <span class="mr-2">Be Updated Covid-19</span>
        <span>🦠</span>
      </v-btn>
      
    </v-app-bar>
 <v-navigation-drawer
      v-model="drawer"
      absolute
     
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-if="this.$route.name != 'Home'">
            <router-link to="/"> <v-list-item-title>🏠 Home</v-list-item-title></router-link>
          </v-list-item>

          <v-list-item>
             <router-link to="/news"><v-list-item-title>📰 News</v-list-item-title></router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
    
      <router-view />
    </v-content>
  </v-app>
</template>



<script>
  export default {

     name: "App",
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    created(){
     
    }
  }
</script>

<style>
.v-navigation-drawer--temporary {
    z-index: 9999 !important;
}
</style>
