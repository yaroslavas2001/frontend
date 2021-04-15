<template>
  <div class="ui-map-leaflet">
    <div ref="infoWindow" class="info-window">
      <slot name="infowindow" :item="currentItem"></slot>
    </div>
    <div id="map" ref="map1" :style="getStyle()"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import L, { gridLayer, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerModel from "../maps/models/markerModel";
import { Emit } from "vue-property-decorator";
interface IMarkerData {
  id: number;
  marker: L.Marker;
}
@Options<UiMapLeaflet>({
  props: {
    center: { default: new LatLng(0, 0), type: LatLng },
    zoom: { default: 14, type: Number },
    markers: { default: [], type: Array<MarkerModel>() },
    height: { default: 400, type: Number },
  },
  emits: [""],
  watch: {
    markers: {
      deep: true,
      handler(value) {
        this.getMarkers(value);
      },
    },
  },
})
export default class UiMapLeaflet extends Vue {
  readonly markers: MarkerModel[] = [];
  readonly height: number = 400;
  readonly center = new LatLng(0, 0);
  readonly autoZoom: boolean = true;
  mymap: L.Map = null;
  markerGroup0: L.LayerGroup = new L.LayerGroup();
  markerGroup1: L.LayerGroup = new L.LayerGroup();
  tileLayer = null;
  layers = [
    {
      id: 0,
      name: "Restaurants",
      active: false,
      features: [],
    },
  ];
  myIcon = L.icon({
    iconUrl: require("@assets/img/map/icon.png"),
    iconSize: [30, 50],
  });
  popup = L.popup();
  name = "OOO tirscript";
  currentItem = null;
  mounted() {
    // this.initMap();
    if (this.markers.length) {
      this.getMarkers(this.markers);
    }
  }
  getStyle(): Object {
    return { height: this.height + "px" };
  }
  initMap() {
    this.mymap = L.map("map", {
      zoomControl: true,
      zoom: 18,
      minZoom: 7,
      maxZoom: 22,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      layers: [this.markerGroup0, this.markerGroup1],
    }).setView(this.getCenter(), 11);
    this.tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 22,
        maxNativeZoom: 19,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        id: "mapbox/streets-v11",
      }
    ).addTo(this.mymap);
    this.mymap.on("click", this.onMapClick);
  }
  getMarkers(value: MarkerModel[]) {
    this.markerGroup0 = new L.LayerGroup();
    this.markerGroup1 = new L.LayerGroup();
    value.forEach((element) => {
      const marker = L.marker([element.Position.lat, element.Position.lng], {
        Id: element.Id,
        draggable: element.Draggable,
        type: element.Type,
        name: element.Name,
        address: element.Address,
        icon: element.Icon
          ? L.icon({
              iconUrl: element.Icon.toString(),
              iconSize: [20, 30],
            })
          : this.myIcon,
      } as any);

      marker
        .bindPopup((this.$refs as any).infoWindow, { maxHeight: 500 })
        .on("click", this.onMapClick);
      if (element.Type == 0) {
        marker.addTo(this.markerGroup0);
      }
      if (element.Type == 1) {
        marker.addTo(this.markerGroup1);
      }
    });
    console.log(`this.markerGroup0`, this.markerGroup0);
    console.log(`this.markerGroup1`, this.markerGroup1);

    if (!this.mymap) {
      this.initMap();
    }
    //убрать с карты
    this.mymap.removeLayer(this.markerGroup1);
    //поставить на карту
    this.markerGroup1.addTo(this.mymap);
    //если включен autoZoom
    // console.log(`this.markers`, this.markers);
    if (this.autoZoom) {
      this.setAutoZoom();
    }

    /*
    var m = new L.Marker(...);
    m._myId = 12345;
    Then grab that out in the callback:

    map.on('popupopen', function (e) {
        alert(e.popup._source._myId);
    });
        **/
  }
  setAutoZoom() {
    let bounds = [];
    this.markers.forEach((el) => {
      if (el.Position.lat > 0 && el.Position.lng > 0) {
        bounds.push(new L.LatLng(el.Position.lat, el.Position.lng));
      }
    });
    this.mymap.fitBounds(bounds);
  }
  openInfoWindow(value: object) {}
  currentId = 0;
  onMapClick(e) {
    if (!e.sourceTarget.options.Id) {
      return;
    }
    const id = e.sourceTarget.options.Id;
    this.currentItem = this.markers.find((item) => item.Id == id);

    // this.openInfoWindow(currentMarker);
    console.log(e.sourceTarget.options);
    // this.popup
    //   .setLatLng(e.latlng)
    //   .setContent((this.$refs as any).infoWindow)
    //   .openOn(this.mymap);

    // console.log(`value onMapClick`, e);
    // console.log(
    //   "e.sourceTarget._popup._source._pointId:",
    //   e.sourceTarget._popup._source._pointId
    // );
    // alert("You clicked on marker with customId: " + this.options.myCustomId);
    this.$emit("markerClick", e.sourceTarget);
  }
  getCenter(): { lat: number; lng: number } {
    let lat = 0;
    let lng = 0;
    const length = this.markers.length > 0 ? this.markers.length : 1;
    this.markers.forEach((el) => {
      lat += el.Position.lat;
      lng += el.Position.lng;
    });
    return { lat: lat / length, lng: lng / length };
  }
  getId(point: any): number {
    return 1;
  }
}
</script>

<style lang="less">
.ui-map-leaflet {
  #map {
    // height: 400px;
    position: relative;
    overflow: hidden;
  }
  .leaflet-popup-content {
    min-width: 400px;
  }
}
</style>
