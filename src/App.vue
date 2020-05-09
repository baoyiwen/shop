<template>
  <div id="App">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide,
  },
  computed: {
  },
   mounted () {
    // this.$store.dispatch('getAddress');
     this.getAddress();
     this.getUserInfo();
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo']),
  },
}
</script>

<style lang="stylus" ref="stylessheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
