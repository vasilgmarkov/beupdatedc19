<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Region"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>
    <v-data-table
      :disable-pagination="true"
      :headers="headers"
      :items="data"
      :sort-by="['today_confirmed']"
      :sort-desc="[true]"
      :search="search"
    >
      <template v-slot:item.name="{ item }">
        <!-- <router-link :to="`/country/${item.name}`"> -->
        <span class="region-name">{{ item.name }}</span>
        <!-- </router-link> -->
      </template>
      <template v-slot:item.today_confirmed="{ item }">
        <span>{{ item.today_confirmed != "" ? item.today_confirmed : 0 }}</span>
      </template>
      <template v-slot:item.today_recovered="{ item }">
        <span>{{ item.today_recovered != "" ? item.today_recovered : 0 }}</span>
      </template>
      <template v-slot:item.totaldeaths="{ item }">
        <span>{{ item.totaldeaths != "" ? item.totaldeaths : 0 }}</span>
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
export default {
  name: "RegionRanking",
  props: ["data"],
  data() {
    return {
      fab: false,
      search: "",
      imgError: null,
      headers: [
        {
          text: "Region",
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
  }
};
</script>

<style>
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
.region-name {
  font-weight: bold;
  font-size: 20px;
}
</style>