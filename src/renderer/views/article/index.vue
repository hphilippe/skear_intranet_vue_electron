<template>
  <div>

    <div class="panel-body">
      <!-- Header -->
      <div class="hero">
        <img class="article_cover_image" v-bind:src="article.pathcoverimage">
        <div class="article_background">
          <h1>{{article.title}}</h1>
        </div>
      </div>
      <div class="article_grand_user">
    		<p class="article-affiche-user">
    			<img style="width: 100px; height:100px;" v-bind:src="article.user.pathavatar">
  			</p>
    	</div>
      <div class="article_grand_user" style="margin-top: 53px;">
        <p class="article-affiche-user">
          <strong>{{article.user.username}}</strong>
        </p>
      </div>
      <!-- Body -->
      <div class="col-sm-12">
        <br>
        <h5 class="pull-left"></i><strong>Catégorie:</strong> {{article.categoryarticle.title}}</h5>
        <h5 class="pull-right"><strong>Publication:</strong> {{article.createdAt | moment("MMMM Do YYYY") }}</h5>

        <div style="margin-top: 86px;" v-html="article.content"></div>

      </div>

      <!-- Footer -->
      <div class="panel-footer" style="margin-bottom: 50px;">
        <div class="col-sm-12">
          <div class="pull-right">
              <el-button type="primary" icon="el-icon-delete" @click="formArticleDelete()"> Supprimer l'article</el-button>
          </div>
          <div class="pull-left">
              <router-link style="text-decoration: none;" :to="{ name: 'Updatearticle', params: { name: article.title }}"><el-button type="primary" icon="el-icon-edit"> Éditer l'article</el-button></router-link>
              <el-button type="primary"  @click="dialogFormComment = true, createComment()" icon="el-icon-edit-outline"> Nouveau Commentaire pour l'article</el-button>
          </div>
        </div>
      </div>

      <!-- Comment -->
       <!-- <div class="col-sm-12">
         <hr>
           <form>
             <div class="form-group">
               <label>Commentaire</label>
               <textarea required class="form-control" ></textarea>
             </div>
               <button type="button" class="btn btn-primary btn-sm" style="margin-left:5px;">Nouveau Commentaire</button>
           </form>
       </div> -->


       <div class="col-sm-12">
         <hr>
         <h3>Commentaires</h3>
       </div>

        <div class="col-sm-12" style="display: inline-block; min-height: 62px;" v-for="comment in comments">
           <div class="comment_article">
             <div class="article-affiche-user"><img v-bind:src="comment.user.pathavatar"> {{comment.user.username}} <span>{{comment.createdAt | moment("MMMM Do YYYY")}}</span>
               <p class="article-affiche-comment">{{comment.content}}</p>
               <div class="article-affiche-comment-button" v-if="comment.user.id == authorCommentId">
                 <el-button class="pull-right" icon="el-icon-delete" @click="commentItem = comment, formDelete()"></el-button>
                 <el-button class="pull-right" icon="el-icon-edit"  @click="commentItem = comment, dialogFormCommentUpdate = true, updateComment()" style="margin-right:5px;"></el-button>
               </div>
             </div>
           </div>
       </div>

    </div>

    <!-- add task -->
    <el-dialog title="Création d'un Post It" :visible.sync="dialogFormComment">
      <el-form ref="form" :model="formComment">
        <el-form-item label="Contenues">
          <el-input type="textarea" :rows="4" placeholder="Contenues du Post It" v-model="formComment.commentContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitComment">Créer</el-button>
          <el-button style="float:right;" @click="dialogFormComment = false">Annuler</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- add task -->
    <el-dialog title="Création d'un Post It" :visible.sync="dialogFormCommentUpdate">
      <el-form ref="form" :model="formComment">
        <el-form-item label="Contenues">
          <el-input type="textarea" :rows="4" placeholder="Contenues du Post It" v-model="formComment.commentContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitCommentUpdate">Mette à jour</el-button>
          <el-button style="float:right;" @click="dialogFormCommentUpdate = false">Annuler</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
import VueRouter from 'vue-router';

export default {
  name: 'skearspace',
  data(){
    return {
      formComment: {
      commentContent: '',
      commentAuthor : window.localStorage.useridpost,
      },
      authorCommentId: window.localStorage.userid,
      nameArticle:'',
      article:[],
      comments:[],
      commentItem:[],
      dialogFormComment:false,
      dialogFormCommentUpdate:false
    }
  },
  computed: {

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

    // GETTER Article by name
    getArticles: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/articles', {
              params: {
                  'title': this.nameArticle,
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.article = response.data["hydra:member"][0];
              self.getComments();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    // GETTER Comment by id article
    getComments: function() {
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/commentarticles', {
              params: {
                  'order[id]': "asc",
                  'article.id': this.article.id,
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              self.comments = response.data["hydra:member"];
              self.finishLoader();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
    },

    // Comment created
    createComment(){
      // init variable
      this.formComment.commentContent ='';
    },
    // CREATE Comment
    onSubmitComment: function() {
        var self = this;
        this.startLoader();
        // content
        var contentsend = {"content": this.formComment.commentContent, "user": this.formComment.commentAuthor, "article": this.article['@id']}
        // post
        this.$http.post('http://www.skear.fr/server/web/api/commentarticles', contentsend, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(response => {
            this.dialogFormComment = false;
            this.$notify({
              title: 'Success',
              message: 'Le commentaire à été créé',
              type: 'success'
            });
            this.getComments();
          }, error => {
            alert(error);
            self.finishLoader();
          });
    },

    // comment UPDATE
    updateComment(){
      this.formComment.commentContent = this.commentItem.content;
    },
    // Update comment
    onSubmitCommentUpdate(){
      var self = this;
      this.startLoader();
      var contentsend = {"content": this.formComment.commentContent, "user": this.formComment.commentAuthor, "article": this.article['@id']}
      // post
      this.$http.put('http://www.skear.fr/server/web/api/commentarticles/'+this.commentItem.id, contentsend, {
          headers: {'Authorization': 'Bearer ' + window.localStorage.token}
        })
        .then(response => {
          this.dialogFormCommentUpdate = false;
          this.$notify({
            title: 'Success',
            message: 'Le commentaire à été modifié',
            type: 'success'
          });
          this.getComments();
        }, error => {
          alert(error);
          self.finishLoader();
        });
    },

    // Comment DELETE
    formDelete(){
      var self = this;
      this.$confirm('Ceci supprimera définitivement le commentaire. Continuer?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.startLoader();
        this.$http.delete('http://www.skear.fr/server/web/api/commentarticles/'+this.commentItem.id, {
           headers: {
             'Authorization': 'Bearer '+window.localStorage.token }
           })
          .then(response => {
            this.$message({
              type: 'success',
              message: 'Commentaire Supprimé'
            });
            this.getComments();
          }, response => {
            alert(response);
            self.finishLoader();
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },

    // Article DELETE
    formArticleDelete(){
      var self = this;
      var router = new VueRouter();
      this.$confirm('Ceci supprimera définitivement l\'article. Continuer?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.startLoader();
        this.$http.delete('http://www.skear.fr/server/web/api/articles/'+this.article.id, {
           headers: {
             'Authorization': 'Bearer '+window.localStorage.token }
           })
          .then(response => {
            self.finishLoader();
            this.$message({
              type: 'success',
              message: 'article Supprimé'
            });
            this.$router.push('/')
          }, response => {
            alert(response);
            self.finishLoader();
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },

  },
  created: function () {
    this.nameArticle = this.$route.params.name;
    this.getArticles();
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
.article-affiche-comment{
  margin-left: 66px;
  margin-top: -26px;
}
.article-affiche-comment-button{
  margin-top: -57px;
}

</style>
