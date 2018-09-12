const state = {
  items: [],
  newsSources: [],
  selectedSource: ''
}

const getters = {
  newsItems (state) {
    return state.items
  },
  newsFilteredBySourceID (state) {
    return (sourceID) => {
      return state.items.filter((item) => {
        return item.source && item.source.id === sourceID
      })
    }
  },
  newsSources (state) {
    return state.newsSources
  },
  selectedSource (state) {
    return state.selectedSource
  }
}

const mutations = {
  setNewsItems (state, payload) {
    if (typeof payload === 'object' && payload.constructor.name === 'Array') {
      state.items = payload
    }
  },
  setNewsSources (state, payload) {
    if (typeof payload === 'object' && payload.constructor.name === 'Array') {
      state.newsSources = payload
    }
  },
  setSelectedSource (state, payload) {
    state.selectedSource = payload
  }
}

const actions = {
  setNewsItems (context, payload) {
    context.commit('setNewsItems', payload)
  },
  setNewsSources (context, payload) {
    context.commit('setNewsSources', payload)
  },
  setSelectedSource (context, payload) {
    context.commit('setSelectedSource', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
