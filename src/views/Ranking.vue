<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Country"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>
    <v-data-table
      :disable-pagination="true"
      :headers="headers"
      :items="countries"
      :sort-by="['today_confirmed']"
      :sort-desc="[true]"
      :search="search"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="`/country/${getFlag(item.name).toUpperCase()}`">
          <v-icon v-if="imgError == getFlag(item.name)">mdi-eye-off</v-icon>
          <img
            v-else
            :src="
              `https://www.countryflags.io/${getFlag(item.name)}/flat/32.png`
            "
            @error="onImgError(getFlag(item.name))"
          />
          <span>{{ item.name }}</span>
        </router-link>
      </template>
      <template v-slot:item.today_confirmed="{ item }">
        <span>{{ item.today_confirmed != "" ? item.today_confirmed : 0 }}</span>
      </template>
      <template v-slot:item.today_recovered="{ item }">
        <span>{{ item.today_recovered != "" ? item.today_recovered : 0 }}</span>
      </template>
      <template v-slot:item.today_deaths="{ item }">
        <span>{{ item.today_deaths != "" ? item.today_deaths : 0 }}</span>
      </template>

      <template v-slot:item.percent="{ item }">
        <span>
          {{
          item.today_deaths != "" && item.today_confirmed != ""
          ? ((item.today_deaths / item.today_confirmed) * 100).toFixed(2)
          : "0"
          }}
          %
        </span>
      </template>
      <template>
        <span>h</span>
      </template>
    </v-data-table>
    <!-- <v-btn
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
    </v-btn>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fab: false,
      search: "",
      imgError: null,
      headers: [
        {
          text: "Country",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Confirmed", value: "today_confirmed" },
        { text: "Recovered", value: "today_recovered" },
        { text: "Deaths", value: "today_deaths" },
        { text: "%Deaths", value: "percent" }
      ]
      //countries: JSON.parse(localStorage.getItem("data")).data.splice(0, 179)
    };
  },
  methods: {
    onImgError(code) {
      console.log("In error");

      this.imgError = code;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    getDate() {
      var d = new Date();

      var date = d.getUTCDate();
      var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
      var year = d.getUTCFullYear();

      //var dateStr = date + "/" + month + "/" + year;
      var dateStr =
        year + "-" + (month < 10 ? "0" + month : month) + "-" + date;

      return dateStr;
    },
    getFlag(name) {
      let geoCountry = this.countryCode.find(
        countryLook =>
          countryLook.country == name ||
          countryLook.alpha2 == name ||
          countryLook.country.includes(name)
      );

      return geoCountry ? geoCountry.alpha2.toLowerCase() : "";
    }
  },
  computed: {
    ...mapGetters(["countryCode", "readData"]),
    countries() {
      let countriesArray = [];
      if (this.readData) {
        let countriesToLoop = this.readData;
        for (let country in countriesToLoop) {
          countriesArray.push(countriesToLoop[country]);
        }
      }

      return countriesArray;
    }
  }
};
</script>

<style>
img,
span {
  vertical-align: middle;
}
.v-data-footer {
  display: none;
}
td > span {
  width: 100%;
  display: inline-block;
  text-align: center;
}
td:nth-child(2n) .v-data-table__mobile-row__cell {
  background-color: #527397;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}

td.text-start:nth-child(2) > span {
  background-color: #527397;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
td:nth-child(3n) .v-data-table__mobile-row__cell {
  background-color: #91c439;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
td.text-start:nth-child(3) > span {
  background-color: #91c439;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
td:nth-child(4n) .v-data-table__mobile-row__cell {
  background-color: #ce4b44;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
td.text-start:nth-child(4) > span {
  background-color: #ce4b44;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}

td:last-child .v-data-table__mobile-row__cell {
  border-radius: 5px;
  border: 1px solid #ce4b44;
  color: #ce4b44;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
td.text-start:last-child > span {
  border-radius: 5px;
  border: 1px solid #ce4b44;
  color: #ce4b44;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
}
div .v-btn--fixed.v-btn--bottom {
  bottom: 75px;
}
</style>
