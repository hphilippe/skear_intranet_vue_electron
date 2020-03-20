<template>
  <div>

    <div class="panel-body">
      <!-- Header -->
      <div class="hero">
        <input type="text" style="color:white;background: transparent;border: none;position: absolute;" placeholder="lien url de l'image" v-model="pathcoverimage"></input >
        <img class="article_cover_image" v-bind:src="pathcoverimage">
        <div class="article_background">
          <h1><input type="text" style="color:white;background: transparent;border: none; width:100%; text-align:center;" placeholder="Titre de l'article" v-model="title"></input ></h1>
        </div>
      </div>
      <div class="article_grand_user">
        <p class="article-affiche-user">
          <img style="width: 100px; height:100px;" v-bind:src="user.pathavatar">
        </p>
      </div>
      <div class="article_grand_user" style="margin-top: 53px;">
        <p class="article-affiche-user">
          <strong>{{user.username}}</strong>
        </p>
      </div>
      <!-- Body -->
      <div class="col-sm-12">
        <br>
        <h5 class="pull-left"></i><strong>Catégorie:</strong>
          <el-select style="z-index: 999;" v-model="categorychoose" filterable placeholder="Select">
            <el-option
              v-for="item in categoryarticle"
              :key="item['@id']"
              :label="item.title"
              :value="item['@id']">
            </el-option>
          </el-select>
        </h5>
        <h5 class="pull-right"><strong>Publication:</strong> {{datenow | moment("MMMM Do YYYY") }}</h5>

        <div style="margin-top: 86px;">
          <quill-editor class="quill-code" v-model="content"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </div>

      <div class="col-sm-12" style="margin-top: 10px;">
        <el-button type="primary" class="pull-right"  @click="createArticle()" icon="el-icon-edit-outline"> Créer l'Article</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import VueRouter from 'vue-router';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'

export default {
  name: 'newarticle',
  components: {
    quillEditor
  },
  data(){
    return {
      pathcoverimage:'',
      title:'',
      categorychoose:'',
      datenow:new Date().toISOString().slice(0, 10),
      content:'',
      user:{
        pathavatar:window.localStorage.pathavatar,
        username:window.localStorage.user,
      },
      categoryarticle:[],
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
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

    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },

    // GETTER categoryarticle
    getCategory: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/categoryarticles', {
              params: {
                  'order[id]': "asc",
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.categoryarticle = response.data["hydra:member"];
              self.finishLoader();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    // CREATE Article
    createArticle(){
      var self = this;
      var router = new VueRouter();
      if(this.title == ""){
        alert("vous n'avez pas mis de titre")
      } else if (this.content == ""){
        alert("vous n'avez pas de mis de contenue")
      } else if (this.pathcoverimage ==""){
        alert("vous n'avez pas mis d'image d'arrière plan")
      } else if (this.categorychoose == ""){
        alert("vous n'avez pas choisi de catégorie")
      } else {
        this.$confirm('Voulez vous créer cette article ?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.startLoader();
          // content
          var contentsend = {"title": this.title, "content": this.content , "pathcoverimage": this.pathcoverimage, "published": true, "user": window.localStorage.useridpost , "categoryarticle": this.categorychoose}
          // post
          this.$http.post('http://www.skear.fr/server/web/api/articles', contentsend, {
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
            })
            .then(response => {
              this.$notify({
                title: 'Success',
                message: 'L\'article à été créé',
                type: 'success'
              });
              this.$router.push('/')
              self.finishLoader();
            }, error => {
              alert(error);
              self.finishLoader();
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });
      }
    },
  },
  created(){
    this.getCategory();
  }
}
</script>

<style scoped>
.hero {
  height: 308px;
  margin: 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  /*border-top-left-radius: 5px;
  border-top-right-radius: 5px;*/
}
.article-affiche-user{
  font-weight: 400;
}
.article-affiche-user img{
  width: 54px;
  height: 54px;
  border-radius: 50px;
  box-shadow: 0 1px 9px #e0e0e0, inset 0 0 2px hsla(0,0%,84%,.75);
  padding: 3px;
  margin-right: 5px;
  vertical-align: top;
}
.article-affiche-user span{
  color: #9e9e9e;
  margin-left: 4px;
}
.article_cover_image{
  width: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}
.article_grand_user{
  z-index: 9;
  position: absolute;
  margin-top: -51px;
  width: 100%;
  margin-left: -39px;
  text-align: center;
}
.article_background{
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.34);
  width: 100%;
  height: 100%;
  padding-top: 140px;
}
/* Quill code */
.quill-code {
  border: none;
  height: auto;
}
.quill-code > code {
  width: 100%;
  margin: 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0;
  height: 10rem;
  overflow-y: auto;
  resize: vertical;
}

</style>
