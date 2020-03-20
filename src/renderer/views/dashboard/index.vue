<template>
<div>
  <!-- Article -->
  <div class="dashboard-article" :gutter="20">
    <h5 class="title_special_form">Derniers Articles Postés</h5>

    <el-col :span="8" v-for="item in getarticles.slice(0, 3)" :key="item.id">
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

  <!-- POST IT  -->
  <div class="dashboard-article" :gutter="20">
    <el-col :span="12"><div class="grid-content">
      <h5 class="top_space title_special_form">Mes Post It <i class="icon-hover fa fa-plus-circle" @click="dialogFormPostIt = true, postitIdAuthorState = true, createPostIt()"></i></h5>
      <el-tabs>
        <el-tab-pane v-for="item in getMynote" :key="item.id">
          <span slot="label">
              {{item.title}} (lvl {{item.priority}})
          </span>
              <pre><p v-html="item.content"></p></pre>
              <div class="acceuil_task_icon">
                <i style="float:left" class="icon-hover fa fa-edit fa-lg" @click="postItItem = item, updatePostIt(), dialogFormPostItUpdate = true"></i>
                <p style="display: -webkit-inline-box; color:#008DFF;" v-if="item.priority < 3">Defcon Skear Level {{item.priority}}</p>
                <p style="display: -webkit-inline-box; color:#00D200;" v-else-if="item.priority < 5">Defcon Skear Level {{item.priority}}</p>
                <p style="display: -webkit-inline-box; color:rgb(216, 216, 0);" v-else-if="item.priority < 7">Defcon Skear Level {{item.priority}}</p>
                <p style="display: -webkit-inline-box; color:#FF6501;" v-else-if="item.priority < 9">Defcon Skear Level {{item.priority}}</p>
                <p style="display: -webkit-inline-box; color:#FF0000;" v-else>Defcon Skear Level {{item.priority}}</p>
                <i style="float:right" class="icon-hover fa fa-trash fa-lg" @click="postItItem = item, formDelete()"></i>
              </div>
        </el-tab-pane>
      </el-tabs>
    </div></el-col>
    <el-col :span="12"><div class="grid-content">
       <!-- <todo-list></todo-list> -->
       <h5 class="top_space title_special_form">SKEAR Post It <i class="icon-hover fa fa-plus-circle" @click="dialogFormPostIt = true, postitIdAuthorState = false, createPostIt()"></i></h5>
       <el-tabs>
         <el-tab-pane v-for="item in getSkearnote" :key="item.id">
           <span slot="label">
               {{item.title}} (lvl {{item.priority}})
           </span>
               <pre><p v-html="item.content"></p></pre>
               <div class="acceuil_task_icon">
                 <i style="float:left" class="icon-hover fa fa-edit fa-lg" @click="postItItem = item, updatePostIt(), dialogFormPostItUpdate = true"></i>
                 <p style="display: -webkit-inline-box; color:#008DFF;" v-if="item.priority < 3">Defcon Skear Level {{item.priority}}</p>
                 <p style="display: -webkit-inline-box; color:#00D200;" v-else-if="item.priority < 5">Defcon Skear Level {{item.priority}}</p>
                 <p style="display: -webkit-inline-box; color:rgb(216, 216, 0);" v-else-if="item.priority < 7">Defcon Skear Level {{item.priority}}</p>
                 <p style="display: -webkit-inline-box; color:#FF6501;" v-else-if="item.priority < 9">Defcon Skear Level {{item.priority}}</p>
                 <p style="display: -webkit-inline-box; color:#FF0000;" v-else>Defcon Skear Level {{item.priority}}</p>
                 <i style="float:right" class="icon-hover fa fa-trash fa-lg" @click="postItItem = item, formDelete()"></i>
               </div>
         </el-tab-pane>
       </el-tabs>

    </div></el-col>
  </div>

  <!-- add task -->
  <el-dialog title="Création d'un Post It" :visible.sync="dialogFormPostIt">
    <el-form ref="form" :model="formPostIt">
      <el-form-item label="Titre">
        <el-input placeholder="Titre du Post It" v-model="formPostIt.postitTitle"></el-input>
      </el-form-item>
      <el-form-item label="Contenues">
        <el-input type="textarea" :rows="4" placeholder="Contenues du Post It" v-model="formPostIt.postitContent"></el-input>
      </el-form-item>
      <el-form-item label="Priorité (0 à 10)">
      <el-input-number v-model="formPostIt.postitPriority" :min="0" :max="10"></el-input-number>
      </el-form-item>
      <div style="display:none;">
        <el-input v-model="formPostIt.postitIdAuthor" :disabled="true"></el-input>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmitPostIt">Créer</el-button>
        <el-button style="float:right;" @click="dialogFormPostIt = false">Annuler</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- add task -->
  <el-dialog title="Mise à jour du Post It" :visible.sync="dialogFormPostItUpdate">
    <el-form ref="form" :model="formPostIt">
      <el-form-item label="Titre">
        <el-input placeholder="Titre du Post It" v-model="formPostIt.postitTitle"></el-input>
      </el-form-item>
      <el-form-item label="Contenues">
        <el-input type="textarea" :rows="4" placeholder="Contenues du Post It" v-model="formPostIt.postitContent"></el-input>
      </el-form-item>
      <el-form-item label="Priorité (0 à 10)">
      <el-input-number v-model="formPostIt.postitPriority" :min="0" :max="10"></el-input-number>
      </el-form-item>
      <div style="display:none;">
        <el-input v-model="formPostIt.postitIdAuthor" :disabled="true"></el-input>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmitUpdatePostIt">Modifier</el-button>
        <el-button style="float:right;"  @click="dialogFormPostItUpdate = false">Annuler</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>

<script>
  // import todoList from '@/components/TodoList'

  export default {
    name: 'dashboard',
    components:{
      // todoList
    },
    data(){
      return {
        formPostIt: {
        postitTitle: '',
        postitContent: '',
        postitPriority: 0,
        postitIdAuthor: '',
        },
        postitIdAuthorState: false,
        dialogFormPostIt: false,
        dialogFormPostItUpdate: false,
        postItItem:[],
        getMynote :[],
        getSkearnote:[],
        getarticles:[]
      }
    },
    methods:{
      // loader
      startLoader: function(){
        if(window.localStorage.responsiveStartVoice == 1){
          document.addEventListener('DOMContentLoaded', function() {
             document.getElementById('loader').style.display = 'flex';
          }, false);
        } else {
          if (document.readyState === "complete") {
            document.getElementById('loader').style.display = 'flex';
          } else {
            document.addEventListener('DOMContentLoaded', function() {
               document.getElementById('loader').style.display = 'flex';
            }, false);
          }
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

      // GETTER Article
      getArticles(){
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/articles', {
            params: {
                "order[createdAt]": 'desc',
                "nbItems": 3
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

      // Post It CREATE
      createPostIt(){
        this.formPostIt.postitTitle = ''
        this.formPostIt.postitContent = ''
        this.formPostIt.postitPriority = 0
        this.formPostIt.postitIdAuthor = ''
      },
      onSubmitPostIt() {
        var self = this;
        this.startLoader();
        // check skear ou user
        if(this.postitIdAuthorState == true){
          this.formPostIt.postitIdAuthor = window.localStorage.useridpost
        } else {
          this.formPostIt.postitIdAuthor = window.localStorage.skearidpost
        }
        // content
        var contentsend = {"title": this.formPostIt.postitTitle, "content": this.formPostIt.postitContent, "priority": this.formPostIt.postitPriority, "user": this.formPostIt.postitIdAuthor}
        // post
        this.$http.post('http://www.skear.fr/server/web/api/tasks', contentsend, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(response => {
            if(this.formPostIt.postitPriority > 7){
              responsiveVoice.speak('defcon max! Okay, nuclear weapons are ready.', "UK English Female", {volume: window.localStorage.responsiveVoiceVolume});
            }
            this.dialogFormPostIt = false;
            this.$notify({
              title: 'Success',
              message: 'Le Post It ' + this.formPostIt.postitTitle + ' à été créé',
              type: 'success'
            });
            this.getMyNote();
            this.getSkearNote();
          }, error => {
            alert(error);
          });
      },

      // post IT UPDATE
      updatePostIt(){
        this.formPostIt.postitTitle = this.postItItem.title
        this.formPostIt.postitContent = this.postItItem.content
        this.formPostIt.postitPriority = this.postItItem.priority
        this.formPostIt.postitIdAuthor = this.postItItem.user['@id']
      },
      onSubmitUpdatePostIt(){
        this.startLoader();
        var contentsend = {"title": this.formPostIt.postitTitle, "content": this.formPostIt.postitContent, "priority": this.formPostIt.postitPriority, "user": this.formPostIt.postitIdAuthor}
        // post
        this.$http.put('http://www.skear.fr/server/web/api/tasks/'+this.postItItem.id, contentsend, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(response => {
            if(this.formPostIt.postitPriority > 7){
              responsiveVoice.speak('defcon max! Okay, nuclear weapons are ready.', "UK English Female", {volume: window.localStorage.responsiveVoiceVolume});
            }
            this.dialogFormPostItUpdate = false;
            this.$notify({
              title: 'Success',
              message: 'Le Post It ' + this.formPostIt.postitTitle + ' à été modifié',
              type: 'success'
            });
            this.getMyNote();
            this.getSkearNote();
          }, error => {
            alert(error);
          });
      },

      // Post It DELETE
      formDelete(){
        var self = this;
        this.$confirm('Ceci supprimera définitivement le fichier \"'+this.postItItem.title+'\". Continuer?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.startLoader();
          this.$http.delete('http://www.skear.fr/server/web/api/tasks/'+this.postItItem.id, {
             headers: {
               'Authorization': 'Bearer '+window.localStorage.token }
             })
            .then(response => {
              this.$message({
                type: 'success',
                message: 'Post It Supprimé'
              });
              this.getMyNote();
              this.getSkearNote();
            }, response => {
              alert(response);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });
      },

      // GETTER all note
      getMyNote: function() {
          var self = this;
          this.startLoader();
          this.$http.get('http://www.skear.fr/server/web/api/tasks', {
                params: {
                    "user.id": window.localStorage.userid,
                },
                headers: {'Authorization': 'Bearer ' + window.localStorage.token}
            })
            .then(function (response) {
              self.getMynote = response.data["hydra:member"];
              self.finishLoader();
            })
            .catch(function (error) {
                alert(error);
                self.finishLoader();
            });
      },
      getSkearNote: function() {
          var self = this;
          this.startLoader();
          this.$http.get('http://www.skear.fr/server/web/api/tasks', {
                params: {
                    "user.id": window.localStorage.skearid,
                },
                headers: {'Authorization': 'Bearer ' + window.localStorage.token}
            })
            .then(function (response) {
              self.getSkearnote = response.data["hydra:member"];
              self.finishLoader();
            })
            .catch(function (error) {
                alert(error);
                self.finishLoader();
            });
      }
    },
    created(){
      // var todos = JSON.parse(localStorage.getItem('todos'));
      // var text = ''
      // todos.forEach(function(element){
      //   text = text + element.text+', '
      // })

      // launch api rest
      this.getMyNote();
      this.getSkearNote();
      this.getArticles();

      // start app
      if(window.localStorage.responsiveVoiceState == 1 && window.localStorage.responsiveStartVoice == 1){
        // responsive voice
        responsiveVoice.speak('Bienvenue commandant ' + window.localStorage.user, "UK English Female", {volume: window.localStorage.responsiveVoiceVolume});
        window.localStorage.responsiveStartVoice = 0;
      }
    }
  }
</script>

<style scoped>

.dashboard-article{
  margin-top: 10px;
}

.top_space{
  margin: 30px auto 0;
}

.title_special_form{
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: quicksand;
  text-align: center;
}

/*-- task --*/
.acceuil_task_icon{
  /* border: solid 1px; */
  height: 29px;
  padding: 6px;
  border-radius: 25px;
  margin-top: 5px;
  text-align: center;
}
.icon-hover{
  cursor: pointer;
}

/*-- surcharge element ui --*/

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;

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
