<template>
  <div class="list-container">
    <el-collapse accordion style="border:none;" class="colapse-bricole">
      <el-collapse-item name="1">
        <template slot="title" style="border:none;">
          <i class="el-icon-setting"></i> Réglages
        </template>

        <div class="row">
          <div class="col-6">
            <span>Position du Tabs</span>
            <el-radio-group v-model="tabPosition">
              <el-radio-button style="right: -9px;" label="top">top</el-radio-button>
              <el-radio-button style="right: -6px;" label="right">right</el-radio-button>
              <el-radio-button style="right: -3px;" label="bottom">bottom</el-radio-button>
              <el-radio-button label="left">left</el-radio-button>
            </el-radio-group>
          </div>
          <div class="col-6">
            <el-switch
              v-model="commentState"
              v-on:change="stateCommentBox()"
              active-text="Commentaire affiché"
              inactive-text="Commentaire désactivé">
            </el-switch>
            <el-switch
              v-model="headerCardState"
              v-on:change="stateHeaderBox()"
              active-text="Type de média et note affiché"
              inactive-text="Type de média et note désactivé">
            </el-switch>
          </div>
        </div>

      </el-collapse-item>
    </el-collapse>

    <el-tabs :tab-position="tabPosition">
      <el-tab-pane v-for="itempan in getCompletedLists" :key="itempan.id" >
        <span slot="label">
          <div v-if="itempan.name == 'Watching'">
            <i class="el-icon-view"></i> {{itempan.name}}
          </div>
          <div v-else-if="itempan.name == 'Completed'">
            <i class="el-icon-check"></i> {{itempan.name}}
          </div>
          <div v-else-if="itempan.name == 'Plan to watch'">
            <i class="el-icon-bell"></i> {{itempan.name}}
          </div>
          <div v-else-if="itempan.name == 'Dropped'">
            <i class="el-icon-delete"></i> {{itempan.name}}
          </div>
          <div v-else>
            {{itempan.name}}
          </div>
        </span>
        <div class="row">
          <div v-for="item in itempan.results" class="col-6 col-sm-3 col-xl-2">
            <div class="header_wrapper">
              <div class="header_wrapper_left">
                <div v-if="item.media_type == 'movie'">
                  <i class="fa fa-film" aria-hidden="true"></i>
                </div>
                <div v-else>
                  <i class="fa fa-television" aria-hidden="true"></i>
                </div>
              </div>
              <div class="header_wrapper_right">
                <div v-html="renderNote(item.id, item.media_type)"></div>
              </div>
            </div>
            <div class="info_wrapper">
              <div class="front">
                <div v-if="item.poster_path != null" @click="dialogFormUpdatelist = true, clickform(item.id, item.media_type, itempan.comments['movie:'+item.id], itempan.comments['tv:'+item.id], itempan.id)">
                  <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/'+item.poster_path">
                </div>
                <div v-else class="blanke_img"  @click="dialogFormUpdatelist = true, clickform(item.id, item.media_type, itempan.comments['movie:'+item.id], itempan.comments['tv:'+item.id], itempan.id)">
                  <i class="blank_picturee fa fa-picture-o fa-5x" aria-hidden="true">
                  </br>
                  <div v-if="item.media_type == 'movie'" class="info_title_blank">
                    {{item.title}}
                  </div>
                  <div v-else class="info_title_blank">
                    {{item.name}}
                  </div>
                  </i>
                </div>
              </div>
            </div>
            <div class="comment_wrapper">
              <div v-if="item.media_type == 'movie'">
                <div v-if="itempan.comments['movie:'+item.id] != null">
                  <div class="comment_triangle right_side"></div>
                  <div class="comment">
                    <p>{{itempan.comments["movie:"+item.id]}}</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="itempan.comments['tv:'+item.id] != null">
                  <div class="comment_triangle right_side"></div>
                  <div class="comment">
                    <p>{{itempan.comments["tv:"+item.id]}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: 'top',
      accountId: '',
      accessToken : '',
      user:'',
      apikey : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWVhOTVjMjBhMTM3ODY2MDEwYTQ1M2RlYzNkNDg0MSIsInN1YiI6IjU5ZjcxZTAwOTI1MTQxNDJhYTAzMjIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jmvPxs1yyWlVv0_Pf-YJRUMC1v8zqapRi-MOhEeCwY',
      getlists :[],
      getCompletedLists : [],
      getAllRatedMovies : [],
      getAllRatedSeries : [],
      commentState : true,
      headerCardState : true,
      noteState : false,
      listeMovieNoteDisplayNot : []
    };
  },
  methods: {
    // loader
    startLoader: function(){
      if (document.readyState === "complete") {
        document.getElementById('loader').style.display = 'flex';
      } else {
        document.addEventListener('DOMContentLoaded', function() {
           document.getElementById('loader').style.display = 'flex';
        }, false);
      }
    },
    finishLoader: function(){
      if (document.readyState === "complete") {
        document.getElementById('loader').style.display = 'none';
      } else {
        document.addEventListener('DOMContentLoaded', function() {
           document.getElementById('loader').style.display = 'none';
        }, false);
      }
    },
    // GET USER
    getUsers: function(){
      var self = this;
      this.startLoader();
      this.$http.get('http://www.skear.fr/server/web/api/users', {
            params: {
                username: this.user,
            },
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
        })
        .then(function (response) {
            self.accountId = response.data["hydra:member"][0].accountidimdb;
            self.accessToken = response.data["hydra:member"][0].tokenimdb;
            self.getLists();
        })
        .catch(function (error) {
            alert(error);
            self.finishLoader();
        });
    },

    // Get List IMDB
    getLists: function() {
        var self = this;
        this.startLoader();
        this.$http.get('https://api.themoviedb.org/4/account/'+ this.accountId +'/lists', {
              params: {
                  page: 1,
              },
              headers: {'Authorization': 'Bearer '+this.accessToken}
          })
          .then(function (response) {
              // var tabresponse = response.data.results;
              // var tritab = []
              // var cpt = 4;
              // tabresponse.forEach(function(element, key){
              //   if(element.name == "Watching"){
              //     tritab.splice(0,0,element);
              //   } else if( element.name == "Plan to watch" ){
              //     tritab.splice(1,0,element);
              //   } else if (element.name == "Completed"){
              //     tritab.splice(2,0,element);
              //   } else if (element.name == "Dropped"){
              //     tritab.splice(3,0,element);
              //   } else {
              //     tritab.splice(cpt,0,element);
              //     cpt++;
              //   }
              // })
              // self.getlists = tritab;
              self.getlists = response.data.results;
              self.getAllCompletedList();
              self.getRatedMovies();
              self.getRatedSeries();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },
    getAllCompletedList : function(){
      var self = this;
      var tableauprovisoire = [];
      self.getlists.forEach(function(element){
        self.$http.get('https://api.themoviedb.org/4/list/'+ element.id, {
              params: {
                  page: 1,
                  language : 'fr'
              },
              headers: {'Authorization': 'Bearer '+self.apikey}
          })
          .then(function (response) {;
            // plus de 2 pages
            if(response.data.total_pages >= 2 ){
              for (var k = 2; k <= response.data.total_pages; k++ ){
                self.$http.get('https://api.themoviedb.org/4/list/'+ element.id, {
                      params: {
                          page: k,
                          language : 'fr'
                      },
                      headers: {'Authorization': 'Bearer '+self.apikey}
                  })
                  .then(function (response2) {
                    for (var i = 0; i < response2.data.results.length; i++) {
                      response.data.results.splice(response.data.results.length,0,response2.data.results[i]);
                    }
                    var o1 = response.data.comments;
                    var o2 = response2.data.comments;
                    response.data.comments = Object.assign(o1, o2)
                    // loader display none
                    self.finishLoader();
                  })
                  .catch(function (error2) {
                      alert(error2);
                  });
              }
              if(response.data.name == "Watching"){
                 self.getCompletedLists.splice(0,0,response.data);
               } else if( response.data.name == "Plan to watch" ){
                 self.getCompletedLists.splice(1,0,response.data);
               } else if (response.data.name == "Completed"){
                 self.getCompletedLists.splice(2,0,response.data);
               } else if (response.data.name == "Dropped"){
                 self.getCompletedLists.splice(3,0,response.data);
               }
               // loader display none
               self.finishLoader();
            } else {
              if(response.data.name == "Watching"){
                 self.getCompletedLists.splice(0,0,response.data);
               } else if( response.data.name == "Plan to watch" ){
                 self.getCompletedLists.splice(1,0,response.data);
               } else if (response.data.name == "Completed"){
                 self.getCompletedLists.splice(2,0,response.data);
               } else if (response.data.name == "Dropped"){
                 self.getCompletedLists.splice(3,0,response.data);
               }
               // loader display none
               self.finishLoader();
            }
          })
          .catch(function (error) {
              alert(error);
              // loader display none
              self.finishLoader();
          });
      });
    },
    getRatedMovies : function(){
      var self = this;
      this.$http.get('https://api.themoviedb.org/4/account/'+ this.accountId +'/movie/rated', {
            params: {
                page: 1,
            },
            headers: {'Authorization': 'Bearer '+this.accessToken}
        })
        .then(function (response) {
            self.getAllRatedMovies = response.data.results;
        })
        .catch(function (error) {
            alert(error);
        });
    },
    getRatedSeries : function(){
      var self = this;
      this.$http.get('https://api.themoviedb.org/4/account/'+ this.accountId +'/tv/rated', {
            params: {
                page: 1,
            },
            headers: {'Authorization': 'Bearer '+this.accessToken}
        })
        .then(function (response) {
            self.getAllRatedSeries = response.data.results;
        })
        .catch(function (error) {
            alert(error);
        });
    },
    stateCommentBox: function(){
      if(this.commentState == false){
        var comment = document.getElementsByClassName('comment_wrapper');
        var len = comment != null ? comment.length : 0;
        for(var i=0; i < len; i++){
          comment[i].className += " content-show-hidden";
        }
      } else {
        var comment = document.getElementsByClassName('comment_wrapper');
        var len = comment != null ? comment.length : 0;
        for(var i=0; i < len; i++){
          comment[i].className = " comment_wrapper";
        }
      }
    },
    stateHeaderBox: function(){
      if(this.headerCardState == false){
        var header = document.getElementsByClassName('header_wrapper');
        var len = header != null ? header.length : 0;
        for(var i=0; i < len; i++){
          header[i].className += " content-show-hidden";
        }
      } else {
        var header = document.getElementsByClassName('header_wrapper');
        var len = header != null ? header.length : 0;
        for(var i=0; i < len; i++){
          header[i].className = " header_wrapper";
        }
      }
    },
    renderNote : function(itemid, mediaType){
      var resultat = ""
      var state = false
      if (mediaType == 'movie'){
        this.getAllRatedMovies.forEach(function(itemmovie){
          if(itemmovie.id == itemid){
            switch(itemmovie.account_rating.value) {
                case 0:
                    resultat = ''
                    break;
                case 1:
                    resultat = '<div role="slider" aria-valuenow="0" aria-valuetext="0 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(239, 242, 247); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">0.5 pts</span></div>'
                    break;
                case 2:
                    resultat = '<div role="slider" aria-valuenow="1" aria-valuetext="1 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">1 pts</span></div>'
                    break;
                case 3:
                    resultat = '<div role="slider" aria-valuenow="1.5" aria-valuetext="1.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">1.5 pts</span></div>'
                    break;
                case 4:
                    resultat = '<div role="slider" aria-valuenow="2" aria-valuetext="2 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">2 pts</span></div>'
                    break;
                case 5:
                    resultat = '<div role="slider" aria-valuenow="2.5" aria-valuetext="2.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">2.5 pts</span></div>'
                    break;
                case 6:
                    resultat = '<div role="slider" aria-valuenow="3" aria-valuetext="3 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">3 pts</span></div>'
                    break;
                case 7:
                    resultat = '<div role="slider" aria-valuenow="3.5" aria-valuetext="3.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">3.5 pts</span></div>'
                    break;
                case 8:
                    resultat = '<div role="slider" aria-valuenow="4" aria-valuetext="4 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">4 pts</span></div>'
                    break;
                case 9:
                    resultat = '<div role="slider" aria-valuenow="4.5" aria-valuetext="4.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">4.5 pts</span></div>'
                    break;
                case 10:
                    resultat = '<div role="slider" aria-valuenow="5" aria-valuetext="5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">5 pts</span></div>'
                    break;
                default:
                    resultat = 'none'
            }
            state = true
          }
        })
      } else {
        this.getAllRatedSeries.forEach(function(itemserie){
          if(itemserie.id == itemid){
            switch(itemserie.account_rating.value) {
                case 0:
                    resultat = ''
                    break;
                case 1:
                    resultat = '<div role="slider" aria-valuenow="0" aria-valuetext="0 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(239, 242, 247); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">0.5 pts</span></div>'
                    break;
                case 2:
                    resultat = '<div role="slider" aria-valuenow="1" aria-valuetext="1 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">1 pts</span></div>'
                    break;
                case 3:
                    resultat = '<div role="slider" aria-valuenow="1.5" aria-valuetext="1.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">1.5 pts</span></div>'
                    break;
                case 4:
                    resultat = '<div role="slider" aria-valuenow="2" aria-valuetext="2 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">2 pts</span></div>'
                    break;
                case 5:
                    resultat = '<div role="slider" aria-valuenow="2.5" aria-valuetext="2.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">2.5 pts</span></div>'
                    break;
                case 6:
                    resultat = '<div role="slider" aria-valuenow="3" aria-valuetext="3 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">3 pts</span></div>'
                    break;
                case 7:
                    resultat = '<div role="slider" aria-valuenow="3.5" aria-valuetext="3.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">3.5 pts</span></div>'
                    break;
                case 8:
                    resultat = '<div role="slider" aria-valuenow="4" aria-valuetext="4 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">4 pts</span></div>'
                    break;
                case 9:
                    resultat = '<div role="slider" aria-valuenow="4.5" aria-valuetext="4.5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);"><i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i></i></span><span class="el-rate__text" '
                    resultat = resultat + 'style="color: rgb(255, 153, 0);">4.5 pts</span></div>'
                    break;
                case 10:
                    resultat = '<div role="slider" aria-valuenow="5" aria-valuetext="5 pts" aria-valuemin="0" aria-valuemax="5" tabindex="0" class="el-rate"><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"><!----></i></span><span class="el-rate__text" style="color: rgb(255, 153, 0);">5 pts</span></div>'
                    break;
                default:
                    resultat = 'none'
            }
            state = true
          }
        })
      }
      if(state == false){
        resultat = '<span style="color:#ff9900">Aucune Note</span>'
      }
      return (resultat);
    }
  },
  created: function () {
    this.user = this.$route.params.name;
    this.getUsers();
  }
}
</script>

<style>
.content-show-hidden{
  display: none;
}
.info_wrapper .front img:hover{
  -moz-filter: brightness(120%);
  -ms-filter: brightness(120%);
  -o-filter: brightness(120%);
  -webkit-filter: brightness(120%);
  filter: brightness(120%);
}
.info_wrapper .front img{
  border-radius: 5px 5px 5px 5px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.info_wrapper {
  text-align: center;
  transform-style: preserve-3d;
  position: relative;
  border-color: rgba(0, 0, 0, 0.09);
  border: solid 1px;
  border-radius: 5px 5px 5px 5px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.46);
  -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.46);
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
  width: 187px;
  margin: 35px auto 18px auto;
}

.info_wrapper:hover{
  webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.84);
  -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.84);
  box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.84);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.comment_wrapper{
  text-align: center;
  margin-top: -10px;
}
.comment_triangle{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #01ca6e;
  border-right: 10px solid transparent;
  position: relative;
  top: 0;
  left: 150px;
}
.comment{
  width: 185px;
  background-color: #01ca6e;
  border-radius: 6px;
  padding: 0px 8px;
  box-sizing: border-box;
  color: #fff;
  margin: 0 auto;
}
.list-container{
  margin: 0 34px;
}
/* surchagre ui elemment*/
/* .el-tabs--top .el-tabs__header{
  margin: 0 34px;
} */
.el-tabs--right .el-tabs__header{
  margin-top: 16px;
}
.el-tabs--left .el-tabs__header{
  margin-top: 16px;
}
.header_wrapper{
  text-align: center;
  width: 185px;
  margin: 7px auto 0px auto;
}
.header_wrapper_left{
  float: left;
}
.header_wrapper_right{
  float: right;
}
.colapse-bricole .el-collapse-item__header{
  border: none;
}
.colapse-bricole .el-collapse-item__wrap {
  border: none;
}
.colapse-bricole .el-collapse-item__content{
  padding-bottom: 0px;
}
/*picture null*/
.front .blanke_img{
  height: 278px;
  background-color: rgba(236, 236, 236, 0.74);
  width: 185px;
  border-radius: 3px;
  margin-right: 6px;
  padding-top: 95px;
}
.front .blank_picturee{
  color: grey;
  width: 185px;
  height: 278px;
  margin-top: 0;
  margin-left: 0;
}
.front .info_title_blank{
  font-size: 17px;
}
</style>
