<template>
  <v-container class="text-center news">
  <p>News</p>
  <img v-for="lang in languages" :src="`https://www.countryflags.io/${lang}/flat/32.png`" @click="getNews(lang)">
  
  <h4 v-if="news">Total news {{news.totalResults}}</h4>
  <v-row v-if="news">

     <v-col cols="12" sm="6" v-for="(article,i) in news.articles" :key="i">
    <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="article.urlToImage"
    >
   
    </v-img>

    <v-card-title class="pb-0">{{article.title}}</v-card-title>

    <v-card-text class="text--primary">
      <div class="text-left">{{article.description}}</div>
    </v-card-text>

    <v-card-actions>
     <v-btn
        color="orange"
        text
        :href="article.url" target="_blank"
      >
        Read more
      </v-btn>
    </v-card-actions>
  </v-card>
     </v-col>
     </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  
  data() {
    return {
     languages:["ar", "de", "gb", "es", "fr", "us", "it", "nl", "no", "pt", "ru", "se"],
     selectedLang:null,
     cirilic: "коронавирус",
     news:null
  }
  },
  methods:{
      getNews(lang){
    let type = lang == 'ru' ? this.cirilic : 'coronavirus'
    let typeLang = (lang == 'gb' || lang == 'us' || !this.languages.includes(lang)) ? 'en' : lang
    axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${type}&language=${typeLang}&pageSize=100&sortBy=publishedAt&apiKey=bdfa214239164327bc483764a37373ec`
        )
        .then(res => {
          this.news = res.data
        });
      }
  },
  created(){
      this.selectedLang = navigator.language || navigator.userLanguage; 
      this.getNews(this.selectedLang.slice(0,2))
  }
}
</script>

