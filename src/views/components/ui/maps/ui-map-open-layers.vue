<template>
  <div class="ui-ol-map">
    <div id="mapol" ref="mapol"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ol from "ol";
import View from "ol/View";
// import BaseLayer from "ol/layer/Base";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import Feature from "ol/Feature";
import Coordinate from "ol/coordinate";
import Projection from "ol/proj/Projection";
// import TileLayer from "ol/";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import Point from "ol/geom/Point";
import Vector from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
@Options<UiOlMap>({
  props: {
    zoom: { default: 14, type: Number },
    markers: { default: [], type: Array<Object>() },
    height: { default: 400, type: Number },
  },
  emits: [""],
  watch: {
    markers(value) {
      this.getMarcers(value);
    },
  },
})
export default class UiOlMap extends Vue {
  map: ol.Map = null;

  mounted() {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });
    this.map = new Map({
      // the map will be created using the 'map-root' ref
      target: this.$refs.mapol as HTMLElement,
      layers: [tileLayer],

      // the map view will initially show the whole world
      // view: new View({
      //   zoom: 0,
      //   center: [0, 0],
      //   constrainResolution: true,
      // }),
      view: new View({
        // center: [46.8537933, 29.5448201],
        zoom: 4,
      }),
    });
    // var marker = new ol.Feature(new Point([106.8478695, -6.1568562]));
    var layer = new VectorLayer({
      source: new Vector({
        features: [
          new Feature({
            geometry: new Point([46.8537933, 29.5448201]),
          }),
          new Feature({
            geometry: new Point([46.848973, 29.589366]),
          }),
        ],
      }),
    });
    // layer.getSource().addFeature(marker);
    this.map.addLayer(layer);

    // const lonLat = new Map.LonLat(-0.1279688, 51.5077286).transform(
    //   new Map.Projection("EPSG:4326"), // transform from WGS 1984
    //   this.map.getProjectionObject() // to Spherical Mercator Projection
    // );

    // const zoom = 16;

    // const markers = new Map.Layer.Markers("Markers");
    // this.map.addLayer(markers);

    // markers.addMarker(new Map.Marker(lonLat));

    // this.map.setCenter(lonLat, zoom);
    //   for (var i = 0; i < 10; i++) {
    //                   var element = document.createElement('div');
    //                   element.innerHTML = '<img src="https://cdn.mapmarker.io/api/v1/fa/stack?size=50&color=DC4C3F&icon=fa-microchip&hoffset=1" />';
    //                   var marker = new ol.Overlay({
    //                       position: [i, i],
    //                       positioning: 'center-center',
    //                       element: element,
    //                       stopEvent: false
    //                   });
    //                   tmap.addOverlay(marker);
  }
  getMarcers(value: any[]) {
    {
      console.log(`value`, value);
    }
  }
}
</script>

<style lang="less">
.ui-ol-map {
  #mapol {
    width: 100%;
    height: 400px;
  }
}
</style>