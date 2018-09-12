<template>
  <v-card color="dark">
        
    <div class="card-with-image" v-if="item.urlToImage">
      <v-img
        :src="item.urlToImage"
        height="200px"
      >
        <div class="right-floated-content">
          <v-icon>keyboard_arrow_right</v-icon>
        </div>
        
        <v-container
          fill-height
          fluid
          pa-2
        >
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="date-text white--text">{{fmtDate(item.publishedAt)}}</span>
              <span class="headline white--text">{{item.description === null ? item.title : shortenText(item.title, 50)}}</span>
              <span class="description white--text">{{shortenText(item.description, 80)}}</span>
            </v-flex>
          </v-layout>
        </v-container>

      </v-img>
    </div>

    <div class="image-less-card" v-else>
      <v-container
        fill-height
        fluid
        pa-2
      >
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="date-text">{{fmtDate(item.publishedAt)}}</span>
            <span class="headline">{{!item.description ? item.title : shortenText(item.title, 50)}}</span>
            <span class="description">{{shortenText(item.description, 80)}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    

  </v-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    shortenText (str, maxLength) {
      if (typeof str === 'string' && typeof maxLength === 'number') {
        return str.length > maxLength ? str.split('').splice(0, maxLength).join('') + '...' : str
      }
      return str
    },
    fmtDate (dStr) {
      if (dStr && typeof dStr === 'string') {
        let d = new Date(dStr)
        let day = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()
        
        if (day < 10) {
          day = `0${day}`
        }
        if (month < 10) {
          month = `0${month}`
        }
        return `${day}.${month}.${year}`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headline, .description {
  font-weight: normal;
  color: #2E2EFE;
}
.headline .white--text {
  color: #ffffff;
}
.description {
  display: block;
  font-size: 1em;
  font-weight: normal;
}
span.date-text {
  display: block;
  font-size: 1em;
  color: #0074D9;
  font-weight: normal;
  text-shadow: 0 0 1px #ffffff;
}
.card-with-image .flex, .image-less-card .flex {
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: darken;
  min-height: 14.2em;
}
.image-less-card .flex {
  background-color: #ffffff;
}
</style>
