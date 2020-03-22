<template>
  <v-container class="text-center news" v-if="!news">
    <Loading />
  </v-container>
  <v-container class="text-center news" v-else>
    <h2>News</h2>
    <img
      v-for="(lang,i) in languages"
      :src="`https://www.countryflags.io/${lang}/flat/32.png`"
      @click="getNews(lang)"
      :key="i"
    />

    <h4 v-if="news">Total news {{news.totalResults}}</h4>
    <v-row v-if="news">
      <v-col cols="12" sm="6" v-for="(article,i) in news.articles" :key="i">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="article.urlToImage"></v-img>

          <v-card-title class="pb-0">{{article.title}}</v-card-title>

          <v-card-text class="text--primary">
            <div class="text-left">{{article.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text :href="article.url" target="_blank">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading.vue";
export default {
  name: "Home",
  components: {
    Loading
  },
  data() {
    return {
      fab: false,
      languages: [
        "ar",
        "de",
        "gb",
        "es",
        "fr",
        "us",
        "it",
        "nl",
        "no",
        "pt",
        "ru",
        "se"
      ],
      selectedLang: null,
      cirilic: "коронавирус",
      news: null
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    getNews(lang) {
      let type = lang == "ru" ? this.cirilic : "coronavirus";
      let typeLang =
        lang == "gb" || lang == "us" || !this.languages.includes(lang)
          ? "en"
          : lang;
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${type}&language=${typeLang}&pageSize=100&sortBy=publishedAt&apiKey=bdfa214239164327bc483764a37373ec`
        )
        .then(res => {
          this.news = res.data;
        });
    }
  },
  created() {
    this.selectedLang = navigator.language || navigator.userLanguage;
    this.getNews(this.selectedLang.slice(0, 2));
  }
};
</script>

<style  scoped>
.v-application .pb-0 {
  word-break: break-word;
}
.mx-auto.v-card.v-sheet.theme--light {
  height: 100%;
}
a.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default.orange--text {
  position: absolute;
  bottom: 0px;
}
div .v-btn--fixed.v-btn--bottom {
  bottom: 75px;
}
</style>

