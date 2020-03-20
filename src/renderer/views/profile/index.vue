<template>
  <div>
    <div class="col-12">
      <h5 class="title_special_form" style="margin: 16px;">Profile de l'utilisateur</h5>
    </div>
    <div class="col-12">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="Username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Nom et Prénom">
          <el-input v-model="form.fullname"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Métier/Poste">
          <el-input v-model="form.work"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Lien Avatar">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <!-- <el-form-item
          v-for="(domain, index) in form.domains"
          :label="'Domain' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: 'domain can not be null', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">Delete</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Enregistrer</el-button>
          <el-button @click="onReset">Reset</el-button>
          <!-- <el-button @click="addDomain()">New domain</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="col-12">
      <div style="margin:42px;">
        <el-switch
          style="height: 42px;"
          v-model="responsiveVoiceState"
          v-on:change="stateVoice()"
          active-text="Activer la voix qui parle"
          inactive-text="Désactiver la voix">
        </el-switch>
      </div>
    </div>
    <div class="col-12">
      <el-form ref="form2" :model="form2" >
        <p style="color: red;"> Attention, modifier les tokens que si elle ne marche plus pour la récupération des données film, série etc</p>
        <el-form-item label="Token du compte sur le site IMDB (film, série, ...)">
          <el-input v-model="form2.tokenimdb"></el-input>
        </el-form-item>
        <el-form-item label="ID du compte sur le site IMDB">
          <el-input v-model="form2.accountidimdb"></el-input>
        </el-form-item>
        <el-form-item label="Session ID du compte sur le site IMDB">
          <el-input v-model="form2.sessionidimdb"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit2">Enregistrer</el-button>
          <el-button @click="onReset">Reset</el-button>
          <!-- <el-button @click="addDomain()">New domain</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          fullname:'',
          description:'',
          work:'',
          email:'',
          avatar:'',
          // domains: [{
          //   key: 1,
          //   value: ''
          // }],
        },
        form2:{
          tokenimdb:'',
          accountidimdb:'',
          sessionidimdb:'',
        },
        responsiveVoiceState:0,
        // user:[],
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

      // Get users
      getUser: function(){
        var self = this;
        this.startLoader();
        this.$http.get('http://www.skear.fr/server/web/api/users', {
              params: {
                  'id': window.localStorage.userid,
              },
              headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(function (response) {
              // self.user = response.data["hydra:member"][0];
              self.form.username = response.data["hydra:member"][0].username;
              self.form.fullname = response.data["hydra:member"][0].fullname;
              self.form.description = response.data["hydra:member"][0].description;
              self.form.work = response.data["hydra:member"][0].occupation;
              self.form.email = response.data["hydra:member"][0].email;
              self.form.avatar = response.data["hydra:member"][0].pathavatar;
              self.form2.tokenimdb = response.data["hydra:member"][0].tokenimdb;
              self.form2.accountidimdb = response.data["hydra:member"][0].accountidimdb;
              self.form2.sessionidimdb = response.data["hydra:member"][0].sessionidimdb;
              self.finishLoader();
          })
          .catch(function (error) {
              alert(error);
              self.finishLoader();
          });
      },

      // Voice
      stateVoice: function(){
        if(this.responsiveVoiceState == false){
          window.localStorage.responsiveVoiceState = 0;
          this.$notify({
            title: 'Success',
            message: 'Jarvette à été activé',
            type: 'success'
          });
        } else {
          window.localStorage.responsiveVoiceState = 1;
          this.$notify({
            title: 'Success',
            message: 'Jarvette à été désactivé',
            type: 'success'
          });
        }
      },

      // submit
      onSubmit() {
        this.startLoader();
        var contentsend = {"email": this.form.email, "fullname": this.form.fullname, "description": this.form.description, "occupation": this.form.work, "pathavatar": this.form.avatar ,"username":this.form.username}
        // post
        this.$http.put('http://www.skear.fr/server/web/api/users/'+window.localStorage.userid, contentsend, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(response => {
            this.$notify({
              title: 'Success',
              message: 'Les informations ont été modifiés',
              type: 'success'
            });
            self.finishLoader();
          }, error => {
            alert(error);
            self.finishLoader();
          });
      },
      onSubmit2() {
        this.startLoader();
        var contentsend = {"tokenimdb": this.form2.tokenimdb, "accountidimdb": this.form2.accountidimdb, "sessionidimdb": this.form2.sessionidimdb}
        // post
        this.$http.put('http://www.skear.fr/server/web/api/users/'+window.localStorage.userid, contentsend, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.token}
          })
          .then(response => {
            this.$notify({
              title: 'Success',
              message: 'Les informations ont été modifiés',
              type: 'success'
            });
            self.finishLoader();
          }, error => {
            alert(error);
            self.finishLoader();
          });
      },

      onReset() {
        this.getUser();
      },
    },
    created: function () {
      this.responsiveVoiceState = window.localStorage.responsiveVoiceState;
      this.getUser();
    },
    // removeDomain(item) {
    //   var index = this.form.domains.indexOf(item);
    //   if (index !== -1) {
    //     this.form.domains.splice(index, 1);
    //   }
    // },
    // addDomain() {
    //   this.form.domains.push({
    //     key: Date.now(),
    //     value: ''
    //   });
    // }
  }
</script>

<style scoped>

.title_special_form{
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: quicksand;
  text-align: center;
}

</style>
