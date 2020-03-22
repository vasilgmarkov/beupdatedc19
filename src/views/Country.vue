<template>
  <v-container class="text-center" v-if="!countryInfo">
    <Loading />
  </v-container>
  <v-container class="text-center country" v-else>
    <div>
      <img
        :src="`https://www.countryflags.io/${countryInfo.countrydata[0].info.code.toLowerCase()}/flat/32.png`"
      />
      <p>
        {{countryInfo.countrydata[0].info.title}} has
        <b>{{countryInfo.countrydata[0].total_cases}}</b> confirmed cases.
      </p>
    </div>
    <v-row class="justify-center">
      <v-col cols="4" sm="3">
        <p>{{countryInfo.countrydata[0].total_active_cases}}</p>
        <v-chip class="ma-2" color="#527397" outlined>
          <span left>🤒 🦠</span>
          № Active
        </v-chip>
      </v-col>
      <v-col cols="4" sm="3">
        <p>➕{{countryInfo.countrydata[0].total_new_cases_today}}</p>
        <v-chip class="ma-2" color="primary" outlined>
          <span left>📆</span>
          № Today
        </v-chip>
      </v-col>
      <v-col cols="4" sm="3">
        <p>{{countryInfo.countrydata[0].total_serious_cases}}</p>
        <v-chip class="ma-2" color="red" outlined>
          <span left>🚨</span>
          № Serious
        </v-chip>
      </v-col>

      <v-col cols="6" sm="6">
        <p>{{countryInfo.countrydata[0].total_deaths}}</p>
        <v-chip class="ma-2" color="primary" outlined pill>
          № Deaths
          <span right>😔</span>
        </v-chip>
      </v-col>
      <v-col cols="6" sm="6">
        <p>➕{{countryInfo.countrydata[0].total_new_deaths_today}}</p>
        <v-chip class="ma-2" color="deep-purple accent-4" outlined>
          № Today
          <span right>📆</span>
        </v-chip>
      </v-col>
      <v-col cols="12" sm="12">
        <p>{{countryInfo.countrydata[0].total_recovered}}</p>
        <v-chip class="ma-2" color="#91c439" outlined>
          <span left>💪</span>
          № Recovered
          <span right>✅</span>
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <CountryChart :code="code" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CountryChart from "../components/CountryChart.vue";
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
  name: "Country",
  props: ["code"],
  components: {
    CountryChart,
    Loading
  },
  data() {
    return {
      countryInfo: null
      //       countryInfo:{
      //   "countrydata": [
      //     {
      //       "info": {
      //         "ourid": 167,
      //         "title": "USA",
      //         "code": "US",
      //         "source": "https://thevirustracker.com/usa-coronavirus-information-us"
      //       },
      //       "total_cases": 14366,//done top
      //       "total_recovered": 125,
      //       "total_unresolved": 0,
      //       "total_deaths": 217,
      //       "total_new_cases_today": 577,//done
      //       "total_new_deaths_today": 10,
      //       "total_active_cases": 14024,//done
      //       "total_serious_cases": 64 //done
      //     }
      //   ],
      //   "countrynewsitems": [
      //     {
      //       "1": {
      //         "newsid": "H3PgJv",
      //         "title": "Coronavirus USA Update: California Confirms Second Case Of Community Transmission",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/coronavirus-usa-update-california-confirms-second-case-of-community-transmission-H3PgJv.jpg",
      //         "time": "29 February 2020 10:22",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-california-confirms-second-case-of-community-transmission-H3PgJv"
      //       },
      //       "2": {
      //         "newsid": "EPlTAr",
      //         "title": "Coronavirus live updates: 4 unrelated cases in the West Coast US issues level 3 advisory for Italy",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/coronavirus-live-updates-4-unrelated-cases-in-the-west-coast-us-issues-level-3-advisory-for-italy-EPlTAr.jpg",
      //         "time": "29 February 2020 13:39",
      //         "url": "https://thevirustracker.com/story/coronavirus-live-updates-4-unrelated-cases-in-the-west-coast-us-issues-level-3-advisory-for-italy-EPlTAr"
      //       },
      //       "3": {
      //         "newsid": "aaHP4z",
      //         "title": "Coronavirus USA: Here&rsquo;s what we know about all the West ...",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/coronavirus-usa-here-s-what-we-know-about-all-the-west-aaHP4z.jpg",
      //         "time": "29 February 2020 20:27",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-here-s-what-we-know-about-all-the-west-aaHP4z"
      //       },
      //       "4": {
      //         "newsid": "peQ3Nd",
      //         "title": "Delta American suspending flights to Milan as coronavirus flight cuts spread to Italy",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/delta-american-suspending-flights-to-milan-as-coronavirus-flight-cuts-spread-to-italy-peQ3Nd.jpg",
      //         "time": "1 March 2020 17:23",
      //         "url": "https://thevirustracker.com/story/delta-american-suspending-flights-to-milan-as-coronavirus-flight-cuts-spread-to-italy-peQ3Nd"
      //       },
      //       "5": {
      //         "newsid": "GP2VC8",
      //         "title": "Coronavirus: Second U.S. death reported as worldwide toll exceeds 3000",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/coronavirus-second-u-s-death-reported-as-worldwide-toll-exceeds-3000-GP2VC8.jpg",
      //         "time": "2 March 2020 11:43",
      //         "url": "https://thevirustracker.com/story/coronavirus-second-u-s-death-reported-as-worldwide-toll-exceeds-3000-GP2VC8"
      //       },
      //       "6": {
      //         "newsid": "nwidWE",
      //         "title": "Making travel plans? How coronavirus fear is spreading and putting trips in limbo",
      //         "image": "https://thevirustracker.com/news-images/thumbs/1/making-travel-plans-how-coronavirus-fear-is-spreading-and-putting-trips-in-limbo-nwidWE.jpg",
      //         "time": "2 March 2020 13:27",
      //         "url": "https://thevirustracker.com/story/making-travel-plans-how-coronavirus-fear-is-spreading-and-putting-trips-in-limbo-nwidWE"
      //       },
      //       "7": {
      //         "newsid": "lvhcYw",
      //         "title": "Coronavirus USA Update: Second US Death Confirmed New York Reports First Case",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-second-us-death-confirmed-new-york-reports-first-case-lvhcYw.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-second-us-death-confirmed-new-york-reports-first-case-lvhcYw"
      //       },
      //       "8": {
      //         "newsid": "OFQQRL",
      //         "title": "Coronavirus USA and the workplace: Here comes Monday",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-and-the-workplace-here-comes-monday-OFQQRL.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-and-the-workplace-here-comes-monday-OFQQRL"
      //       },
      //       "9": {
      //         "newsid": "0Z9EJk",
      //         "title": "Coronavirus USA Update: Seattle California Confirm Four More Cases Spread To Be Expected",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-seattle-california-confirm-four-more-cases-spread-to-be-expected-0Z9EJk.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-seattle-california-confirm-four-more-cases-spread-to-be-expected-0Z9EJk"
      //       },
      //       "10": {
      //         "newsid": "css2C9",
      //         "title": "Coronavirus Fears See Mask Hand Sanitizer Water Toilet Paper Shortages at Costco Walmart and Target",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-fears-see-mask-hand-sanitizer-water-toilet-paper-shortages-at-costco-walmart-and-target-css2C9.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-fears-see-mask-hand-sanitizer-water-toilet-paper-shortages-at-costco-walmart-and-target-css2C9"
      //       },
      //       "11": {
      //         "newsid": "FCaq4Y",
      //         "title": "Second Coronavirus Patient Dies In U.S First Cases In NY And Florida Emerge",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/second-coronavirus-patient-dies-in-u-s-first-cases-in-ny-and-florida-emerge-FCaq4Y.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/second-coronavirus-patient-dies-in-u-s-first-cases-in-ny-and-florida-emerge-FCaq4Y"
      //       },
      //       "12": {
      //         "newsid": "rWJdwx",
      //         "title": "Coronavirus USA Update: New York Braces For Outbreak As Latest Death Toll Hits 2858",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-new-york-braces-for-outbreak-as-latest-death-toll-hits-2858-rWJdwx.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-new-york-braces-for-outbreak-as-latest-death-toll-hits-2858-rWJdwx"
      //       },
      //       "13": {
      //         "newsid": "Tq2RpM",
      //         "title": "Coronavirus isn't about Trump's stock market and 2020 odds. Or at least it shouldn't be.",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-isn-t-about-trump-s-stock-market-and-2020-odds-or-at-least-it-shouldn-t-be-Tq2RpM.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-isn-t-about-trump-s-stock-market-and-2020-odds-or-at-least-it-shouldn-t-be-Tq2RpM"
      //       },
      //       "14": {
      //         "newsid": "69lFhl",
      //         "title": "Coronavirus USA Update: 83 Quarantined In New York 60 US Cases Confirmed",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-83-quarantined-in-new-york-60-us-cases-confirmed-69lFhl.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-83-quarantined-in-new-york-60-us-cases-confirmed-69lFhl"
      //       },
      //       "15": {
      //         "newsid": "iTU3aA",
      //         "title": "Coronavirus USA Update: San Francisco Declares State Of Emergency 53 Cases Confirmed In US",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-san-francisco-declares-state-of-emergency-53-cases-confirmed-in-us-iTU3aA.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-san-francisco-declares-state-of-emergency-53-cases-confirmed-in-us-iTU3aA"
      //       },
      //       "16": {
      //         "newsid": "KnCrSZ",
      //         "title": "Coronavirus USA Update: Orange County Declares Health Emergency In Fight Over COVID-19 Evacuees",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/coronavirus-usa-update-orange-county-declares-health-emergency-in-fight-over-covid-19-evacuees-KnCrSZ.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-orange-county-declares-health-emergency-in-fight-over-covid-19-evacuees-KnCrSZ"
      //       },
      //       "17": {
      //         "newsid": "x6vfKy",
      //         "title": "Only Warren Klobuchar And Biden Have Plans For A Coronavirus Response",
      //         "image": "https://thevirustracker.com/news-images/thumbs/2/only-warren-klobuchar-and-biden-have-plans-for-a-coronavirus-response-x6vfKy.jpg",
      //         "time": "2 March 2020 14:23",
      //         "url": "https://thevirustracker.com/story/only-warren-klobuchar-and-biden-have-plans-for-a-coronavirus-response-x6vfKy"
      //       },
      //       "18": {
      //         "newsid": "H2kRhr",
      //         "title": "What&rsquo;s next for the Tokyo Olympics as coronavirus spreads?",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/what-s-next-for-the-tokyo-olympics-as-coronavirus-spreads-H2kRhr.jpg",
      //         "time": "2 March 2020 15:31",
      //         "url": "https://thevirustracker.com/story/what-s-next-for-the-tokyo-olympics-as-coronavirus-spreads-H2kRhr"
      //       },
      //       "19": {
      //         "newsid": "4XhIMI",
      //         "title": "Coronavirus: 5 things to know for Monday March 2",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/coronavirus-5-things-to-know-for-monday-march-2-4XhIMI.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/coronavirus-5-things-to-know-for-monday-march-2-4XhIMI"
      //       },
      //       "20": {
      //         "newsid": "grQ6Eh",
      //         "title": "Mike Pence tweeted a picture of his coronavirus 'taskforce' and it doesn't include a single woman",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/mike-pence-tweeted-a-picture-of-his-coronavirus-taskforce-and-it-doesn-t-include-a-single-woman-grQ6Eh.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/mike-pence-tweeted-a-picture-of-his-coronavirus-taskforce-and-it-doesn-t-include-a-single-woman-grQ6Eh"
      //       },
      //       "21": {
      //         "newsid": "JB8u76",
      //         "title": "The Coronavirus is here. How ready is the U.S. for the outbreak and how much is being affected by partisan politics? Join the #Confab.",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/the-coronavirus-is-here-how-ready-is-the-u-s-for-the-outbreak-and-how-much-is-being-affected-by-partisan-politics-join-the-confab-JB8u76.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/the-coronavirus-is-here-how-ready-is-the-u-s-for-the-outbreak-and-how-much-is-being-affected-by-partisan-politics-join-the-confab-JB8u76"
      //       },
      //       "22": {
      //         "newsid": "vUrhzV",
      //         "title": "USA Volleyball Response on Coronavirus",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/usa-volleyball-response-on-coronavirus-vUrhzV.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/usa-volleyball-response-on-coronavirus-vUrhzV"
      //       },
      //       "23": {
      //         "newsid": "XoaVru",
      //         "title": "Coronavirus USA Update: Virus-exposed Health Workers Moved Freely In Public Whistle Blower Reveals",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/coronavirus-usa-update-virus-exposed-health-workers-moved-freely-in-public-whistle-blower-reveals-XoaVru.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-virus-exposed-health-workers-moved-freely-in-public-whistle-blower-reveals-XoaVru"
      //       },
      //       "24": {
      //         "newsid": "A8JJkJ",
      //         "title": "Partisan bickering delayed Zika funding for months. With coronavirus experts worry history will repeat itself",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/partisan-bickering-delayed-zika-funding-for-months-with-coronavirus-experts-worry-history-will-repeat-itself-A8JJkJ.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/partisan-bickering-delayed-zika-funding-for-months-with-coronavirus-experts-worry-history-will-repeat-itself-A8JJkJ"
      //       },
      //       "25": {
      //         "newsid": "OlkvV7",
      //         "title": "Trump Will Lose 2020 Elections If Coronavirus Spreads In USA Goldman Sachs Warns",
      //         "image": "https://thevirustracker.com/news-images/thumbs/3/trump-will-lose-2020-elections-if-coronavirus-spreads-in-usa-goldman-sachs-warns-OlkvV7.jpg",
      //         "time": "2 March 2020 15:34",
      //         "url": "https://thevirustracker.com/story/trump-will-lose-2020-elections-if-coronavirus-spreads-in-usa-goldman-sachs-warns-OlkvV7"
      //       },
      //       "26": {
      //         "newsid": "4T8aAJ",
      //         "title": "Former McDonald&rsquo;s USA CEO on coronavirus: Restaurants are &lsquo;extremely&rsquo; sanitary",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/former-mcdonald-s-usa-ceo-on-coronavirus-restaurants-are-extremely-sanitary-4T8aAJ.jpg",
      //         "time": "2 March 2020 18:51",
      //         "url": "https://thevirustracker.com/story/former-mcdonald-s-usa-ceo-on-coronavirus-restaurants-are-extremely-sanitary-4T8aAJ"
      //       },
      //       "27": {
      //         "newsid": "gmrO2i",
      //         "title": "Coronavirus questions answered by a doctor: Should I panic? What are best prevention steps?",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-questions-answered-by-a-doctor-should-i-panic-what-are-best-prevention-steps-gmrO2i.jpg",
      //         "time": "2 March 2020 18:51",
      //         "url": "https://thevirustracker.com/story/coronavirus-questions-answered-by-a-doctor-should-i-panic-what-are-best-prevention-steps-gmrO2i"
      //       },
      //       "28": {
      //         "newsid": "J6aBv7",
      //         "title": "Fearing coronavirus rumors Shen Yun says it's not Chinese",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/fearing-coronavirus-rumors-shen-yun-says-it-s-not-chinese-J6aBv7.jpg",
      //         "time": "2 March 2020 18:51",
      //         "url": "https://thevirustracker.com/story/fearing-coronavirus-rumors-shen-yun-says-it-s-not-chinese-J6aBv7"
      //       },
      //       "29": {
      //         "newsid": "vQIznW",
      //         "title": "Start of Japanese baseball season in doubt over coronavirus fears",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/start-of-japanese-baseball-season-in-doubt-over-coronavirus-fears-vQIznW.jpg",
      //         "time": "2 March 2020 18:51",
      //         "url": "https://thevirustracker.com/story/start-of-japanese-baseball-season-in-doubt-over-coronavirus-fears-vQIznW"
      //       },
      //       "30": {
      //         "newsid": "lgHV2y",
      //         "title": "Coronavirus: Whatever happens next COVID-19 is already having an effect the photo industry",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-whatever-happens-next-covid-19-is-already-having-an-effect-the-photo-industry-lgHV2y.jpg",
      //         "time": "2 March 2020 20:22",
      //         "url": "https://thevirustracker.com/story/coronavirus-whatever-happens-next-covid-19-is-already-having-an-effect-the-photo-industry-lgHV2y"
      //       },
      //       "31": {
      //         "newsid": "iXNXA5",
      //         "title": "Coronavirus live updates: 3 more die in Seattle area bringing US death toll to 5",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-live-updates-3-more-die-in-seattle-area-bringing-us-death-toll-to-5-iXNXA5.jpg",
      //         "time": "2 March 2020 21:10",
      //         "url": "https://thevirustracker.com/story/coronavirus-live-updates-3-more-die-in-seattle-area-bringing-us-death-toll-to-5-iXNXA5"
      //       },
      //       "32": {
      //         "newsid": "Kr6L2U",
      //         "title": "Sabre falls to new lows after coronavirus fears spending stoke concerns",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/sabre-falls-to-new-lows-after-coronavirus-fears-spending-stoke-concerns-Kr6L2U.jpg",
      //         "time": "2 March 2020 21:10",
      //         "url": "https://thevirustracker.com/story/sabre-falls-to-new-lows-after-coronavirus-fears-spending-stoke-concerns-Kr6L2U"
      //       },
      //       "33": {
      //         "newsid": "xAp8ut",
      //         "title": "Iran CRISIS: Coronavirus death toll hits 650 as insiders warn of major cover up",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/",
      //         "time": "2 March 2020 21:10",
      //         "url": "https://thevirustracker.com/story/iran-crisis-coronavirus-death-toll-hits-650-as-insiders-warn-of-major-cover-up-xAp8ut"
      //       },
      //       "34": {
      //         "newsid": "BoGkfh",
      //         "title": "'UFC 248 Embedded' No. 1: Zhang Weili details coronavirus impact on her camp",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/ufc-248-embedded-no-1-zhang-weili-details-coronavirus-impact-on-her-camp-BoGkfh.jpg",
      //         "time": "2 March 2020 21:11",
      //         "url": "https://thevirustracker.com/story/ufc-248-embedded-no-1-zhang-weili-details-coronavirus-impact-on-her-camp-BoGkfh"
      //       },
      //       "35": {
      //         "newsid": "jLwszn",
      //         "title": "Steve Wozniak says he and his wife may be coronavirus patient zero in the US",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/steve-wozniak-says-he-and-his-wife-may-be-coronavirus-patient-zero-in-the-us-jLwszn.jpg",
      //         "time": "2 March 2020 21:30",
      //         "url": "https://thevirustracker.com/story/steve-wozniak-says-he-and-his-wife-may-be-coronavirus-patient-zero-in-the-us-jLwszn"
      //       },
      //       "36": {
      //         "newsid": "bwG0IQ",
      //         "title": "Maher tells Trump that coronavirus won't just disappear",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/maher-tells-trump-that-coronavirus-won-t-just-disappear-bwG0IQ.jpg",
      //         "time": "2 March 2020 22:08",
      //         "url": "https://thevirustracker.com/story/maher-tells-trump-that-coronavirus-won-t-just-disappear-bwG0IQ"
      //       },
      //       "37": {
      //         "newsid": "n7U34S",
      //         "title": "Was Steve Wozniak's wife US coronavirus 'patient zero'? Nah it's just a sinus infection",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/was-steve-wozniak-s-wife-us-coronavirus-patient-zero-nah-it-s-just-a-sinus-infection-n7U34S.jpg",
      //         "time": "2 March 2020 22:11",
      //         "url": "https://thevirustracker.com/story/was-steve-wozniak-s-wife-us-coronavirus-patient-zero-nah-it-s-just-a-sinus-infection-n7U34S"
      //       },
      //       "38": {
      //         "newsid": "jTKKRk",
      //         "title": "Coronavirus fears spark 'panic buying' of toilet paper water hand sanitizer. Here's why we all need to calm down",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-fears-spark-panic-buying-of-toilet-paper-water-hand-sanitizer-here-s-why-we-all-need-to-calm-down-jTKKRk.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/coronavirus-fears-spark-panic-buying-of-toilet-paper-water-hand-sanitizer-here-s-why-we-all-need-to-calm-down-jTKKRk"
      //       },
      //       "39": {
      //         "newsid": "Ln38K9",
      //         "title": "Steve Wozniak Said He And His Wife May Have Coronavirus&mdash; She Says It&rsquo;s A Sinus Infection",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/steve-wozniak-said-he-and-his-wife-may-have-coronavirus-she-says-it-s-a-sinus-infection-Ln38K9.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/steve-wozniak-said-he-and-his-wife-may-have-coronavirus-she-says-it-s-a-sinus-infection-Ln38K9"
      //       },
      //       "40": {
      //         "newsid": "y6lwCY",
      //         "title": "No Steve Wozniak's wife doesn't have coronavirus",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/no-steve-wozniak-s-wife-doesn-t-have-coronavirus-y6lwCY.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/no-steve-wozniak-s-wife-doesn-t-have-coronavirus-y6lwCY"
      //       },
      //       "41": {
      //         "newsid": "aQUk4x",
      //         "title": "Think you have coronavirus? Call first! Here's what to expect at the doctor's office",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/think-you-have-coronavirus-call-first-here-s-what-to-expect-at-the-doctor-s-office-aQUk4x.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/think-you-have-coronavirus-call-first-here-s-what-to-expect-at-the-doctor-s-office-aQUk4x"
      //       },
      //       "42": {
      //         "newsid": "CkDXxM",
      //         "title": "Coronavirus: Costco Sees Lines Over The Weekend Goldman Sachs Tells Staff To Delay Inessential Int&rsquo;l Travel",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-costco-sees-lines-over-the-weekend-goldman-sachs-tells-staff-to-delay-inessential-int-l-travel-CkDXxM.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/coronavirus-costco-sees-lines-over-the-weekend-goldman-sachs-tells-staff-to-delay-inessential-int-l-travel-CkDXxM"
      //       },
      //       "43": {
      //         "newsid": "p3wLpl",
      //         "title": "Shoppers Flood Costco to Prepare for the Coronavirus &mdash; but Experts Say It Isn&rsquo;t Necessary",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/shoppers-flood-costco-to-prepare-for-the-coronavirus-but-experts-say-it-isn-t-necessary-p3wLpl.jpg",
      //         "time": "3 March 2020 00:05",
      //         "url": "https://thevirustracker.com/story/shoppers-flood-costco-to-prepare-for-the-coronavirus-but-experts-say-it-isn-t-necessary-p3wLpl"
      //       },
      //       "44": {
      //         "newsid": "7Sv7fE",
      //         "title": "NBA NBPA warns players in memo about contact with fans as coronavirus spreads in U.S.",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/nba-nbpa-warns-players-in-memo-about-contact-with-fans-as-coronavirus-spreads-in-u-s-7Sv7fE.jpg",
      //         "time": "3 March 2020 00:54",
      //         "url": "https://thevirustracker.com/story/nba-nbpa-warns-players-in-memo-about-contact-with-fans-as-coronavirus-spreads-in-u-s-7Sv7fE"
      //       },
      //       "45": {
      //         "newsid": "ZPzEbJ",
      //         "title": "Fears of coronavirus prompt online petition to cancel SXSW gathering in Austin",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/fears-of-coronavirus-prompt-online-petition-to-cancel-sxsw-gathering-in-austin-ZPzEbJ.jpg",
      //         "time": "3 March 2020 01:09",
      //         "url": "https://thevirustracker.com/story/fears-of-coronavirus-prompt-online-petition-to-cancel-sxsw-gathering-in-austin-ZPzEbJ"
      //       },
      //       "46": {
      //         "newsid": "8ao4ap",
      //         "title": "Coronavirus concern spreads to the sports world: Panic or prudence?",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-concern-spreads-to-the-sports-world-panic-or-prudence-8ao4ap.jpg",
      //         "time": "3 March 2020 01:53",
      //         "url": "https://thevirustracker.com/story/coronavirus-concern-spreads-to-the-sports-world-panic-or-prudence-8ao4ap"
      //       },
      //       "47": {
      //         "newsid": "K5LiSk",
      //         "title": "Was it coronavirus? Steve Wozniak says he doesn't know if he and his wife were infected",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/was-it-coronavirus-steve-wozniak-says-he-doesn-t-know-if-he-and-his-wife-were-infected-K5LiSk.jpg",
      //         "time": "3 March 2020 02:54",
      //         "url": "https://thevirustracker.com/story/was-it-coronavirus-steve-wozniak-says-he-doesn-t-know-if-he-and-his-wife-were-infected-K5LiSk"
      //       },
      //       "48": {
      //         "newsid": "YinKDY",
      //         "title": "Coronavirus USA Update: Arizona Monitors 250 People For COVID-19 NH Confirms First Case",
      //         "image": "https://thevirustracker.com/news-images/thumbs/4/coronavirus-usa-update-arizona-monitors-250-people-for-covid-19-nh-confirms-first-case-YinKDY.jpg",
      //         "time": "3 March 2020 02:59",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-arizona-monitors-250-people-for-covid-19-nh-confirms-first-case-YinKDY"
      //       },
      //       "49": {
      //         "newsid": "1UQmzL",
      //         "title": "Coronavirus USA Update: Washington Confirms 4 More Deaths 9 Cases In Santa Clara",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/coronavirus-usa-update-washington-confirms-4-more-deaths-9-cases-in-santa-clara-1UQmzL.jpg",
      //         "time": "3 March 2020 03:54",
      //         "url": "https://thevirustracker.com/story/coronavirus-usa-update-washington-confirms-4-more-deaths-9-cases-in-santa-clara-1UQmzL"
      //       },
      //       "50": {
      //         "newsid": "do9ark",
      //         "title": "Steve Wozniak&rsquo;s viral tweet shows how quickly coronavirus misinformation spreads",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/steve-wozniak-s-viral-tweet-shows-how-quickly-coronavirus-misinformation-spreads-do9ark.jpg",
      //         "time": "3 March 2020 03:54",
      //         "url": "https://thevirustracker.com/story/steve-wozniak-s-viral-tweet-shows-how-quickly-coronavirus-misinformation-spreads-do9ark"
      //       },
      //       "51": {
      //         "newsid": "G7sOk9",
      //         "title": "Twitter suspends travel as the business world grapples with spreading coronavirus",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/twitter-suspends-travel-as-the-business-world-grapples-with-spreading-coronavirus-G7sOk9.jpg",
      //         "time": "3 March 2020 03:54",
      //         "url": "https://thevirustracker.com/story/twitter-suspends-travel-as-the-business-world-grapples-with-spreading-coronavirus-G7sOk9"
      //       },
      //       "52": {
      //         "newsid": "Isu3LA",
      //         "title": "Dow plunges 550 points enters correction on fears the coronavirus could spread in USA",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/dow-plunges-550-points-enters-correction-on-fears-the-coronavirus-could-spread-in-usa-Isu3LA.jpg",
      //         "time": "3 March 2020 06:43",
      //         "url": "https://thevirustracker.com/story/dow-plunges-550-points-enters-correction-on-fears-the-coronavirus-could-spread-in-usa-Isu3LA"
      //       },
      //       "53": {
      //         "newsid": "vCcrDZ",
      //         "title": "Coronavirus Impacts Felt In NYC Europe",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/coronavirus-impacts-felt-in-nyc-europe-vCcrDZ.jpg",
      //         "time": "3 March 2020 06:43",
      //         "url": "https://thevirustracker.com/story/coronavirus-impacts-felt-in-nyc-europe-vCcrDZ"
      //       },
      //       "54": {
      //         "newsid": "qQaBfG",
      //         "title": "Live updates: South Korea declares &lsquo;war&rsquo; on coronavirus as outbreak spreads rapidly and unpredictably outside of China",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/live-updates-south-korea-declares-war-on-coronavirus-as-outbreak-spreads-rapidly-and-unpredictably-outside-of-china-qQaBfG.jpg",
      //         "time": "3 March 2020 07:10",
      //         "url": "https://thevirustracker.com/story/live-updates-south-korea-declares-war-on-coronavirus-as-outbreak-spreads-rapidly-and-unpredictably-outside-of-china-qQaBfG"
      //       },
      //       "55": {
      //         "newsid": "gNF5op",
      //         "title": "Trump asks Fed for 'big cut' after Australia slashes rates on coronavirus impact",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/trump-asks-fed-for-big-cut-after-australia-slashes-rates-on-coronavirus-impact-gNF5op.jpg",
      //         "time": "3 March 2020 08:36",
      //         "url": "https://thevirustracker.com/story/trump-asks-fed-for-big-cut-after-australia-slashes-rates-on-coronavirus-impact-gNF5op"
      //       },
      //       "56": {
      //         "newsid": "wRtFb7",
      //         "title": "Congress scrambles to finalize coronavirus funding surveillance deals",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/congress-scrambles-to-finalize-coronavirus-funding-surveillance-deals-wRtFb7.jpg",
      //         "time": "3 March 2020 11:13",
      //         "url": "https://thevirustracker.com/story/congress-scrambles-to-finalize-coronavirus-funding-surveillance-deals-wRtFb7"
      //       },
      //       "57": {
      //         "newsid": "gUcXGm",
      //         "title": "US schools are in a 'state of alert' amid coronavirus outbreak. Are they overreacting &mdash; or not doing enough?",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/us-schools-are-in-a-state-of-alert-amid-coronavirus-outbreak-are-they-overreacting-or-not-doing-enough-gUcXGm.jpg",
      //         "time": "3 March 2020 11:24",
      //         "url": "https://thevirustracker.com/story/us-schools-are-in-a-state-of-alert-amid-coronavirus-outbreak-are-they-overreacting-or-not-doing-enough-gUcXGm"
      //       },
      //       "58": {
      //         "newsid": "IoLL9B",
      //         "title": "Is Fiscal Stimulus the Answer to Preventing a Coronavirus Recession?",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/is-fiscal-stimulus-the-answer-to-preventing-a-coronavirus-recession-IoLL9B.jpg",
      //         "time": "3 March 2020 11:24",
      //         "url": "https://thevirustracker.com/story/is-fiscal-stimulus-the-answer-to-preventing-a-coronavirus-recession-IoLL9B"
      //       },
      //       "59": {
      //         "newsid": "WRHRQL",
      //         "title": "You should prepare for the coronavirus &mdash; but don&rsquo;t buy more than you need",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/you-should-prepare-for-the-coronavirus-but-don-t-buy-more-than-you-need-WRHRQL.jpg",
      //         "time": "3 March 2020 12:36",
      //         "url": "https://thevirustracker.com/story/you-should-prepare-for-the-coronavirus-but-don-t-buy-more-than-you-need-WRHRQL"
      //       },
      //       "60": {
      //         "newsid": "8l0FIk",
      //         "title": "Feds strive to speed up coronavirus testing after CDC's slow start: 'The opportunity was missed'",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/feds-strive-to-speed-up-coronavirus-testing-after-cdc-s-slow-start-the-opportunity-was-missed-8l0FIk.jpg",
      //         "time": "3 March 2020 12:36",
      //         "url": "https://thevirustracker.com/story/feds-strive-to-speed-up-coronavirus-testing-after-cdc-s-slow-start-the-opportunity-was-missed-8l0FIk"
      //       },
      //       "61": {
      //         "newsid": "l4j3B9",
      //         "title": "I work at the airport in the eye of the coronavirus without health insurance.",
      //         "image": "https://thevirustracker.com/news-images/thumbs/5/i-work-at-the-airport-in-the-eye-of-the-coronavirus-without-health-insurance-l4j3B9.jpg",
      //         "time": "3 March 2020 12:36",
      //         "url": "https://thevirustracker.com/story/i-work-at-the-airport-in-the-eye-of-the-coronavirus-without-health-insurance-l4j3B9"
      //       },
      //       "stat": "ok"
      //     }
      //   ]
      // }
    };
  },
  methods: {
    getData() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://thevirustracker.com/free-api?global=stats"
        )
        .then(res => {
          console.log(res.data);
          // localStorage.setItem(this.code, JSON.stringify(res.data));

          // localStorage.setItem("date", JSON.stringify(this.getDate()));

          // //this.initLocation(res.data[res.data.length-1])
          // let dataIn = JSON.parse(localStorage.getItem("data"))
          // this.initLocation(dataIn[dataIn.length-1])
        });
    },
    getLiveData() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://thevirustracker.com/free-api?countryTotal=${this.code}`
        )
        .then(res => {
          this.countryInfo = res.data;
        });
    }
  },
  created() {
    this.getLiveData();
  }
};
</script>
<style>
div > span {
  font-size: 40px;
}
.country p {
  margin: 0px;
}
</style>

