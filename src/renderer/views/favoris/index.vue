<template>
    <div>
      <div class="setting-favoris">
        <el-button v-on:click="setboxfavoris" style="padding: 7px 7px;" type="primary" icon="el-icon-share"></el-button>
      </div>
        <dnd-grid-container
            :layout.sync="layout"
            :gridSize="gridSize"
            :margin="margin"
            :bubbleUp="bubbleUp">
            <dnd-grid-box
                id="box-favoris"
                boxId="settings"
                dragSelector="div.card-header">
                <div class="card demo-box">
                    <div class="card-header">
                        Settings
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="settings-margin-input" class="col-sm-4 col-form-label">Margin</label>
                            <div class="col-sm-8">
                                <input class="form-control" type="number" v-model.number="margin" id="settings-margin-input">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="settings-grid-size-w-input" class="col-sm-4 col-form-label">Grid Size</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="number" v-model.number="gridSize.w" id="settings-grid-size-w-input">
                            </div>
                            <div class="col-sm-4">
                                <input class="form-control" type="number" v-model.number="gridSize.h">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="settings-bubble-up-input" class="col-sm-4 col-form-label">Bubble Up</label>
                            <div class="col-sm-8">
                                <input type="checkbox" v-model="bubbleUp" id="settings-bubble-up-input">
                            </div>
                        </div>
                        <div class="form-group row">
                          <div class="col-sm-7">
                            <input type="text" v-model="boxtitle" placeholder="Titre de la box" class="form-control">
                          </div>
                          <div class="col-sm-5">
                            <input type="text" v-model="boxtimer" placeholder="mm/dd/yy" class="form-control">
                          </div>
                          <div class="col-sm-12">
                            <textarea  type="text" v-model="boxcorp" placeholder='Contenue de la box (code HTML), Ex image:<a target="_blank" href="url"><img src="url" style="width:100%; height:100%"></a>, Ex iframe : <iframe width="100%" frameborder="0" height="100%" src="url"></iframe> ' class="form-control"></textarea>
                          </div>
                          <div class="col-sm-12">
                            <button class="btn btn-success" v-on:click="addBox">Ajouter une Box</button>
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col-sm-6">
                            <button class="btn btn-danger" v-on:click="suppBox">Supprimer la Box name</button>
                          </div>
                          <div class="col-sm-6">
                            <select v-model="selected" class="form-control">
                              <option v-for="box in contentbox" :key="box.id" :label="box.id" :value="box.id"></option>
                            </select>
                          </div>
                        </div>
                    </div>
                </div>
            </dnd-grid-box>
            <dnd-grid-box
                v-for="number in contentbox"
                v-bind:id="number.id"
                :boxId="number.id"
                :key="number.id"
                dragSelector="div.card-header">
                <div class="card demo-box">
                    <div class="card-header">
                      {{ number.id }}
                    </div>
                    <div class="countdown-time" v-if="number.timer !== null">
                      <Countdown :deadline="number.timer"></Countdown>
                    </div>
                    <div class="card-container" v-html="number.corp">

                    </div>
                </div>
            </dnd-grid-box>
        </dnd-grid-container>
      </div>
</template>

<script>
// import Container and Box components
import { Container, Box } from '@dattn/dnd-grid'
// countdown
import Countdown from '@/components/countdown'

export default {
        name: 'favoris',
        components: {
            DndGridContainer: Container,
            DndGridBox: Box,
            Countdown
        },
        data () {
            return {
                selected: '',
                boxtitle: '',
                boxcorp: '',
                boxtimer: '',
                gridSize: {
                    w: 100,
                    h: 100
                },
                bubbleUp: false,
                margin: 0,
                contentbox: [
                  {
                    id: 'koreus',
                    corp: '<iframe width="100%" frameborder="0" height="100%" src="https://www.koreus.com/modules/news/"></iframe>',
                    timer: null
                  },{
                    id: 'kapersky',
                    corp: '<iframe width="100%" height="100%" src="https://cybermap.kaspersky.com/fr/widget/dynamic/dark" frameborder="0"></iframe>',
                    timer: null
                  },{
                    id: 'rick et morty s4',
                    corp: '<a href="http://www.adultswim.com/videos/rick-and-morty/" target="_blank"><img style="width:100%; height:100%;" src="http://jonathan-boyer.fr/images/culture/rick-morty.jpg" alt=""></a>',
                    timer: '12/05/2018'
                  },{
                    id: 'spotify',
                    corp: '<iframe src="https://open.spotify.com/embed?uri=spotify:user:langbourginie:playlist:6WA3Tg794mPmQXQIwmjmm9" width="100%" height="100%" frameborder="0" allowtransparency="true"></iframe>',
                    timer: null
                  }],
                layout: [
                    {
                        id: 'settings',
                        hidden: false,
                        pinned: false,
                        position: {
                            x: 0,
                            y: 3,
                            w: 4,
                            h: 4
                        }
                    },
                    {
                        id: 'koreus',
                        hidden: false,
                        pinned: false,
                        position: {
                            x: 0,
                            y: 0,
                            w: 8,
                            h: 3
                        }
                    },
                    {
                        id: 'kapersky',
                        hidden: false,
                        pinned: false,
                        position: {
                            x: 8,
                            y: 0,
                            w: 3,
                            h: 4
                        }
                    },
                    {
                        id: 'rick et morty',
                        hidden: false,
                        pinned: false,
                        position: {
                            x: 8,
                            y: 4,
                            w: 3,
                            h: 3
                        }
                    },
                    {
                        id: 'spotify',
                        hidden: false,
                        pinned: false,
                        position: {
                            x: 4,
                            y: 3,
                            w: 4,
                            h: 4
                        }
                    }
                ]
            }
        },
        computed: {
            layoutWithoutSettings () {
                return this.layout.filter((box) => {
                    return box.id !== 'settings'
                })
            }
        },
        methods: {
            onLayoutUpdate (evt) {
                this.layout = evt.layout
            },

            /*setboxfavoris*/
            setboxfavoris() {
              var styleName = document.getElementById('box-favoris').style.display;
              if(styleName !== "none"){
                document.getElementById('box-favoris').style.display = "none";
              } else {
                document.getElementById('box-favoris').style.display= "block";
              }
            },

            suppBox(){
              document.getElementById(this.selected).remove();
              for (var i=this.contentbox.length-1; i>=0; i--) {
                  if (this.contentbox[i].id === this.selected) {
                      this.contentbox.splice(i, 1);
                  }
              }
            },

            addBox(){
              var element = {}
              if(this.boxtitle == ''){
                alert('Ajouter un titre à la Box')
              } else {
                element.id = this.boxtitle;
                element.corp = this.boxcorp;
                if(this.boxtimer == ''){
                  element.timer = null;
                } else {
                  element.timer = this.boxtimer;
                }
                this.contentbox.push(element);
                console.log(this.contentbox);
                console.log(this.layout);
              }
            }
        }
    }
</script>

<style scoped>
.countdown-time{
  position: absolute;
  text-align: center;
  width: 100%;
  top: 35%;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 11px;
}
.demo-box {
    width: 100%;
    height: 100%;
}
.card-header{
  padding: 0 0 0 0.5rem;
  z-index: 2;
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.35);
}
.card-container{
    height: 100%;
    overflow: hidden;
}
.card-container img{
    height: 100%;
    width: 100%;
}
.setting-favoris{
  position: absolute;
  z-index: 2;
  margin: 4px;
  right: 0;
}
@import '~@dattn/dnd-grid/dist/index.css';
</style>
