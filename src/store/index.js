import Vue from 'vue'
import Vuex from 'vuex'
import commits from './commits'
import tags from './tags'
import channels from './channels'
import historic from './historic'
import authentication from './authentication'
import app from './app'
import categories from './categories'

Vue.use(Vuex)

/* If you don't know about Vuex, please refer to https://vuex.vuejs.org/ */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    commits,
    channels,
    tags,
    historic,
    authentication,
    app,
    categories
  }
})
