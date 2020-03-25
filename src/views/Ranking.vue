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
      :sort-by="['totalcases']"
      :sort-desc="[ true]"
      :search="search"
    >
      <template v-slot:item.countrylabel="{item}">
        <router-link :to="`/country/${item.countrycode.toLowerCase()}`">
          <v-icon v-if="imgError == item.countrycode">mdi-eye-off</v-icon>
          <img
            v-else
            :src="`https://www.countryflags.io/${item.countrycode.toLowerCase()}/flat/32.png`"
            @error="onImgError(item.countrycode)"
          />
          <span>{{item.countrylabel}}</span>
        </router-link>
      </template>
      <template v-slot:item.totalcases="{item}">
        <span>{{item.totalcases != '' ? item.totalcases : 0}}</span>
      </template>
      <template v-slot:item.totalrecovered="{item}">
        <span>{{item.totalrecovered != '' ? item.totalrecovered : 0}}</span>
      </template>
      <template v-slot:item.totaldeaths="{item}">
        <span>{{item.totaldeaths != '' ? item.totaldeaths : 0}}</span>
      </template>

      <template v-slot:item.percent="{item}">
        <span>{{item.totaldeaths!='' && item.totalcases != '' ?((item.totaldeaths / item.totalcases) * 100).toFixed(2): '0'}} %</span>
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
          value: "countrylabel"
        },
        { text: "Confirmed", value: "totalcases" },
        { text: "Recovered", value: "totalrecovered" },
        { text: "Deaths", value: "totaldeaths" },
        { text: "%Deaths", value: "percent" }
      ],
      countries: JSON.parse(localStorage.getItem("data")).data.splice(0, 179)
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