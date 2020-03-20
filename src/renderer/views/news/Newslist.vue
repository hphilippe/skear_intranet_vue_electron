<template>

  <div>
    <div class="media_show" v-for="article in articles">
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content">
          <a v-bind:href="article.url" target="_blank">
            <img class="media-object" v-bind:src="article.urlToImage">
          </a>
        </div></el-col>
        <el-col :span="20"><div class="grid-content">
          <h5 class="media-heading">
            <a v-bind:href="article.url" target="_blank">{{article.title}}</a>
          </h5>
          <h6><i>by {{article.author}}</i></h6>
          <p>{{article.description}}</p>
        </div></el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'newslist',
    props: ['source'],
    data () {
      return {
        articles: []
      }
    },
    methods: {
      updateSource: function (source) {
        if(source != ''){
          this.$http.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=be73900dc97e4a00a20612f6f3d65a75')
            .then (response => {
              this.articles = response.data.articles;
            });
        }
      }
    },
    created: function() {
      this.updateSource(this.source);
    },
    watch: {
      source: function (val) {
        this.updateSource(val);
      }
    }
  }
</script>

<style scoped>
.media_show{
  margin: 10px;
}
.media_show img{
  opacity: 1;
  z-index: 1;
  position: relative;
  max-width: 167px;
  max-height: 113px;
}
.media-heading a {
  text-decoration: none;
}
.grid-content h5{
  margin: 0;
}
</style>
