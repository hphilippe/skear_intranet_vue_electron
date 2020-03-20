<template>
  <div class="world-map">
    <v-map ref="map" :zoom="zoom" :center="center" style="position: fixed; z-index: -1; top: 51px;">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.position" :visible="item.visible" :draggable="item.draggable" v-on:l-move="markerMoved($event, item)" :icon="item.icon">
        <v-popup :content="item.tooltip"></v-popup>
        <v-tooltip :content="item.tooltip"></v-tooltip>
      </v-marker>
    </v-map>
    <div class="setting-map">
      <el-button v-on:click="setboxmap" style="padding: 7px 7px;" type="primary" icon="el-icon-share"></el-button>
    </div>
    <div id="box-map" class="">
      <h3>Gestion des marqueurs</h3>
      <!--<button name="button" v-on:click="addMarker">Add a marker</button></br>-->
      <table>
        <tr>
          <th>Nom (Tooltip)</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Is Draggable ?</th>
          <th>Is Visible ?</th>
          <th>Remove</th>
        </tr>

        <tr v-for="(item, index) in markers">
          <td><input v-model="item.tooltip" type="text"></td>
          <td><input v-model.number="item.position.lat" type="number"></td>
          <td><input v-model.number="item.position.lng" type="number"></td>
          <td style="text-align: center"><input v-model="item.draggable" type="checkbox"></td>
          <td style="text-align: center"><input v-model="item.visible" type="checkbox"></td>
          <td style="text-align: center"><input v-on:click="removeMarker(index)" type="button" value='X'></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet';
/*img*/
import leafshadow from '../../assets/leaf-shadow.png';
import leafgreen from '../../assets/leaf-green.png';
import leafred from '../../assets/leaf-red.png';
import leaforange from '../../assets/leaf-orange.png';

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl:    leafshadow,
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafIcon({iconUrl: leafgreen}),
    redIcon = new LeafIcon({iconUrl: leafred}),
    orangeIcon = new LeafIcon({iconUrl: leaforange});

    L.icon = function (options) {
        return new L.Icon(options);
    };

export default {
  name: 'world',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-tooltip': Vue2Leaflet.Tooltip,
    'v-popup': Vue2Leaflet.Popup
  },

  data () {
    return {
      zoom:12,
      center: L.latLng(45.493209, 4.341746),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers:[{ id: "1", position : {lat:45.443067, lng:4.419000},icon: greenIcon, tooltip: "Burger King Mageule", draggable: true, visible: true},{ id: "2", position : {lat:36.2383, lng:-121.8150},icon: orangeIcon, tooltip: "Pfeiffer beach keyhole, Big Sur, California", draggable: true, visible: true}],
      markclick: '',
      marktitle: '',
      markicon: ''
    }
  },

  methods: {
    onMapClick(e) {
      const s = `<div style="text-align:center;" >
        <input class="inputname" type="text" name="" value="" placeholder="nom du marqueur"><br>
        <button class="myBtn"><i class="fa fa-map-marker fa-lg"></i> Skear</button>
        <button class="myBtn2"><i class="fa fa-map-marker fa-lg"></i> Perso</button>
        <button class="myBtn3"><i class="fa fa-map-marker fa-lg"></i> A visiter</button>
      </div>`

			// create html element from string, set inner element
      let div = document.createElement('div')
      div.innerHTML = s
      // query html element for our button
      this.btn = div.querySelector('.myBtn') // keep reference so we can remove events later
      this.btn2 = div.querySelector('.myBtn2')
      this.btn3 = div.querySelector('.myBtn3')

			//attach click event to button element
      this.btn.addEventListener('click', this.btnAction)
      this.btn2.addEventListener('click', this.btnAction2)
      this.btn3.addEventListener('click', this.btnAction3)
      // popup
      var popup = L.popup();
      // position du click
      var mymap = this.$refs.map.mapObject;

      popup
        .setLatLng(e.latlng)
        .setContent(div)
        //.setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
        this.markclick = e.latlng;
    },
    /*BTN*/
    btnAction() {
      var mymap = this.$refs.map.mapObject;
      this.marktitle = document.querySelector('.inputname').value;
      this.markicon = greenIcon;
      this.addMarker();
    },
    btnAction2() {
      var mymap = this.$refs.map.mapObject;
      this.marktitle = document.querySelector('.inputname').value;
      this.markicon = redIcon;
      this.addMarker();
    },
    btnAction3() {
      var mymap = this.$refs.map.mapObject;
      this.marktitle = document.querySelector('.inputname').value;
      this.markicon = orangeIcon;
      this.addMarker();
    },

    /*mark*/
    addMarker: function(event) {
      var newMarker = { position: {lat:this.markclick.lat, lng:this.markclick.lng}, icon: this.markicon, tooltip: this.marktitle, draggable: true, visible: true};
      this.markers.push(newMarker);
      console.log(this.markers);
      //localStorage.setItem('markers', JSON.stringify(this.markers));
      console.log(localStorage);
    },
    removeMarker: function(index) {
      this.markers.splice(index, 1);
      console.log(this.markers);
      //localStorage.setItem('markers', JSON.stringify(this.markers));
      console.log(localStorage);
    },
    markerMoved: function(event, item) {
      Vue.set(item, 'position', event.latlng);
      console.log(this.markers);
      //localStorage.setItem('markers', JSON.stringify(this.markers));
      console.log(localStorage);
    },

    /*setboxmap*/
    setboxmap() {
      var className = document.querySelector('.box-hidden')
      if(className !== null){
        document.getElementById('box-map').classList.remove("box-hidden");
      } else {
        document.getElementById('box-map').classList.add("box-hidden");
      }
    }
  },
  mounted: function(){
    // position du click
    var mymap = this.$refs.map.mapObject;
    mymap.on('click', this.onMapClick);
  },
  destroyed() {
  	// clean up
    this.btn.removeEventListener('click', this.btnAction)
  },
  created(){
    // initiation de la sauvegarde des marqueurs
    // localStorage.setItem('markers', JSON.stringify([{position : {lat:45.443067, lng:4.419000},icon: greenIcon, tooltip: "Burger King Mageule", draggable: true, visible: true}]));
    // localStorage.setItem('markers', '[{"position" : {"lat":45.443067, "lng":4.419000}, "icon": "greenIcon", "tooltip": "Burger King Mageule", "draggable": true, "visible": true}]');
    //console.log(JSON.stringify([{position : {lat:45.443067, lng:4.419000}, icon: greenIcon, tooltip: "Burger King Mageule", draggable: true, visible: true}]));
    // console.log(localStorage);
    // console.log(window.localStorage.getItem('markers'));
    // this.markers = JSON.parse(window.localStorage.getItem('markers'));
    // this.markers = JSON.parse(localStorage.getItem('markers'));
    // console.log(this.markers);
    // console.log(localStorage);
    // { id: "1", position : {lat:45.443067, lng:4.419000},icon: greenIcon, tooltip: "Burger King Mageule", draggable: true, visible: true}
  }
}

</script>

<style scoped>
/*.world-map{
  height: 100%;
  width: 100%;
  margin: 0;
}*/
/*@import "../../../../node_modules/leaflet/dist/leaflet.css";*/

#box-map{
  z-index: 1;
  height: 100px;
  border-radius: 20px;
  margin-top: 15px;
  margin-right: 15px;
  padding: 0px 15px 15px 15px;
  float: right;
  background: rgba(255, 255, 255, 0.85);
  height: 224px;
  overflow: scroll;
}
.box-map h3{
  margin: 0;
}
.box-hidden{
  display: none;
}
.setting-map{
  position: absolute;
  margin-top: 83px;
  margin-left: 13px;
}
.inputname{
  margin-bottom: 2px;
}

</style>
