<template>
  <div>
    <el-menu class="electron-navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <levelbar></levelbar>

      <div class="clock">
        <p class="date">{{ date }}</p>
        <p class="time">{{ time }}</p>
      </div>

      <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <!--<img class="user-avatar" src="~@/assets/logoSkear.png">-->
                <img class="user-avatar" src="https://media1.tenor.com/images/fbfb281c743e0d4cd3d964072bb219dc/tenor.gif?itemid=4893408">
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class='inlineBlock' style="text-decoration: none;" :to="{ name: 'Profile'}">
                    <el-dropdown-item>
                        <i class="fa fa-user-circle-o fa-lg"></i> Profile
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided><span v-on:click="disconnect" style="display:block;"><i class="fa fa-power-off fa-lg"></i> Déconnexion</span></el-dropdown-item>
                <el-dropdown-item><span v-on:click="close" style="display:block;"><i class="fa fa-window-close fa-lg"></i> Fermer l'application</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown style="right: 105px;" class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                  <!--<img class="user-avatar" src="~@/assets/logoSkear.png">-->
                  <img class="user-avatar" src="https://i1.wp.com/gifrific.com/wp-content/uploads/2015/05/Dipper-Pines-Im-Pretending-to-Write-Something-Down-Gravity-Falls.gif?ssl=1">
                  <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu class="user-dropdown" slot="dropdown">
                  <router-link class='inlineBlock' style="text-decoration: none;" :to="{ name: 'Newarticle'}">
                      <el-dropdown-item>
                          <i class="fa fa-pencil-square-o fa-lg"></i> Écrire un article
                      </el-dropdown-item>
                  </router-link>
                  <el-dropdown-item><span style="display:block;"><i class="fa fa-cogs fa-lg"></i> Gestion des catégories article</span></el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Hamburger from '@/components/Hamburger';
  import auth from '@/components/login/auth'
  import Levelbar from './Levelbar'

  const remote = require('electron').remote

  export default {
    name: 'navbar',
    components: {
      Hamburger,
      Levelbar
      // auth
    },

    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },

    data() {
      return {
        w: remote.getCurrentWindow(),
        time: '',
        date: ''
      }
    },

    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },

      close() {
        window.localStorage.responsiveStartVoice == 1
        this.w.close()
      },

      disconnect(){
        auth.logout();
      },

      /* clock */
      updateTime() {
          var week = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
          var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
          var cd = new Date();
          this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
          //this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
          this.date = week[cd.getDay()] + '-' + this.zeroPadding(cd.getDate(), 2) + '-' + monthNames[cd.getMonth()] + '-' + this.zeroPadding(cd.getFullYear(), 4);
          setTimeout(this.updateTime, 1000);
      },

      zeroPadding(num, digit) {
          var zero = '';
          for(var i = 0; i < digit; i++) {
              zero += '0';
          }
          return (zero + num).slice(-digit);
      }
    },

    created: function () {
      /*launch clock*/
      this.updateTime()
    }
  }

</script>

<style scoped>

.electron-navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
}
.electron-navbar .hamburger-container {
  padding: 0 10px;
}
.electron-navbar .errLog-container {
  display: inline-block;
  position: absolute;
  right: 150px;
}
.electron-navbar .screenfull {
  position: absolute;
  right: 90px;
  top: 16px;
  color: red;
}
.electron-navbar .avatar-container:focus{
  outline: inherit;
}
.electron-navbar .avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 35px;
}
.electron-navbar .avatar-container .avatar-wrapper {
  cursor: pointer;
  margin-top: 5px;
  position: relative;
}
.electron-navbar .avatar-container .avatar-wrapper img{
  vertical-align: initial;
}
.electron-navbar .avatar-container .avatar-wrapper .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.electron-navbar .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
.link{
  text-decoration: none;
}

/*-- Clock --*/

.clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  right: 51px;
  top: 26px;
  transform: translate(-50%, -50%);
  color: #000000;
  /* color: #daf6ff; */
  text-shadow: 0 0 20px #000000, 0 0 20px rgba(10, 175, 230, 0);
  /* text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0); */
}
.clock .time {
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 16px;
}
.clock .date {
  letter-spacing: 0.1em;
  margin: 0;
  line-height: 25px;
}

.clock:focus{
  outline: none;
}


</style>
