<template>
  <div>
    <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
    <Newslist v-bind:source="source"></Newslist>
  </div>
</template>

<script>
import SourceSelection from './SourceSelection'
import Newslist from './Newslist'

export default {
  name: 'news',
  components: {
    SourceSelection,
    Newslist
  },
  data () {
    return {
      source: ""
    }
  },
  methods: {
    sourceChanged: function (source){
      this.source = source;
    }
  }
}
</script>

<style scoped>

</style>
