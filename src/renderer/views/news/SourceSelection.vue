<template>
  <el-row>
    <img src="../../assets/newspaper_banner.jpg">
    <el-col :span="24">
      <div class="grid-content">
        <div class="jumbotron-perso">

          <div v-if="source">
            <h2>{{source.name}}</h2>
            <h3>{{source.description}}</h3>
          </div>
          <div v-else>
            <h2>Breaking News</h2>
            <h3>Les dernières nouvelles du moment, Hacker News pour l'informatique, IGN et Polygon pour les jeux vidéeos, National Geographic pour la nature, Reddit pour tout et nawak, The Wall Street Journal pour le sel, Google News, etc . . .</h3>
          </div>

          <div v-if="source">
            <el-row :gutter="20">
            <el-col :span="18"><div class="grid-content">
              <div class="selecteur">
                <!--<span style="color: #b9c1cf;" class="fa fa-list-alt"></span>-->
                <el-select v-model="value1" v-on:change="sourceChanged" no-match-text="Aucune données correspondante" no-data-text="Aucune données" filterable placeholder="Sélectionner une source ...">
                  <el-option
                    v-for="source in sources"
                    :key="source.id"
                    :label="source.name"
                    :value="source.id">
                  </el-option>
                </el-select>
              </div>
            </div></el-col>

            <el-col :span="6"><div class="grid-content">
                <el-button type="primary"><a v-bind:href="source.url" target="_blank" style="text-decoration: none; color:#fff;">Go to {{source.name}} Website</a></el-button>
            </div></el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row :gutter="20">
            <el-col :span="24"><div class="grid-content">
              <div class="selecteur">
                <!--<span style="color: #b9c1cf;" class="fa fa-list-alt"></span>-->
                <el-select v-model="value1" v-on:change="sourceChanged" no-match-text="Aucune données" filterable placeholder="Sélectionner une source ...">
                  <el-option
                    v-for="source in sources"
                    :key="source.id"
                    :label="source.name"
                    :value="source.id">
                  </el-option>
                </el-select>
              </div>
            </div></el-col>

            </el-row>
          </div>

      </div>
    </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'sourceselection',
    data () {
      return {
        sources: [],
        source: '',
        value1: ''
      }
    },
    methods: {
      sourceChanged: function (e) {
        for (var i=0; i<this.sources.length; i++){
          if (this.sources[i].id == e){
            this.source = this.sources[i];
          }
        }
        this.$emit('sourceChanged', e);
      }
    },
    created: function () {
      this.$http.get('https://newsapi.org/v1/sources?language=en')
        .then(response => {
          this.sources = response.data.sources;
        })
    }
  }
</script>

<style scoped>
.el-row{
  overflow: hidden;
}
.el-row img{
  width: 100%;
  position: absolute;
  z-index: -1;
  opacity: 0.2;
  height: 100%;
}

.jumbotron-perso{
  margin: 10px;
  /*background-color: rgba(255, 255, 255, 0.50);*/
  border-radius: 25px;
  padding: 10px;
}

.jumbotron-perso h2{
  margin: 0;
  color: black;
  font-weight: 400;
  text-align: center;
  margin: auto;
  font-size: 55px;
  font-family: Quicksand, sans-serif;
}
.jumbotron-perso h3{
  color: #444343;
  font-weight: 400;
  text-align: center;
  margin: auto;
  padding: 10px;
  font-size: 20px;
}
.form-select{
  display: inline-block;
  position: relative;
}
.selecteur .el-select{
  width: 100%;
}
</style>
