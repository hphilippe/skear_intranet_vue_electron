<template>
  <div>
    <el-menu background-color="#324157" :router="true" text-color="#bfcbd9" default-active="2" class="el-menu-vertical-demo colapse-bricole" unique-opened :collapse="isCollapse">
      <el-menu-item index="1" style="margin-left: 2px;" :route="{name:'Acceuil'}">
        <i class="fa fa-home fa-lg"></i>
        <span slot="title">Acceuil</span>
      </el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">Articles</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Sports</span>
          <el-menu-item index="2-1" :route="{name:'Acceuil'}">Ski/Snowboard</el-menu-item>
          <el-menu-item index="2-2" :route="{name:'Acceuil'}">Badminton</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Langues">
          <el-menu-item index="2-3" :route="{name:'Acceuil'}">Japonais</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4" :route="{name:'Acceuil'}">
          <span slot="title">Développement</span>
          <el-menu-item index="2-4-1" :route="{name:'Acceuil'}">PHP</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="11" :route="{name:'Articlelist'}" >
        <i class="el-icon-document"></i>
        <span slot="title">Articles</span>
      </el-menu-item>
      <el-menu-item index="3" :route="{name:'Shows'}" >
        <i class="fa fa-film fa-lg font-awesome-icon"></i>
        <span slot="title">Movies / Tv Shows</span>
      </el-menu-item>
      <el-menu-item index="4" style="margin-left: 3px;" :route="{name:'Profilelist'}">
        <i class="fa fa-user-o fa-lg font-awesome-icon"></i>
        <span slot="title">Profile Movie / Shows</span>
      </el-menu-item>
      <el-menu-item index="5" style="margin-left: 1px;" :route="{name:'Communaute'}">
        <i class="fa fa-users fa-lg font-awesome-icon"></i>
        <span slot="title">Communautés</span>
      </el-menu-item>
      <el-menu-item index="6" :route="{name:'World'}">
        <i class="el-icon-location-outline"></i>
        <span slot="title">Tour du monde</span>
      </el-menu-item>
      <el-menu-item index="7" :route="{name:'News'}">
        <i class="fa fa-newspaper-o fa-lg font-awesome-icon"></i>
        <span slot="title">News du monde</span>
      </el-menu-item>
      <el-menu-item index="8" style="margin-left: 2px;"  :route="{name:'Favoris'}">
        <i class="fa fa-star fa-lg font-awesome-icon"></i>
        <span slot="title">Favoris</span>
      </el-menu-item>
      <el-menu-item index="9" style="margin-left: 2px;"  :route="{name:'Desktop'}">
        <i class="fa fa-windows fa-lg font-awesome-icon"></i>
        <span slot="title">PC Ssytem</span>
      </el-menu-item>
      <el-menu-item index="10" style="margin-left: 2px;"  :route="{name:'Jira'}">
        <i class="fa fa-ticket fa-lg font-awesome-icon"></i>
        <span slot="title">Ticket Jira / Bug</span>
      </el-menu-item>
      <el-menu-item index="12" style="margin-left: 2px;"  :route="{name:'Skearspace'}">
        <i class="fa fa-space-shuttle fa-lg font-awesome-icon"></i>
        <span slot="title">Space Skear</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'sidebar',
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style scoped>
.colapse-bricole{
  width: 50px;
  margin-left: -11px;
  height: 100%;
  border-right: none;
}

.font-awesome-icon{
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  margin-left: 0;
  height: 100%;
}
.el-menu--collapse {
  width: 50px;
  margin-left: -11px;
  height: 100%;
}
</style>
