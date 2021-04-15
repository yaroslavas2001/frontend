<template>
  <page name="Карта" noApi noFilter noPagination class="map">
    <template #title></template>
    <template #content>
      <div class="row">
        <div class="col">
          <!-- <h1>{{ user }}</h1> -->
          <ui-map-leaflet
            :markers="markers"
            :height="700"
            @markerClick="onMarkerClick"
            @dragend="onDragEnd"
            @getCoord="onGetCoord"
          >
            <template #infowindow="data" :data-id="data.item.Id">
              <div class="infowindow" v-if="data.item">
                <!-- <ui-image-preview
                    :required="true"
                    :aspectRatio=400/400
                    :elHight=200
                    ref="crop"
                    v-model="imgCrop"
                  ></ui-image-preview> -->
                <div class="code py-2">
                  <strong>{{ data.item.Name }}</strong>
                </div>
                <!-- <div class="code py-2">
                  Адрес:<strong>{{ data.item.Address }}</strong>
                </div> -->
                <!-- <ui-button
                  @onClick="click(data.item)"
                  v-if="data.item.Draggable"
                  class="btn-save-coords green"
                >
                  set
                </ui-button>
                <ui-button
                  @onClick="click(data.item)"
                  v-else
                  class="btn-change-coords"
                >
                  change
                </ui-button> -->
              </div>
            </template>
          </ui-map-leaflet>
        </div>
      </div>
    </template>
  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Page from "@views/components/page.vue";
import api from "@/api";
import UiMapOpenLayers from "@/views/components/ui/maps/ui-map-open-layers.vue";
import UiMapLeaflet from "@/views/components/ui/maps/ui-map-leaflet.vue";
import { inject } from "vue";
import Position from "./components/ui-maps/position";
import MarkerModel from "./components/ui/maps/models/markerModel";
import UiImagePreview from "@views/components/ui-crop-image/ui-image-preview.vue";
import { Draggable } from "leaflet";
// import UiScroll from "@views/components/ui-scroll.vue";
// import UiNotification from "../plugins/notification/ui-notification.vue";

// class MarkersModel {
//   Id: number;
//   Position: Position;
//   Icon: String;
//   draggable: boolean = false;
//   public constructor(id: number, position: Position, icon: string) {
//     this.Id = id;
//     this.Position = position;
//     this.Icon = icon;
//   }
// }
@Options({
  components: { Page, UiMapOpenLayers, UiMapLeaflet, UiImagePreview },
})
export default class Map extends Vue {
  mini_Success = require("@assets/img/map/mini_Success.svg");
  cash_Success = require("@assets/img/map/cash_Success.svg");
  user = inject("user");
  markers: MarkerModel[] = [];
  created() {}
  mounted() {
    // (this as any).$notification.error("ddd");
    this.getMarkers();
  }

  async getMarkers() {
    const res = await api.getInstance().StoreService.getStoresAsync({
      CityIds: [],
      Filter: {
        Pagination: { Skip: 0, Take: 10000 },
        Search: null,
        Sort: null,
      },
    });
    let tmp = [];
    res.Items.forEach((element, idx) => {
      tmp.push(
        new MarkerModel(
          idx,
          { lng: element.Longitude, lat: element.Latitude },
          this.cash_Success,
          false,
          0,
          element.Name,
          element.Address
        )
      );
    });

    this.markers = tmp;
  }

  onMarkerClick(marker: MarkerModel) {
    console.log(`marker`, marker);
  }
  click(item: MarkerModel) {
    let findeItem = this.markers.find((el) => el.Id == item.Id);

    findeItem.Draggable = !findeItem.Draggable;
  }
}
</script>
<style lang="less">
.map {
  // max-width: 600px;
  height: max-content;
  padding-bottom: 5px;
  .btn-save {
    .ui-button {
      max-width: 100px;
    }
  }
  .ui-button {
    &.green {
      background-color: green;
    }
    &.blue {
      background-color: #1791fa;
    }
  }
  .infowindow {
    padding: 8px;
    max-height: 400px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
