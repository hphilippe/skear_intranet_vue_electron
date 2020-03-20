<template>
  <div>
    <!-- TREE -->
    <div class="tree_container">
      <el-collapse accordion style="border:none;" class="colapse-bricole">
        <el-collapse-item name="1">
          <template slot="title" style="border:none;">
            <i class="el-icon-setting"></i> Filtre des Catégories
          </template>

          <div class="row">
            <div class="col-12">

              <div class="tree" id="tree">
                <ul>
                  <li>
                    <a href="#" v-on:click="idcategory = 1, categorySelect()"> {{categoryList[0].title}} <img v-bind:src="categoryList[0].pathlogoimage" style="width: 29px; max-height:29px;"></a>
                    <ul>
                      <li v-for="itemsEnfant1 in categoryList[0].idEnfant">
                        <a href="#" v-on:click="idcategory = itemsEnfant1.id, categorySelect()"> {{itemsEnfant1.title}} <img v-bind:src="itemsEnfant1.pathlogoimage" style="width: 29px; max-height:29px;"></a>
                        <ul v-if="itemsEnfant1.idEnfant.length > 0">
                          <li v-for="itemsEnfant2 in itemsEnfant1.idEnfant">
                            <a href="#" v-on:click="idcategory = itemsEnfant2.id, categorySelect()"> {{itemsEnfant2.title}} <img v-bind:src="itemsEnfant2.pathlogoimage" style="width: 29px; max-height:29px;"></a>
                            <ul v-if="itemsEnfant2.idEnfant.length > 0">
                              <li v-for="itemsEnfant3 in itemsEnfant2.idEnfant">
                                <a href="#" v-on:click="idcategory = itemsEnfant3.id, categorySelect()"> {{itemsEnfant3.title}} <img v-bind:src="itemsEnfant3.pathlogoimage" style="width: 29px; max-height:29px;"></a>
                                <ul v-if="itemsEnfant3.idEnfant.length > 0">
                                  <li v-for="itemsEnfant4 in itemsEnfant3.idEnfant">
                                    <a href="#" v-on:click="idcategory = itemsEnfant4.id, categorySelect()"> {{itemsEnfant4.title}} <img v-bind:src="itemsEnfant4.pathlogoimage" style="width: 29px; max-height:29px;"></a>
                                    <ul v-if="itemsEnfant4.idEnfant.length > 0">
                                      <li v-for="itemsEnfant5 in itemsEnfant4.idEnfant">
                                        <a href="#" v-on:click="idcategory = itemsEnfant5.id, categorySelect()"> {{itemsEnfant5.title}} <img v-bind:src="itemsEnfant5.pathlogoimage" style="width: 29px; max-height:29px;"></a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </el-collapse-item>
      </el-collapse>

    </div>

    <!-- Article -->
    <div class="dashboard-article" :gutter="20">
      <h5 class="title_special_form">Derniers Articles Postés</h5>

      <div class="row">
        <el-col :span="8" v-for="item in getarticles" :key="item.id" class="col-12 col-sm-6 col-lg-4 col-xl-3">
          <router-link style="text-decoration: none;" :to="{ name: 'Article', params: { name: item.title }}">
          <div class="grid-content">

          <div class="card-article">
            <div class="card-header">
              <h3>{{item.title}}</h3>
            </div>

            <div class="card-content">
              <div class="projects">

              </div>
            </div>

            <div class="card-article-footer">
              <div class="card-footer-content">
                <div class="profile">
                  <div class="profile-group">
                    <div class="name">{{item.categoryarticle.title}}</div>
                    <div class="job">Auteur: {{item.user.username}}</div>
                  </div>
                </div>
                <div class="skills">
                  <div class="skills-group">
                    <div class="skill">
                      <img v-bind:src="item.categoryarticle.pathlogoimage"  width="50px" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-img">
              <img v-bind:src="item.user.pathavatar" alt="" />
            </div>
            <div class="container-background">
              <img v-bind:src="item.pathcoverimage">
            </div>
          </div>

          </div>
          </router-link>
        </el-col>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'articlelist',
  data(){
    return {
      categoryList:[],
      HTMLcontent: null,
      idcategory:[],
      listidCategory:[],
      totalItemCategory:0,
      totalItemCount:0,
      getarticles:[],
    }
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

    // Router
    navigateTo: function (nav) {
      this.$router.go({
          path: nav
      })
    },

    // Category selected
    categorySelect: function(){
      var self = this;
      this.listidCategory = [];
      this.totalItemCount = 0;
      this.listidCategory.push(this.idcategory);
      self.recursiveTreeSelect(this.categoryList);
      // setTimeout(function(){ self.getArticles() }, 500);
    },
    recursiveTreeSelect: function(element){
      var self = this;
      for (var i = 0; i < element.length; i++) { // compte le nombre d'enfant
        this.totalItemCount = this.totalItemCount + 1; // ajoute 1 à chaque rentré dans un enfant
        if(this.listidCategory.includes(element[i].id)){ // check si ID categorie cliqué correspond à id catégorie du for
          for (var j = 0; j < element[i].idEnfant.length; j++) { // récupère tous les id enfants et les mets dans l'array
            this.listidCategory.push(element[i].idEnfant[j].id)
          }
          if(element[i].idEnfant.length > 0){ // check si il y a encore des enfants pour cette catégorie
            this.recursiveTreeSelect(element[i].idEnfant); // relance la fonction avec le nouvelle enfant tree
          } else {
            if(this.totalItemCount == this.totalItemCategory){ // compare en fin de bout d'un tree, si le nombre de catégorie total correpond au nombre de catégorie compter dans cette fonction récursive
              this.getArticles(); // lance la récupération des articles
            }
          }
        } else {
          if(element[i].idEnfant.length > 0){
            this.recursiveTreeSelect(element[i].idEnfant);
          } else {
            if(this.totalItemCount == this.totalItemCategory){
              this.getArticles();
            }
          }
        }
      }
    },

    // COUNT All category in the TREE
    counterTreeCategory: function(element){
      var self = this;
      for (var i = 0; i < element.length; i++) {
        this.totalItemCategory = this.totalItemCategory + 1;
        if(element[i].idEnfant.length > 0){
          this.counterTreeCategory(element[i].idEnfant);
        }
      }
    },

    // GETTER Article by Array ID
    getArticles: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/articles', {
              params: {
                  'categoryarticle.id': this.listidCategory,
                  'order[id]': 'desc'
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.getarticles = response.data["hydra:member"];
              self.finishLoader();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    // GETTER All Article
    getAllArticles: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/articles', {
              params: {
                  'order[createdAt]': 'desc'
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.getarticles = response.data["hydra:member"];
              self.finishLoader();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    // GETTER categoryarticle
    getCategory: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/categoryarticles', {
              params: {
                  id: 1,
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.categoryList = response.data["hydra:member"];
              self.finishLoader();
              self.getMouseWheel();
              self.counterTreeCategory(self.categoryList);
              self.getAllArticles();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    getMouseWheel: function(){
      function scrollHorizontally(e) {
          e = window.event || e;
          var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
          document.getElementById('tree').scrollLeft -= (delta*80); // Multiplied by 40
          e.preventDefault();
      }
          // IE9, Chrome, Safari, Opera
          // document.getElementById('tree').addEventListener("mousewheel", scrollHorizontally, false);
          setTimeout(function(){ document.getElementById('tree').addEventListener("mousewheel", scrollHorizontally, false); }, 1500);
          // Firefox
          // document.getElementById('tree').addEventListener("DOMMouseScroll", scrollHorizontally, false);
    },
  },
  created(){
    // this.getContent();
    this.getCategory();
  }
}
</script>

<style>
.dashboard-article{
  margin: 0 34px;
}
.tree_container{
  margin: 0 34px;
  margin-bottom: 15px;
}
.title_special_form{
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: quicksand;
  text-align: center;
}
/* Overwrite ui element */
.colapse-bricole .el-collapse-item__header{
  border: none;
}
.colapse-bricole .el-collapse-item__wrap {
  border: none;
}
.colapse-bricole .el-collapse-item__content{
  padding-bottom: 0px;
}

/* TREE */
.tree {
  white-space: nowrap;
  overflow: auto;
}

.tree ul {
  padding-top: 20px;
  padding-left: 0px;
  position: relative;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  /*added for long names*/

  float: none;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  margin: 0 -2px 0 -2px;
}
/*We will use ::before and ::after to draw the connectors*/

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}
/*We need to remove left-right connectors from elements without
any siblings*/

.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}
/*Remove space from the top of single children*/

.tree li:only-child {
  padding-top: 0;
}
/*Remove left connector from first child and
right connector from last child*/

.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/

.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}
/*Time to add downward connectors from parents*/

.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
}

.tree li a {
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-decoration: none;
  color: #666;
  font-family: arial, verdana, tahoma;
  font-size: 11px;
  display: inline-block;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}
/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/

.tree li a:hover,
.tree li a:hover+ul li a {
  background: #c8e4f8;
  color: #000;
  border: 1px solid #94a0b4;
}
/*Connector styles on hover*/

.tree li a:hover+ul li::after,
.tree li a:hover+ul li::before,
.tree li a:hover+ul::before,
.tree li a:hover+ul ul::before {
  border-color: #94a0b4;
}

.husband {
  float: left;
}

.wife {
  margin-left: 10px;
}

.wife::before {
  /* pseudo CSS, will need to be modified */

  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}

/* Card ui */
.card-article {
  background: #2d2d2d;
  position: relative;
  /*height: 175px;
  width: 330px;*/
  max-height: 200px;
  z-index: 0;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: all 300ms ease-in-out;
  border: solid 1px black;
  margin: 15px 0;
}

.card-article:hover {
  filter: brightness(120%);
  transition: all 300ms ease-in-out;
}

.card-article .card-header {
  background: transparent;
  padding: 10px 20px 0px 20px;
  width: 90%;
  height: 80px;
  line-height: 25px;
}
.card-article .card-header h3 {
  color: #fff;
  font-size: 1.1rem;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.65);
  margin: 0;
}

.card-article .card-content {
  position: relative;
  height: 160px;
  width: 100%;
}

.card-article .projects {
  background: transparent;
  width: 100%;
  height: 100%;
}

.card-article .project {
  position: relative;
  display: block;
  float: left;
  height: 112px;
  width: 30%;
  margin-left: 1.6666%;
  margin-right: 1.6666%;
  overflow: hidden;
}
.card-article .project img {
  width: 100%;
}
.card-article .project:hover .project-details {
  top: 85%;
  opacity: 1;
}
.card-article .project .project-details {
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 100%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: top .5s ease, opacity .3s ease;
  -moz-transition: top .5s ease, opacity .3s ease;
  transition: top .5s ease, opacity .3s ease;
}
.card-article .project .project-details p {
  color: #fff;
}

.card-article .card-article-footer {
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  position: absolute;
  height: 60px;
  width: 100%;
  bottom: 0;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 0 0 10px 10px;
  -moz-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.card-article .profile {
  width: 80%;
  float: left;
  margin-top: 7px;
}
.card-article .profile .profile-group {
  margin-left: 105px;
}
.card-article .profile .name {
  font-size: 1.3rem;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
  text-transform: capitalize;
  margin-bottom: 5px;
}
.card-article .profile .job {
  color: #a5a5a5;
  position: relative;
  margin-top: -5px;
  margin-left: 10px;
  font-size: 0.9rem;
}

.card-article .skills {
  width: 20%;
  float: right;
}
.card-article .skills .skills-group {
  float: right;
  padding: 10px;
}
.card-article .skills .skill {
  width: 40px;
  height: 40px;
  float: left;
  margin-right: 2px;
}
.card-article .skills .skill img {
  width: 100%;
}

.card-article .card-img {
  background: #f9f9f9;
  border: 2px solid #111;
  position: absolute;
  bottom: -8px;
  left: 15px;
  width: 75px;
  height: 75px;
  float: left;
  -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.7);
  -o-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.card-article .card-img img {
  width: 100%;
  height: 100%;
}

.card-article .container-background {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  z-index: -1;
}

.card-article .container-background img {
  height: 100%;
  width: 100%;
}

</style>
