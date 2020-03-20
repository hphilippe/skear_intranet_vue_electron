<template>
  <div>
    <el-collapse style="border:none;" :click="saveStateAccordeon()" v-model="activeName" class="colapse-bricole">
      <el-collapse-item name="1" style="margin: 0 33px 0 33px;">
        <template slot="title" style="border:none;">
          <i class="el-icon-setting"></i> Réglages
        </template>
        <div class="row">
          <div class="col-7" style="margin: auto;">
            <el-switch
              style="height: 22px;"
              v-model="stateRecord"
              v-on:change="runFunction()"
              active-text="Activer la récupération des données"
              inactive-text="Désactiver la récupération des données">
            </el-switch>
          </div>
          <div class="col-5">
            Interval de rafraichisement des donées : <el-input style="width: 65px;" v-model="timer"></el-input> s
          </div>
        </div>
      </el-collapse-item>
      <div class="row">
        <div class="col-6">
          <el-collapse-item name="4" style="margin: 0 33px 0 33px;">
            <template slot="title" style="border:none;">
              <i class="fa fa-windows"></i> Système OS
            </template>
            <div class="row">
              <div class="col-12">
                <span>Système d'exploitation: {{arch}}</span></br>
                <span>Type: {{typesystem}}</span></br>
                <span>platform: {{platform}}</span></br>
                <span>username: {{userinfo.username}}</span>
              </div>
            </div>
          </el-collapse-item>
        </div>
        <div class="col-6">
          <el-collapse-item name="3" style="margin: 0 33px 0 33px;">
            <template slot="title" style="border:none;">
              <i class="fa fa-spinner"></i> CPU
            </template>
            <div class="row">
              <div class="col-12">
                <span>model: {{cpu[0].model}}</span> <span>( vitesse: {{(cpu[0].speed/1000).toFixed(2)}} GHz)</span>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </div>
      <el-collapse-item name="2" style="margin: 0 33px 0 33px;">
        <template slot="title" style="border:none;">
          <i class="fa fa-wifi"></i> Réseaux
        </template>
        <div class="row">
          <div v-for="(headetwork,index) in network" :class="'col-'+12/Object.keys(network).length">
            <div class="row">
              <div class="col-12">
                {{index}}
              </div>
              <div class="col-12">
                <div v-for="itemnetwork in headetwork">
                  </br>
                  <div v-for="(item,itemindex) in itemnetwork">
                    <span>{{itemindex}} : {{item}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5" style="margin: 0 33px 0 33px;">
        <template slot="title" style="border:none;">
          <i class="fa fa-window-restore"></i> Ram
        </template>
        <div class="row">
          <div class="col-6">
            <p> Ram libre non utilisé : {{freememory.toFixed(0)}} Mo</p>
            <p> Ram Total sur le pc : {{totalmemory.toFixed(0)}} Mo</p>
          </div>
          <div class="col-6">
            <div style="display:inline-block; text-align:center; margin:0 5px;" class="">
              <p>% de Ram libre</p>
              <el-progress type="circle" :percentage="percetangeRam"></el-progress>
            </div>
            <div style="display:inline-block; text-align:center; margin:0 5px;" class="">
              <p>% de Ram utilisé</p>
              <el-progress type="circle" :percentage="(100-percetangeRam)"></el-progress>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <!-- <el-collapse-item name="6" style="margin: 0 33px 0 33px;">
        <template slot="title" style="border:none;">
          <i class="fa fa-hdd-o"></i> Disque Dur
        </template>
        <div class="row">

        </div>
      </el-collapse-item> -->
    </el-collapse>


  </div>
</template>

<script>
var os = require("os");
const electron = require('electron')
// const app = electron.app
// const dialog = electron.dialog
// const globalShortcut = electron.globalShortcut
// const globalShortcut = require('electron')
// import { globalShortcut } from 'electron'

export default {
  data () {
    return {
      activeName: [],
      network : [],
      cpu : [],
      arch : [],
      freememory : [],
      totalmemory : [],
      typesystem : [],
      platform : [],
      userinfo: [],
      percetangeRam : 0,
      timer : 1,
      intervalfunct : null,
      stateRecord : false,
    }
  },
  methods: {
    runFunction(){
      var self = this;
      if(this.stateRecord == false){
        clearInterval(self.intervalfunct);
      } else {
        self.intervalfunct = setInterval(function(){
            self.freemem = os.freemem()/1048576;
            self.totalmem = os.totalmem()/1048576;
            self.percetangeRam = parseFloat(((self.freemem/self.totalmem)*100).toFixed(2));
            self.freememory = os.freemem()/1048576;
          },self.timer*1000);
      }
    },
    // setintervalfunction(){
    //   var self = this;
    //   return setInterval(function(){
    //     self.freemem = os.freemem()/1048576;
    //     self.totalmem = os.totalmem()/1048576;
    //     self.percetangeRam = parseFloat(((self.freemem/self.totalmem)*100).toFixed(2));
    //     console.log(self.percetangeRam);
    //     console.log(self.timer*1000);
    //   },self.timer*1000);
    // },

    // stoprecord(){
    //   clearInterval(this.t);
    // },
    // setShows: function () {
    //   var self = this;
    //   clearTimeout(self.timer);
    //   self.timer = setTimeout(function () {
    //     self.loading = true;
    //     self.getMulti();
    //   }, 500)
    // },
    saveStateAccordeon(){
      var state = false;
      var self = this;
      localStorage.setItem('activeAccordeonSysteme', self.activeName);
    },
  },

  // app.on('ready', function () {
  //   globalShortcut.register('CommandOrControl+Alt+K', function () {
  //     dialog.showMessageBox({
  //       type: 'info',
  //       message: 'Success!',
  //       detail: 'You pressed the registered global shortcut keybinding.',
  //       buttons: ['OK']
  //     })
  //   })
  // })



  created (){
    this.network = os.networkInterfaces();
    this.cpu = os.cpus();
    this.arch = os.arch();
    this.freememory = os.freemem()/1048576;
    this.totalmemory = os.totalmem()/1048576;
    this.typesystem = os.type();
    this.platform = os.platform();
    this.userinfo = os.userInfo();
    // save state onglet
    this.activeName = localStorage.getItem('activeAccordeonSysteme').split(",");
    // ram %
    this.percetangeRam = parseFloat(((this.freememory/this.totalmemory)*100).toFixed(2));
    // console.log(electron);
    // console.log(window.localStorage);
    // globalShortcut.register('CommandOrControl+X', () => {
    //   console.log('CommandOrControl+X is pressed')
    // })
    this.runFunction();
    // var t=setInterval(this.runFunction,2000);

  }
}
</script>

<style>
.colapse-bricole .el-collapse-item__header{
  border: none;
}
.colapse-bricole .el-collapse-item__wrap {
  border: none;
}
.colapse-bricole .el-collapse-item__content{
  padding-bottom: 0px;
}
</style>
