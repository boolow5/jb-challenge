<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="text-xs-center">
        <v-menu offset-y>
          <v-btn
            slot="activator"
            color="primary"
            dark
          >
            Filter by source
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, index) in $store.getters.newsSources"
              :key="index"
              @click="selectSource(item.id)"
              :class="item.id === $store.getters.selectedSource ? 'active' : ''"
            >
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      
    </v-toolbar>
    <v-content>
      <NewsList/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import NewsList from './components/NewsList'
import {news} from './services'

export default {
  name: 'App',
  components: {
    NewsList
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'News',
      errMessage: ''
    }
  },
  methods: {
    selectSource (sourceID) {
      // eslint-disable-next-line
      console.log('selectSource', sourceID)
      this.$store.dispatch('setSelectedSource', sourceID)
    },
    getLatestNews () {
      news.getNewsItems().then(resp => {
        // eslint-disable-next-line
        console.log('news response', resp)
        let self = this
        if (resp.data && resp.data.status === 'ok') {
          self.$store.dispatch('setNewsItems', resp.data.articles)
          self.updateSourceList()
        }
      }).catch(err => {
        // eslint-disable-next-line
        console.log('news error', err.toString())
        this.errMessage = err.toString()
      })
    },
    updateSourceList () {
      let list = [
        {id: '', name: 'All'}
      ]
      let nonDuplicates = {}
      for (var i = 0; i < this.$store.getters.newsItems.length; i++) {
        if (this.$store.getters.newsItems[i].source && this.$store.getters.newsItems[i].source.id) {
          nonDuplicates[this.$store.getters.newsItems[i].source.id] = this.$store.getters.newsItems[i].source
        }
      }
      for (let key in nonDuplicates) {
        list.push(nonDuplicates[key])
      }
      this.$store.dispatch('setNewsSources', list)
    }
  },
  beforeMount () {
    this.getLatestNews()
  }
}
</script>

<style scoped>
.v-list .active {
  background-color: lightblue;
}
</style>
