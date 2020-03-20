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

    <el-dialog title="Configuration du film" :visible.sync="dialogFormUpdatelist">
      <el-form :model="form">
        <el-form-item label="Commentaire" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.comment" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Liste choisis" :label-width="formLabelWidth">
          <el-select v-model="form.listval" placeholder="Sélectionner une liste">
            <el-option v-for="item in getlists" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Note" :label-width="formLabelWidth">
          <el-rate
            v-model="form.ratevalue"
            :max="10"
            :texts="['1 pts', '2 pts', '3 pts', '4 pts', '5 pts', '6 pts', '7 pts', '8 pts', '9 pts', '10 pts']"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            show-text>
          </el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormUpdatelist = false, onSubmit(form)">Confirm</el-button>
        <el-button @click="dialogFormUpdatelist = false">Cancel</el-button>
        <el-button style="float:left" type="danger" @click="dialogFormUpdatelist = false, ondelete(form)">Supprimer l'élément</el-button>
      </span>
    </el-dialog>

    <el-tabs :tab-position="tabPosition">
      <el-tab-pane v-for="itempan in getCompletedLists" :key="itempan.id">
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
                <!--<div v-html="renderNote(item.id, item.media_type)"></div>-->
                <div v-if="item.media_type == 'movie'">
                  <div v-for="itemmovie in getAllRatedMovies">
                    <div v-if="itemmovie.id == item.id">
                      <el-rate
                        v-model="itemmovie.account_rating.value/2"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} pts">
                      </el-rate>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-for="itemserie in getAllRatedSeries">
                    <div v-if="itemserie.id == item.id">
                      <el-rate
                        v-model="itemserie.account_rating.value/2"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} pts">
                      </el-rate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info_wrapper">
              <div class="front">
                <div v-if="item.poster_path == 'erased'" class="blanke_img" style="pointer-events: none;cursor: default;">
                  <i class="blank_picturee fa fa-trash fa-5x" aria-hidden="true">
                  </br>
                  <div class="info_title_blank">
                    l'item a été Supprimé
                  </div>
                  </i>
                </div>
                <div v-else-if="item.poster_path != null" @click="dialogFormUpdatelist = true, clickform(item.id, item.media_type, itempan.comments['movie:'+item.id], itempan.comments['tv:'+item.id], itempan.id)">
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
      startnumb : 0,
      tabPosition: 'top',
      accountId: '',
      accessToken : '',
      apikey : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWVhOTVjMjBhMTM3ODY2MDEwYTQ1M2RlYzNkNDg0MSIsInN1YiI6IjU5ZjcxZTAwOTI1MTQxNDJhYTAzMjIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jmvPxs1yyWlVv0_Pf-YJRUMC1v8zqapRi-MOhEeCwY',
      apikeyV3: '19ea95c20a137866010a453dec3d4841',
      sessionid :'',
      getlists :[],
      getCompletedLists : [],
      getAllRatedMovies : [],
      getAllRatedSeries : [],
      commentState : true,
      headerCardState : true,
      noteState : false,
      listeMovieNoteDisplayNot : [],
      // dialog form
      dialogFormUpdatelist : false,
      pastRatevalue : 0,
      pastComment :'',
      pastListval :'',
      form: {
        comment: '',
        listval: '',
        ratevalue : 0,
        idmedia: '',
        mediatype:''
      },
      formLabelWidth: '120px'
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

    // avoir toutes les listes (completed, dropped, etc)
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
              self.getlists = response.data.results;
              self.getAllCompletedList();
              self.getRatedMovies();
              self.getRatedSeries();
          })
          .catch(function (error) {
              alert(error);
          });
    },
    // avoir toutes la liste des films et série
    getAllCompletedList : function(){
      var self = this;
      self.getlists.forEach(function(element){
        self.$http.get('https://api.themoviedb.org/4/list/'+ element.id, {
              params: {
                  page: 1,
                  language : 'fr'
              },
              headers: {'Authorization': 'Bearer '+self.apikey}
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
                      headers: {'Authorization': 'Bearer '+self.apikey}
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
    // avoir toutes les notes des films
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
    // avoir toutes les notes des séries
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
    // afficher ou déssaficher le commentaire des cards
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
    // afficher ou déssaficher le header des cards
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
    clickform(idmedia,mediatype,commovie,comtv,idlist){
      var self = this;
      this.form.idmedia = idmedia;
      this.form.mediatype = mediatype;
      // id de la liste
      this.form.listval = idlist;
      this.pastListval = idlist;
      // textarea
      if(commovie != undefined){
        this.form.comment = commovie
        this.pastComment = commovie
      } else if (comtv != undefined){
        this.form.comment = comtv
        this.pastComment = comtv
      } else {
        this.form.comment = ''
        this.pastComment = ''
      }
      // rate
      if (mediatype == 'movie'){
        this.getAllRatedMovies.forEach(function(itemmovie){
          if(itemmovie.id == idmedia){
            self.form.ratevalue = itemmovie.account_rating.value;
            self.pastRatevalue = itemmovie.account_rating.value;
          }
        })
      } else {
        this.getAllRatedSeries.forEach(function(itemserie){
          if(itemserie.id == idmedia){
            self.form.ratevalue = itemserie.account_rating.value;
            self.pastRatevalue = itemserie.account_rating.value;
          }
        })
      }
    },

    // submit du formulaire d'update des films
    onSubmit(form) {
      var self = this;
      // si le commentaire à changé
      if (this.pastComment != form.comment){
        var commentaire = null
        if(form.comment != ''){
          commentaire = form.comment
        } else {
          commentaire = null
        }
        var contentsend = {"items": [{"media_type": form.mediatype, "media_id": form.idmedia, "comment":commentaire}]}
        this.$http.put('https://api.themoviedb.org/4/list/'+this.pastListval+'/items', contentsend, {
            headers: { 'Authorization': 'Bearer '+this.accessToken }
          })
          .then(response => {
            if(response.data.results[0].success == true){
              this.$notify({
                title: 'Success',
                message: 'Commentaire: "'+ form.comment +'" a été modifié',
                type: 'success'
              });
            }
            // mise à jour des commentaire la liste actuel
            for (var i = 0; i < this.getCompletedLists.length; i++) {
              this.getCompletedLists[i].comments[form.mediatype+':'+form.idmedia] = form.comment;
            }
          }, response => {
            alert(response);
          });
      }

      // si la note à été changé
      if (this.pastRatevalue != form.ratevalue){
        // si c'est un film
        if(form.mediatype = 'movie'){
            var contentsend = {"value": form.ratevalue}
            this.$http.post('https://api.themoviedb.org/3/movie/'+form.idmedia+'/rating', contentsend, {
                params: {
                    api_key: this.apikeyV3,
                    session_id : this.sessionid
                }
              })
              .then(response => {
                var state = false;
                self.getAllRatedMovies.forEach(function(element,key){
                  if(element.id == form.idmedia){
                    self.getAllRatedMovies[key].account_rating.value = form.ratevalue

                    self.$notify({
                      title: 'Success',
                      message: 'La note à été modifié pour : '+ form.ratevalue+ ' pts',
                      type: 'success'
                    });
                    state = true;
                  }
                })
                if (state == false) {
                  this.$notify({
                    title: 'Success',
                    message: 'La note de ; '+ form.ratevalue + ' pts à été ajouté en serveur (veuillez reload la page pour faire apparaitre)',
                    type: 'success'
                  });
                }
              }, response => {
                alert(response);
              });
        }

        // si c'est une série
        else
        {
          var contentsend = {"value": form.ratevalue}
          this.$http.post('https://api.themoviedb.org/3/tv/'+form.idmedia+'/rating', contentsend, {
              params: {
                  api_key: this.apikeyV3,
                  session_id : this.sessionid
              }
            })
            .then(response => {
              var state = false;
              self.getAllRatedSeries.forEach(function(element,key){
                if(element.id == form.idmedia){
                  self.getAllRatedSeries[key].account_rating.value = form.ratevalue

                  self.$notify({
                    title: 'Success',
                    message: 'La note à été modifié pour : '+ form.ratevalue+ ' pts',
                    type: 'success'
                  });
                  state = true;
                }
              })
              if (state == false) {
                this.$notify({
                  title: 'Success',
                  message: 'La note de ; '+ form.ratevalue + ' pts à été ajouté en serveur (veuillez reload la page pour faire apparaitre)',
                  type: 'success'
                });
              }

            }, response => {
              alert(response);
            });
        }
      }

      // si le film à changé de liste
      if (this.pastListval != form.listval){
        var contentsend = {"items": [{"media_type": form.mediatype, "media_id": form.idmedia}]}
        this.$http.post('https://api.themoviedb.org/4/list/'+form.listval+'/items', contentsend, {
            headers: { 'Authorization': 'Bearer '+this.accessToken }
          })
          .then(response => {
            if(response.data.results[0].success == true){

              // changement de liste
              this.$http.delete('https://api.themoviedb.org/4/list/'+this.pastListval+'/items', {data: contentsend, headers: { 'Authorization': 'Bearer '+this.accessToken }})
              .then(response => {
                if(response.data.results[0].success == true){
                     this.$notify({
                       title: 'Success',
                       message: "l'item à changé de liste",
                       type: 'success'
                     });
                     var itemselect = []
                     var commentselect = []
                     // delete dans la liste actuel
                     for (var i = 0; i < this.getCompletedLists.length; i++) {
                       for (var j = 0; j < this.getCompletedLists[i].results.length; j++) {
                         if(this.getCompletedLists[i].results[j].id == form.idmedia){
                           if(this.getCompletedLists[i].id == this.pastListval){
                             // clonage de l'objet
                             itemselect=JSON.parse(JSON.stringify(this.getCompletedLists[i].results[j]))
                             if(form.mediatype == 'movie'){
                               commentselect.splice(["movie:"+form.idmedia],0,this.getCompletedLists[i].comments["movie:"+form.idmedia]);
                             }else {
                               commentselect.splice(["tv:"+form.idmedia],0,this.getCompletedLists[i].comments["tv:"+form.idmedia]);
                             }
                             this.getCompletedLists[i].results[j].poster_path = "erased"
                          }
                         }
                       }
                     }
                     // move le nouveau item dans la nouvelle liste avec l'assignation du commentaire
                     for (var i = 0; i < this.getCompletedLists.length; i++) {
                       if(this.getCompletedLists[i].id == form.listval){
                         var o1 = this.getCompletedLists[i].comments;
                         this.getCompletedLists[i].comments = Object.assign(o1, commentselect);
                         this.getCompletedLists[i].results.push(itemselect);
                         console.log(this.getCompletedLists);
                       }
                     }
                     // commentaire update en serveur
                     if (form.comment){
                       var commentaire = null
                       if(form.comment != ''){
                         commentaire = form.comment
                       } else {
                         commentaire = null
                       }
                       var contentsend = {"items": [{"media_type": form.mediatype, "media_id": form.idmedia, "comment":commentaire}]}
                       this.$http.put('https://api.themoviedb.org/4/list/'+form.listval+'/items', contentsend, {
                           headers: { 'Authorization': 'Bearer '+this.accessToken }
                         })
                         .then(response => {

                         }, response => {
                           alert(response);
                         });
                     }
                   } else {
                     this.$notify.error({
                       title: 'Erreur',
                       message: "l'item n'est pas dans la liste"
                     });
                   }
              }, response => {
                alert(response);
              });
            }

          }, response => {
            alert(response);
          });
      }
    },
    // delete un item
    ondelete(form) {
      var contentsend = {"items": [{"media_type": form.mediatype, "media_id": form.idmedia}]}

      this.$http.delete('https://api.themoviedb.org/4/list/'+this.pastListval+'/items', {data: contentsend, headers: { 'Authorization': 'Bearer '+this.accessToken }})
      .then(response => {
        if(response.data.results[0].success == true){
             this.$notify({
               title: 'Success',
               message: 'A été supprimé de la liste',
               type: 'success'
             });
             // delete dans la liste actuel
             for (var i = 0; i < this.getCompletedLists.length; i++) {
               for (var j = 0; j < this.getCompletedLists[i].results.length; j++) {
                 if(this.getCompletedLists[i].results[j].id == form.idmedia){
                   this.getCompletedLists[i].results[j].poster_path = "erased"
                 }
               }
             }
           } else {
             this.$notify.error({
               title: 'Erreur',
               message: "l'item n'est pas dans la liste"
             });
           }
      }, response => {
        alert(response);
      });

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
    this.accountId = window.localStorage.accountidimdb
    this.accessToken = window.localStorage.tokenimdb
    this.getLists();
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
/* surcharge Ui element*/
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
