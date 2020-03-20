<template>
  <div class="row">

    <div class="col-12 col-sm-6 col-md-4 card_commu" v-for="item in getusers">
      <div v-if="item.username != 'skear'">
        <router-link :to="{ name: 'Communautelist', params: { name: item.username }}">
        <div class="card_comu-communaute">
          <div class="card_comu-header">
            <h1>{{item.fullname}}</h1>
            <router-link :to="{ name: 'Communautelist', params: { name: item.username }}"><img v-bind:src="item.pathavatar" alt="" target="_blank" class="avatar"></router-link>
          </div>

          <div class="card_comu-body">
            <p>{{item.description}}</p>
          </div>

          <div class="card_comu-footer">
            <h3>username : <span>{{item.username}}</span><br>métier : <span>{{item.occupation}}</span></h3>
            <ul class="list-unstyled">
              <li><a href="#"><i class="fa fa-fw fa-linkedin"></i> Linkedin</a></li>
            </ul>
            <!--<hr class="card_comu-bar">
            <p class="cf">
              <small>
              <a class="align-left share" href="#"><i class="fa fa-fw fa-share"></i> share</a>
              <a href="#" class="align-right alert">report <i class="fa fa-fw fa-exclamation"></i></a>
              </small>
            </p>-->
          </div>
        </div> <!--end card_comu-->
        </router-link>
      </div>
    </div>

</div>

</template>

<script>

export default {
  name: 'communaute',
  data(){
    return {
      getusers:[]
    }
  },
  methods:{
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

    // GETTER user
    getUsers(){
      var self = this;
      this.startLoader();
      this.$http.get('http://www.skear.fr/server/web/api/users', {
          headers: {'Authorization': 'Bearer ' + window.localStorage.token}
        })
        .then(function (response) {
          self.getusers = response.data["hydra:member"];
          self.finishLoader();
        })
        .catch(function (error) {
            alert(error);
            self.finishLoader();
        });
    },
  },
  created(){
    // launch api rest
    this.getUsers();
  }
}
</script>

<style scoped>
.card_commu a{
  text-decoration: none;
  color: black;
}
.card_comu-communaute h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
  line-height: normal;
  font-weight: normal;
}
.card_comu-communaute h1 {
  font-size: 2rem;
}
.card_comu-communaute h2, h3 {
  font-size: 1.2rem;
}
.card_comu-communaute h3 {
  margin-bottom: .5em;
}
.card_comu-communaute a {
  color: #2196F3;
  text-decoration: none;
}
.card_comu-communaute a:hover {
  color: #0960a5;
}
.card_comu-communaute ul {
  margin: 0;
  padding: 0;
}
.card_comu-communaute ul.list-unstyled {
  list-style: none;
  list-position: outside;
}
.card_comu-communaute .card_comu-bar {
  height: 0;
  box-sizing: content-box;
  margin-top: 1em;
  margin-bottom: 1em;
  border: 0;
  border-top: 1px solid #eee;
}
.card_comu-communaute .align-left {
  float: left;
}
.card_comu-communaute .align-right {
  float: right;
}
.card_comu-communaute .cf:after {
  content: " ";
  display: table;
  height: 10px;
}
.card_comu-communaute .share {
  color: #BBDEFB;
  transition: all 150ms ease-in-out;
}
.card_comu-communaute .share:hover {
  color: #2196F3;
}

.card_comu-communaute .alert {
  color: #E91E63;
  opacity: 0.5;
  transition: all 150ms ease-in-out;
}
.card_comu-communaute .alert:hover {
  color: #E91E63;
  opacity: 1;
}

.card_comu-communaute {
  max-width: 320px;
  margin: 1em auto 3em;
  border: 1px solid #d0cbca;
  background: url(../../assets/giphy.gif);
  transition: all 150ms ease-in-out;
  border-radius: 10px;
  font-weight: normal;
  font-family: "Titillium Web", serif;
  text-align: center;
}
.card_comu-communaute:hover {
  border-color: #0960a5;
  box-shadow: 0 1px 40px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.card_comu-communaute .card_comu-header {
  text-align: center;
  padding: 1em;
  transition: all 150ms ease-in-out;
}
.card_comu-communaute .card_comu-header:hover {
  filter: brightness(120%);
}
.card_comu-communaute .card_comu-header h1, .card_comu-communaute .card_comu-header h2 {
  color: white;
  margin: 0;
  line-height: 1.25;
}
.card_comu-communaute .card_comu-header h2 {
  margin-bottom: 1em;
}
.card_comu-communaute .card_comu-header img.avatar {
  border-radius: 50%;
  height: auto;
  margin: 10px;
  max-width: 128px;
  height: 128px;
  transition: all 150ms ease-in-out;
  margin-bottom: -50px;
  box-shadow: 0 1px 9px #e0e0e0, inset 0 0 2px hsla(0,0%,84%,.75);
}
.card_comu-communaute .card_comu-header img.avatar:hover {
  border-radius: 10%;
}
.card_comu-communaute .card_comu-header.header_hover {
  background: #0960a5;
}
.card_comu-communaute .card_comu-header.header_hover img.avatar {
  background: #0960a5;
}
.card_comu-communaute.card_comu_hover {
  border-color: #0960a5;
}
.card_comu-communaute .card_comu-body {
  background: #fff;
  padding: 1em;
  padding-bottom: 1px;
  box-shadow: 0px -1px 9px 0px #e0e0e0, inset 0 0 0px hsla(0,0%,84%,.75);
  padding-top: 18px;
  /*transition: all 150ms ease-in-out;*/
}
.card_comu-communaute .card_comu-body p{
  margin: 1.3em 0 0 0;
}
/*.card_comu-communaute .card_comu-body:hover {
  box-shadow: 0px -3px 28px 0px #e0e0e0, inset 0 0 0px hsla(0,0%,84%,.75);
  transition: all 150ms ease-in-out;
}*/
.card_comu-communaute .card_comu-footer {
  background: #fff;
  padding: 1em;
  padding-bottom: 1px;
}
.card_comu-communaute .card_comu-footer span {
  font-style: italic;
}
.card_comu-communaute .card_comu-body + .card_comu-footer {
  padding-top: 0;
  padding-bottom: 1em;
}
.card_comu-communaute .card_comu-footer.closure {
  text-align: center;
  font-size: 12px;
  color: #868686;
}
.card_comu-communaute .card_comu-footer{
  border-radius: 0 0 9px 9px;
}
.card_comu-body p:before {
    content: "\f10d";
    font-family: 'Fontawesome';
    margin-right: 5px;
    font-size: 14px;
}

</style>
