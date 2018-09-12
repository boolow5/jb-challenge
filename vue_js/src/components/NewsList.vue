<template>
  <div class="news-list-wrapper">
    <v-layout justify-center>
      <v-flex xs12>
  
        <v-card>
          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap>
              <v-flex
                v-for="item in newsItems"
                xs12
                sm6
                md4
                lg3
                :key="item.title"
              >
                <a :href="item.url" target="_blank">
                  <NewsItem :item="item" />
                </a>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import NewsItem from './NewsItem'

export default {
  name: 'NewsList',
  props: {
    msg: String
  },
  computed: {
    newsItems () {
      if (this.$store.getters.selectedSource === '') {
        return this.$store.getters.newsItems
      } else {
        return this.$store.getters.newsFilteredBySourceID(this.$store.getters.selectedSource)
      }
    }
  },
  components: {
    NewsItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-list-wrapper a {
  text-decoration: none;
}
.image-less-card .right-floated-content, .right-floated-content {
  float: right;
}
</style>
