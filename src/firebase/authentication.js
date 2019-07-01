import firebase from 'firebase/app'
import { isNil } from 'lodash'

import store from '@/store'

const WHITE_LIST = process.env.VUE_APP_WHITE_LIST.split(',')

firebase.auth().onAuthStateChanged(firebaseUser => {
  console.log(WHITE_LIST, process.env)
  const actionToDispatch =
    isNil(firebaseUser) || !WHITE_LIST.includes(firebaseUser.email)
      ? 'logout'
      : 'login'
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser)
})
