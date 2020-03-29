<template>
  <div class="regions">
    <div v-if="getData">
      <p
        v-if="getData[getCountryName].regions.length != 0"
      >Map of {{ countryName }} with the {{ getData[getCountryName].regions.length }} regions infaction infaction.</p>
      <p v-else>No info about {{ countryName }} regions.</p>
    </div>

    <div v-if="isMap && getData[getCountryName].regions.length != 0" ref="map" style="height: 50vh"></div>
    <RegionRanking
      v-if="!isMap && getData[getCountryName].regions.length != 0"
      :data="regionsData"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import RegionRanking from "../components/RegionRanking";
export default {
  name: "CountryRegions",
  props: ["countryName"],
  components: {
    RegionRanking
  },
  data() {
    return {
      map: null,
      isMap: true,
      tileLayer: null
    };
  },
  computed: {
    ...mapGetters(["countryCode", "readData"]),
    getData() {
      console.log("IN computed", this.readData, this.map);

      setTimeout(() => {
        this.initLocation(this.readData);
      }, 400);

      return this.readData;
    },
    getCountryName() {
      return this.countryName == "USA"
        ? this.countryName.slice(0, 2)
        : this.countryName;
    },
    regionsData() {
      return this.getData[this.getCountryName].regions.filter(region =>
        region.hasOwnProperty("today_confirmed")
      );
    }
  },
  methods: {
    getDate() {
      var d = new Date();

      var date = d.getUTCDate() - 1;
      var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
      var year = d.getUTCFullYear();

      //var dateStr = date + "/" + month + "/" + year;
      var dateStr =
        year + "-" + (month < 10 ? "0" + month : month) + "-" + date;

      return dateStr;
    },
    initMap() {
      let geoCountry = this.countryCode.find(countryLook => {
        return (
          countryLook.alpha3 == this.countryName ||
          countryLook.country == this.countryName ||
          countryLook.alpha2 == this.countryName ||
          countryLook.country.includes(this.countryName)
        );
      });
      console.log(geoCountry);

      let lat = geoCountry.latitude;
      let long = geoCountry.longitude;
      this.map = L.map(this.$refs.map).setView([lat, long], 5);
      this.tileLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 13,
          attribution:
            '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      );
      this.tileLayer.addTo(this.map);
    },

    initLocation(today) {
      //this.map.locate({setView: true, maxZoom: 17});

      //Leaflet.markercluster
      let markers = L.markerClusterGroup();
      var countries = new L.LayerGroup();

      let icon = L.divIcon({
        className: "icon"
      });
      // Quick test with 5k markers:
      console.log(today);
      let nameOfCountry =
        this.countryName == "USA"
          ? this.countryName.slice(0, 2)
          : this.countryName;
      console.log(nameOfCountry);
      let countryRegionData = today[nameOfCountry].regions;

      countryRegionData.some((region, i) => {
        if (!this.isMap) return true;

        let regionName = region.name.includes("C.")
          ? "Comunidad " + region.name.slice(2)
          : region.name;
        if (region.today_confirmed != 0) {
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search/${regionName}?format=json`
            )
            .then(res => {
              let lat = res.data[0].lat;
              let long = res.data[0].lon;
              console.log(lat, long);

              //     let marker = L.marker([

              //   lat,long
              //     ], {

              // icon:icon

              //     }) /*.addTo(this.map)*/ ; // <= do not add individual `marker` to map!
              var myIcon = L.divIcon({
                className: "custom-div-icon",
                // html: `<div style='background-color:#4838cc;' class='marker-pin'></div> `,
                html: `<div style='background-color:#4838cc;' class='marker-pin'></div>`,

                iconSize: [30, 42],
                iconAnchor: [15, 42],
                popupAnchor: [-3, -76],
                // shadowUrl: 'my-icon-shadow.png',
                shadowSize: [68, 95],
                shadowAnchor: [22, 94]
              });
              var marker = L.marker(new L.LatLng(lat, long), {
                title: regionName,
                icon: myIcon
              });
              //	marker.bindPopup( country.countrylabel + "</a><br>" + country.totalcases+"<br>"+today.date);
              // marker.bindPopup(`
              //  <a
              //     href="/region/${regionName}"
              //     target="_self"
              //     onclick="event.preventDefault(); ${router.push(`'/region/${regionName}'`)};"
              //   >${regionName }</a>

              // <br>${region.today_confirmed}<br>${this.getDate()}` );

              marker.bindPopup(`
              <h4>${regionName}</h4>
              <h6>№ Cases</h6>
              <p>🤒 🦠 ${
                region.today_confirmed ? region.today_confirmed : "No info!"
              }</p>
               <h6>№ Deaths</h6>
              <p>😓 ${
                region.today_deaths ? region.today_deaths : "No info!"
              }</p>
               
            `);
              // <a
              //   href="/region/${regionName}"
              //   target="_self"
              //   onclick="event.preventDefault(); Vue.router.push('/region/${regionName}');"
              // >More info</a>
              countries.addLayer(marker);
              //markers.addLayer(marker);
              // <= but only to MCG)
            })
            .catch(e => (this.isMap = false));
        }
      });

      this.map.addLayer(countries);
    },
    testMapAPI() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search/${this.countryName}?format=json`
        )
        .catch(e => (this.isMap = false));
    }
  },
  mounted() {
    this.testMapAPI();
  },
  created() {
    setTimeout(() => {
      this.initMap();
    }, 200);
  }
};
</script>

<style>
.regions .marker-pin {
  width: 20px;
  height: 20px;
  border-radius: 50% 50% 50% 0;
  background: #c30b82;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}

.regions .marker-pin::after {
  display: none;
}

.custom-div-icon i {
  position: absolute;
  width: 22px;
  font-size: 22px;
  left: 0;
  right: 0;
  margin: 10px auto;
  text-align: center;
}

.custom-div-icon i.awesome {
  margin: 12px auto;
  font-size: 17px;
}
</style>
