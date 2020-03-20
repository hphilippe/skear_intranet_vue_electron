<template>
  <div>
    <div class="search-content">
      <el-input prefix-icon="el-icon-search" placeholder="Rechercher des films, séries ou des personnes" v-on:input="setShows()" v-model="inputfilm" class="input-with-select" id="inputshow">
        <el-select style="width: 168px;" v-model="selectcat" slot="prepend" placeholder="Select catégorie">
          <el-option label="All" value="all"></el-option>
          <el-option label="Films" value="films"></el-option>
          <el-option label="Séries" value="séries"></el-option>
          <el-option label="Personnalités" value="personnes"></el-option>
        </el-select>
        <el-button @click="dialogFormVisible = true" slot="append" icon="el-icon-setting"></el-button>
      </el-input>
    </div>

    <!-- search setting -->
    <el-dialog title="Réglage" :visible.sync="dialogFormVisible">
      <div>
        <el-switch
          style="display: block"
          v-model="adulte"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="Afficher les contenues adulte"
          inactive-text="Ne pas afficher les contenues adulte">
        </el-switch>
      </div>
    </el-dialog>
    <!-- Video dialog -->
    <el-dialog class="dialog_video" style="background:black;" top="0" width="100%" custom-class="video_url" :visible.sync="dialogTableVisible">
      <div style="height:600px;">
        <iframe width="100%" height="100%" :src="'https://www.youtube.com/embed/'+this.showvideo.key"  frameborder="0" allowfullscreen></iframe>
      </div>
    </el-dialog>

    <!--Search bar -->
    <div id="box-results" class="content-show content-show-hidden">
      <ul class="results_total">
        <li class="results_li" v-for="item in getlist" v-on:click="showtaken(item)">
          <div v-if="item.media_type === 'movie'">
            <div class="results_item">
              <div class="results_img">
                <div v-if='item.poster_path != null'>
                  <img :src="'https://image.tmdb.org/t/p/w45_and_h67_bestv2/'+item.poster_path">
                </div>
                <div v-else class="blanke_img">
                  <i class="blank_picturee fa fa-picture-o" aria-hidden="true"></i>
                </div>
              </div>
              <div class="results_content">
                <p class="name">{{ item.title }}</p>
                <p class="sub">
                  <span class="coma">{{ item.original_title }}</span>
                  <span class="coma2">{{ item.release_date }}</span>
                </p>
              </div>
              <p class="media_type"><el-tag type="success">Film</el-tag></p>
            </div>
          </div>
          <div v-else-if="item.media_type === 'tv'">
            <div class="results_item">
              <div class="results_img">
                <div v-if='item.poster_path != null'>
                  <img :src="'https://image.tmdb.org/t/p/w45_and_h67_bestv2/'+item.poster_path">
                </div>
                <div v-else class="blanke_img">
                  <i class="blank_picturee fa fa-picture-o" aria-hidden="true"></i>
                </div>
              </div>
              <div class="results_content">
                <p class="name">{{ item.name }}</p>
                <p class="sub">
                  <span class="coma">{{ item.original_name }}</span>
                  <span class="coma2">{{ item.first_air_date }}</span>
                </p>
              </div>
              <p class="media_type"><el-tag type="primary">Série</el-tag></p>
            </div>
          </div>
          <div v-else>
            <div class="results_item">
              <div class="results_img">
                <div v-if='item.profile_path != null'>
                  <img :src="'https://image.tmdb.org/t/p/w45_and_h67_bestv2/'+item.profile_path">
                </div>
                <div v-else class="blanke_img">
                  <i class="blank_picturee fa fa-picture-o" aria-hidden="true"></i>
                </div>
              </div>
              <div class="results_content">
                <p class="name">{{ item.name }}</p>
                <p class="sub">
                  <span v-for="film in item.known_for" class="coma">{{ film.title }}, </span>
                </p>
              </div>
              <p class="media_type"><el-tag type="danger">Personnalité</el-tag></p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- content box -->
    <div v-if="this.showtakennow.media_type == 'movie'">
      <div class="hero-body" v-on:click="hideshowbox()" v-bind:style="{backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + this.showtakencontent.backdrop_path + ')'}">
        <div class="container-show description-container">
          <div>
            <el-row :gutter="20" style="margin: 15px 0px;">
              <el-col :span="9"><div class="grid-content" style="text-align: center;">
                <div v-if="showtakencontent.poster_path != null" class="poster">
                  <a @click="dialogTableVisible = true">
                    <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'+showtakencontent.poster_path">
                  </a>
                </div>
                <div v-else class="blanke_img_show">
                  <i class="blank_picturee_show fa fa-picture-o fa-5x" aria-hidden="true"></i>
                </div>
              </div></el-col>
              <el-col :span="15" style="margin-top: 93px;"><div class="grid-content">
                <div class="column is-three-quarters">
                  <h1 class="title">
                          {{showtakencontent.title}}
                        </h1>
                  <h4 class="subtitle"><p class="subtitle-tag">{{showtakencontent.runtime | hoursfilter }} |</p> <p class="subtitle-tag"><span v-for="genre in showtakencontent.genres" >{{genre.name}}, </span> |</p> <p class="subtitle-tag">{{showtakencontent.release_date}}</p></h4>
                  <p class="description">{{showtakencontent.overview}}</p>
                  <div class="links">
                    <!--<a :href="'https://www.youtube.com/watch?v='+this.showvideo.key" target="_blank" class="button play-button">Play
                      <i class="fa fa-play"></i>
                    </a>-->
                    <a @click="dialogTableVisible = true" class="button play-button">Play
                      <i class="fa fa-play"></i>
                    </a>
                    <a class="button is-link favorites-button">
                      <el-popover
                        ref="pophover"
                        placement="bottom"
                        title="Choisir une des listes où ajouter"
                        width="300"
                        trigger="hover">
                        <div v-if="showdejainlist == false">
                          <div v-for="itemlist in personnelList">
                            <a v-on:click="postList(itemlist.id)" href="#">{{itemlist.name}} ({{itemlist.number_of_items}} éléments)</a>
                          </div>
                        </div>
                        <div v-else>
                          l'item est déja présent dans votre liste.
                        </div>
                      </el-popover>
                      <el-button v-popover:pophover><i class="fa fa-list"></i></el-button>
                    </a>
                  </div>
                </div>
              </div></el-col>
            </el-row>
            <div class="row" style="text-align: center;">
              <div v-for="credit in showcredit" class="col-2">
                <div>
                  <img :src="'https://image.tmdb.org/t/p/w138_and_h175_bestv2/'+credit.profile_path">
                </div>
                <div>
                  <p>
                    <span>{{credit.name}}</span>
                    </br>
                    <span>{{credit.character}}</span>
                  </p>
                </div>
              </div>
            </div>
            <el-row style="margin: 15px 10px;">
              <el-col :span="24"><p> </br> </p></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="this.showtakennow.media_type == 'tv'">
      <div class="hero-body" v-on:click="hideshowbox()" v-bind:style="{backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + this.showtakencontent.backdrop_path + ')'}">
        <div class="container-show description-container">
          <div>
            <el-row :gutter="20" style="margin: 15px 0px;">
              <el-col :span="9"><div class="grid-content" style="text-align: center;">
                <div v-if="showtakencontent.poster_path != null" class="poster">
                  <a @click="dialogTableVisible = true">
                    <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'+showtakencontent.poster_path">
                  </a>
                </div>
                <div v-else class="blanke_img_show">
                  <i class="blank_picturee_show fa fa-picture-o fa-5x" aria-hidden="true"></i>
                </div>
              </div></el-col>
              <el-col :span="15" style="margin-top: 93px;"><div class="grid-content">
                <div class="column is-three-quarters">
                  <h1 class="title">
                          {{showtakencontent.name}}
                        </h1>
                  <h4 class="subtitle"><p class="subtitle-tag">{{showtakencontent.seasons.length}} Saisons |</p> <p class="subtitle-tag"><span v-for="genre in showtakencontent.genres" >{{genre.name}}, </span> |</p> <p class="subtitle-tag">{{showtakencontent.release_date}}</p></h4>
                  <p class="description">{{showtakencontent.overview}}</p>
                  <div class="links">
                    <!--<a :href="'https://www.youtube.com/watch?v='+this.showvideo.key" target="_blank" class="button play-button">Play
                      <i class="fa fa-play"></i>
                    </a>-->
                    <a @click="dialogTableVisible = true" class="button play-button">Play
                      <i class="fa fa-play"></i>
                    </a>
                    <a class="button is-link favorites-button">
                      <el-popover
                        ref="pophover"
                        placement="bottom"
                        title="Choisir une des listes où ajouter"
                        width="300"
                        trigger="hover">
                        <div v-if="showdejainlist == false">
                          <div v-for="itemlist in personnelList">
                            <a v-on:click="postList(itemlist.id)" href="#">{{itemlist.name}} ({{itemlist.number_of_items}} éléments)</a>
                          </div>
                        </div>
                        <div v-else>
                          l'item est déja présent dans votre liste.
                        </div>
                      </el-popover>
                      <el-button v-popover:pophover><i class="fa fa-list"></i></el-button>
                    </a>
                  </div>
                </div>
              </div></el-col>
            </el-row>
            <div class="row" style="text-align: center;">
              <div v-for="credit in showcredit" class="col-2">
                <div>
                  <img :src="'https://image.tmdb.org/t/p/w138_and_h175_bestv2/'+credit.profile_path">
                </div>
                <div>
                  <p>
                    <span>{{credit.name}}</span>
                    </br>
                    <span>{{credit.character}}</span>
                  </p>
                </div>
              </div>
            </div>
            <el-row style="margin: 15px 10px;">
              <el-col :span="24"><p> </br> </p></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="this.showtakennow.media_type == 'person'">
      <div class="hero-body" v-on:click="hideshowbox()" v-bind:style="{backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + this.showtakencontent.profile_path + ')'}">
        <div class="container-show description-container">
          <div class="columns">
            <div class="column is-three-quarters">
              <h1 class="title">
                      {{showtakencontent.name}}
                    </h1>
              <h4 class="subtitle"><p class="subtitle-tag">{{showtakencontent.seasons}} Saisons |</p> <p class="subtitle-tag"><span v-for="genre in showtakencontent.genres">{{genre.name}}, </span> |</p> <p class="subtitle-tag">{{showtakencontent.first_air_date}}</p></h4>
              <p class="description">{{showtakencontent.overview}}</p>
              <div class="links">
                <a :href="'https://www.youtube.com/watch?v='+this.showvideo.key" target="_blank" class="button play-button">Play
                  <i class="fa fa-play"></i>
                </a> <a class="button is-link favorites-button">
                  <span class="">Add to</span>
                  <span class="hide">Remove from </span>&nbsp;favorites <i class="fa fa-plus-square-o"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="hero-body acceuil-show" v-on:click="hideshowbox()">
        <div class="container-show description-container">
          <div class="columns">
            <div class="column is-three-quarters">
              <h1 class="title" style="color:red;text-transform: uppercase;letter-spacing: 8px;">
                      <span>SKEAR</span><span style="color: #ff5400;">FLIX</span>
                    </h1>
              <p class="description">Selectioner un film, une série, ou une personne au-dessus</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'shows',
  data() {
    return {
      inputfilm: '',
      selectcat: 'all',
      getlist: [],
      loading: false,
      timer: null,
      showtakennow: [],
      showtakencontent:[],
      showvideo:[],
      showcredit:[],
      adulte: true,
      dialogFormVisible: false,
      dialogTableVisible: false,
      apikey: '19ea95c20a137866010a453dec3d4841',
      apikeyv4 : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWVhOTVjMjBhMTM3ODY2MDEwYTQ1M2RlYzNkNDg0MSIsInN1YiI6IjU5ZjcxZTAwOTI1MTQxNDJhYTAzMjIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jmvPxs1yyWlVv0_Pf-YJRUMC1v8zqapRi-MOhEeCwY',
      // user list
      personnelList : [],
      accountId: '',
      accessToken : '',
      getCompletedLists :[],
      showdejainlist : false
    }
  },
  methods: {
      // delay input to get value and launch query
      setShows: function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
          self.loading = true;
          self.getMulti();
        }, 500)
      },
      // search bar query
      getMulti: function() {
          var self = this;
          var mediaTypeSelect = 'multi';
          // if(this.selectcat == 'all'){
          //   mediaTypeSelect = 'multi'
          // } else if (this.selectcat == 'films'){
          //   mediaTypeSelect = 'movie'
          // } else if (this.selectcat == 'séries'){
          //   mediaTypeSelect = 'tv'
          // } else if (this.selectcat == 'personnes'){
          //   mediaTypeSelect = 'person'
          // } else {
          //   mediaTypeSelect = 'multi'
          // }
          if(this.inputfilm != ''){
            this.$http.get('https://api.themoviedb.org/3/search/'+mediaTypeSelect, {
                  params: {
                      api_key: this.apikey,
                      language: 'fr',
                      query: this.inputfilm,
                      page: 1,
                      include_adult: this.adulte
                  }
              })
              .then(function (response) {
                  document.getElementById('box-results').classList.remove('content-show-hidden');
                  self.getlist = response.data.results;
                  self.loading = false;
              })
              .catch(function (error) {
                  console.log(error);
              });
          }
      },
      // hide query box
      hideshowbox: function(){
        document.getElementById('box-results').classList.add('content-show-hidden');
      },
      // if query click choose is person or movie or tv
      showtaken: function(item){
        var self = this;
        self.showtakennow = item;
        if(item.media_type == "movie"){
          this.movietaken(item.id);
        }
        else if (item.media_type == "tv")
        {
          this.serietaken(item.id);
        } else {
          this.persontaken(item.id);
        }
      },
      // affichage movie
      movietaken: function(id){
        var self = this;
        this.$http.get('https://api.themoviedb.org/3/movie/'+id, {
              params: {
                  api_key: this.apikey,
                  language: 'fr',
              }
          })
          .then(function (response) {
              document.getElementById('box-results').classList.add('content-show-hidden');
              self.showtakencontent = response.data;
              // check si le film est déja présent dans la liste de profil
              self.showdejainlist = false;
              for (var i = 0; i < self.getCompletedLists.length; i++) {
                for (var j = 0; j < self.getCompletedLists[i].results.length; j++) {
                  if(self.getCompletedLists[i].results[j].id == id){
                    self.showdejainlist = true;
                  }
                }
              }
          })
          .catch(function (error) {
              alert(error)
          });

        // prise vidéo
        this.$http.get('https://api.themoviedb.org/3/movie/'+id+'/videos', {
              params: {
                  api_key: this.apikey,
                  language: 'fr',
              }
          })
          .then(function (responsevideo) {
            if (responsevideo.data.results.length > 0) {
                self.showvideo = responsevideo.data.results[0];
            } else {
                self.showvideo = { "key": "novideo" }
            }
          })
          .catch(function (error) {
              alert(error)
          });

        // prise des casts
        this.$http.get('https://api.themoviedb.org/3/movie/'+id+'/credits', {
              params: {
                  api_key: this.apikey,
              }
          })
          .then(function (responsecredits) {
              self.showcredit = responsecredits.data.cast.slice(0,6);
              self.loading = false;
          })
          .catch(function (error) {
              alert(error)
          });
      },

      //affichage série
      serietaken: function(id){
        var self = this;
        this.$http.get('https://api.themoviedb.org/3/tv/'+id, {
              params: {
                  api_key: this.apikey,
                  language: 'fr',
              }
          })
          .then(function (response) {
              document.getElementById('box-results').classList.add('content-show-hidden');
              self.showtakencontent = response.data;
              // check si le film est déja présent dans la liste de profil
              self.showdejainlist = false;
              for (var i = 0; i < self.getCompletedLists.length; i++) {
                for (var j = 0; j < self.getCompletedLists[i].results.length; j++) {
                  if(self.getCompletedLists[i].results[j].id == id){
                    self.showdejainlist = true;
                  }
                }
              }
          })
          .catch(function (error) {
              alert(error)
          });

        // prise vidéo
        this.$http.get('https://api.themoviedb.org/3/tv/'+id+'/videos', {
              params: {
                  api_key: this.apikey,
                  language: 'fr',
              }
          })
          .then(function (responsevideo) {
            if (responsevideo.data.results.length > 0) {
                self.showvideo = responsevideo.data.results[0];
            } else {
                self.showvideo = { "key": "novideo" }
            }
          })
          .catch(function (error) {
              alert(error)
          });

        // prise des casts
        this.$http.get('https://api.themoviedb.org/3/tv/'+id+'/credits', {
              params: {
                  api_key: this.apikey,
              }
          })
          .then(function (responsecredits) {
              self.showcredit = responsecredits.data.cast.slice(0,6);
          })
          .catch(function (error) {
              alert(error)
          });
      },

      // affichage personne
      persontaken: function(id){
        var self = this;
        this.$http.get('https://api.themoviedb.org/3/person/'+id, {
              params: {
                  api_key: this.apikey,
                  language: 'fr',
              }
          })
          .then(function (response) {
              document.getElementById('box-results').classList.add('content-show-hidden');
              self.showtakencontent = response.data;
              self.loading = false;
              console.log(self.showtakencontent);
          })
          .catch(function (error) {
              console.log(error);
          });

        /*this.$http.get('https://api.themoviedb.org/3/person/'+id+'/images', {
              params: {
                  api_key: '19ea95c20a137866010a453dec3d4841',
                  language: 'fr',
              }
          })
          .then(function (responsevideo) {
              self.showvideo = responsevideo.data.results[0];
              self.loading = false;
              console.log(self.showvideo);
          })
          .catch(function (error) {
              console.log(error);
          });*/
      },

      // -- USER LIST --
      getLists: function() {
        var self = this;
        this.$http.get('https://api.themoviedb.org/4/account/'+ this.accountId +'/lists', {
              params: {
                  page: 1,
              },
              headers: {'Authorization': 'Bearer '+this.accessToken}
          })
          .then(function (response) {
               self.personnelList = response.data.results;
               self.getAllCompletedList();
          })
          .catch(function (error) {
              alert(error);
          });
        },
      // avoir toutes la liste des films et série
      getAllCompletedList : function(){
        var self = this;
        this.personnelList.forEach(function(element){
          self.$http.get('https://api.themoviedb.org/4/list/'+ element.id, {
                params: {
                    page: 1,
                    language : 'fr'
                },
                headers: {'Authorization': 'Bearer '+self.apikeyv4}
            })
            .then(function (response) {
              // plus de 2 pages
              if(response.data.total_pages >= 2 ){
                for (var k = 2; k <= response.data.total_pages; k++ ){
                  self.$http.get('https://api.themoviedb.org/4/list/'+ element.id, {
                        params: {
                            page: k,
                            language : 'fr'
                        },
                        headers: {'Authorization': 'Bearer '+self.apikeyv4}
                    })
                    .then(function (response2) {
                      for (var i = 0; i < response2.data.results.length; i++) {
                        response.data.results.splice(response.data.results.length,0,response2.data.results[i]);
                      }
                      var o1 = response.data.comments;
                      var o2 = response2.data.comments;
                      response.data.comments = Object.assign(o1, o2)
                    })
                    .catch(function (error2) {
                        alert(error2);
                    });
                }
                 self.getCompletedLists.push(response.data);
              } else {
                self.getCompletedLists.push(response.data);
              }
            })
            .catch(function (error) {
                alert(error);
            });
        });
      },
      // post du filmn ou série dans la liste
      postList : function(itemlistid){
        var self = this;
        // console.log(itemlistid);
        // console.log(this.showtakennow);
        // POST /someUrl
        var contentsend = {"items": [{"media_type": this.showtakennow.media_type, "media_id": this.showtakennow.id}]}
        this.$http.post('https://api.themoviedb.org/4/list/'+itemlistid+'/items', contentsend, {
            headers: { 'Authorization': 'Bearer '+this.accessToken }
          })
          .then(response => {
            if(response.data.results[0].success == true){
              this.$notify({
                title: 'Success',
                message: self.showtakennow.title +' a été ajouté',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: 'Erreurr',
                message: self.showtakennow.title +' est déja dans la liste'
              });
            }
          }, response => {
            alert(response);
          });
      }
  },
  filters: {
    hoursfilter: function (value) {
      var hours = value / 60;
      var minute = value % 60;
      return hours.toFixed(0) + 'h' + minute.toFixed(0);
    }
  },
  created: function () {
    this.accountId = window.localStorage.accountidimdb
    this.accessToken = window.localStorage.tokenimdb
    this.getLists();
  }
}

</script>

<style >
.video_url{
  background: black;
}
.dialog_video .el-dialog{
  background: black;
}
.acceuil-show {
  background: url(../../assets/futuristic.jpg);
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center;
}
.hero-body {
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: multiply;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  width: 98%;
  height: 100%;
  color: white;
  overflow: scroll;
  /*padding-bottom: 4rem !important;
  padding-top: 4.5rem !important;*/
}
@media screen and (max-width: 767px) {
  .hero-body {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
.hero-body .container-show {
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.hero-body .columns{
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.hero-body .container-show .home-intro {
  font-size: 60px;
  letter-spacing: 8px;
  color: red;
  text-align: center;
  text-transform: uppercase;
}
.hero-body .nav {
  position: absolute;
  top: 10px;
  width: 100%;
  box-shadow: 0px 0px 0px !important;
}
.hero-body .nav .nav-item .fa-bars {
  color: #ce2424;
  font-size: 40px;
}
.hero-body .nav .nav-item .tag {
  font-size: 15px;
}
.hero-body .nav .nav-item .title {
  color: red;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
}
.hero-body .nav .nav-right .nav-item {
  float: right;
}
.hero-body .column {
  padding-left: 50px;
  min-height: 264px;
}
.hero-body .column .title {
  font-size: 45px;
  font-weight: 600;
  margin: 0;
}
.hero-body .column .subtitle {
  font-size: 15px;
  font-weight: 600;
  color: red;
  margin: 0;
}
@media screen and (max-width: 767px) {
  .hero-body .column .title {
    font-size: 35px;
  }

  .hero-body .column .subtitle {
    font-size: 14px;
  }
}
.hero-body .column .subtitle .subtitle-tag {
  display: inline;
}
.hero-body .column .description {
  font-size: 15px;
  margin-bottom: 24px;
  max-width: 553px;
}
.hero-body .column .links .play-button {
  background: #ce2424;
  color: #FFF;
  border-radius: 15px;
  border: 0px;
  margin-right: 20px;
  padding: 10px 15px;
  text-decoration: none;
}
.hero-body .column .links .play-button .fa-play {
  padding-left: 7px;
}
@media screen and (max-width: 767px) {
  .hero-body .column .links .play-button {
    font-size: 14px;
  }
}
.hero-body .column .links .favorites-button {
  text-decoration: none;
  color: #FFF;
}
.hero-body .column .links .favorites-button:hover {
  background: none;
  text-decoration: none;
}
.hero-body .column .links .favorites-button .fa-plus-square-o {
  padding-left: 10px;
  padding-top: 2px;
}
@media screen and (max-width: 767px) {
  .hero-body .column .links .favorites-button {
    background: #FFF;
    color: #4a4a4a;
    border-radius: 15px;
    font-size: 14px;
  }
  .hero-body .column .links .favorites-button:hover {
    background: #FFF;
  }
}
@media screen and (max-width: 767px) {
  .hero-body .column .links {
    text-align: center;
  }
}
.hero-body .trailer-body {
  padding: 0;
  height: 376px;
}
.hero-body .hero-foot {
  background: linear-gradient(to bottom right, #7d1e24, #bb2d35);
}
.hero-body .hero-foot .columns {
  padding: 20px;
  padding-bottom: 30px;
  text-align: center;
}
.hero-body .hero-foot .columns .movie-choice {
  position: relative;
  list-style: none;
  cursor: pointer;
}
.hero-body .hero-foot .columns .movie-choice .favorite-check {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
  color: #fcff4c;
}
@media (max-width: 767px) {
  .hero-body .hero-foot .columns .movie-choice .favorite-check {
    position: initial;
    display: block;
  }
}
.hero-body .hero-foot .columns .movie-choice img {
  opacity: 0.9;
}
.hero-body .hero-foot .columns .movie-choice .movie-title:active {
  font-weight: 600;
}

/*-- Search content --*/
.content-show{
  height: 300px;
  position: absolute;
  z-index: 2;
  width: 100%;
  background: white;
  padding-top: 6px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
.content-show-hidden{
  display: none;
}
.results_total{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: scroll;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.results_li{
  list-style: none;
  height: 71px;
  width: 100%;
  padding: 0 15px;
  padding-top: 4px;
  cursor: pointer;
}
.results_li:hover{
  background: rgba(0, 0, 0, 0.05);
}
.results_img{
  float: left;
}
.results_img img{
  margin-right: 7px;
}
.results_content{
  padding-top: 14px;
  float: left;
}
.name{
  margin: 0;
  font-weight: 600;
}
.sub{
  margin: 0;
  color: #8b8b8b;
}
.media_type{
  float: right;
  margin-right: 74px;
  margin-top: 20px;
  margin-bottom: 0;
}
.coma2{
  font-style: italic;
  font-size: 15px;
}
.blanke_img{
  height: 62px;
  background-color: rgba(236, 236, 236, 0.74);
  width: 44px;
  border-radius: 3px;
  margin-right: 6px;
}
.blank_picturee{
  color: grey;
  margin-top: 21px;
  margin-left: 13px;
}
/*picture null*/
.blanke_img_show{
  height: 450px;
  background-color: rgba(236, 236, 236, 0.74);
  width: 300px;
  border-radius: 3px;
  padding-top: 171px;
  margin: 0 auto;
}
.blank_picturee_show{
  color: grey;
  width: 185px;
  height: 278px;
  margin-top: 0;
  margin-left: 0;
}
</style>
