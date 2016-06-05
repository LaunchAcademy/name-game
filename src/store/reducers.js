import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

import { guessReducer } from '../modules/Guess'
import manageIdentities from '../modules/Identity'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    identities: manageIdentities,
    guesses: guessReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
