export const ACTION_PREFIX = 'nameGame/identities'

export const RECEIVE_GUESS = `${ACTION_PREFIX}/RECEIVE_GUESS`
export const CORRECT_GUESS = `${ACTION_PREFIX}/CORRECT_GUESS`
export const INCORRECT_GUESS = `${ACTION_PREFIX}/INCORRECT_GUESS`
export const PRELOAD_NEXT_GUESS = `${ACTION_PREFIX}/PRELOAD_NEXT_GUESS`

import _ from 'lodash'
import { RECEIVE_IDENTITIES } from './Identity'

export function guessReceived(identity, name){
  return {
    'type': RECEIVE_GUESS,
    'identity': identity,
    'guessedName': name
  }
}

export function receiveGuess(identity, name) {
    return (dispatch) => {
      dispatch(guessReceived(identity, name))
      if(identity.name === name) {
        return dispatch(correctGuess(identity))
      }
      else {
        return dispatch(incorrectGuess(name))
      }
  }
}

export function preloadNextGuessImage(){
  return {
    'type': PRELOAD_NEXT_GUESS
  }
}
export function correctGuess(identity) {
  return (dispatch) => {
    dispatch(preloadNextGuessImage())
    return dispatch({
      'type': CORRECT_GUESS,
      'identity': identity
    })
  }

}

export function incorrectGuess(guess) {
  return {
    'type': INCORRECT_GUESS,
    'guessedName': guess
  }
}

export const actions = {
  guessReceived,
  receiveGuess,
  correctGuess,
  incorrectGuess
}

export const INITIAL_STATE = {
  correctCount: 0,
  incorrectCount: 0,
  lastGuess: null,
  guessedIdentities: [],
  identitiesToGuess: []
}

export default function (state = INITIAL_STATE, action){
  if(action.type === CORRECT_GUESS){
    return {
      ...state,
      correctCount: state.correctCount + 1,
      guessedIdentities: [...state.guessedIdentities, action.identity],
      lastGuess: {
        correct: true,
        name: action.identity.name
      },
      identitiesToGuess: state.identitiesToGuess.filter((id) => {
        return id.name !== action.identity.name
      })
    }
  }
  else if(action.type === RECEIVE_IDENTITIES){
    return {
      ...state,
      identitiesToGuess: _.shuffle(action.payload)
    }
  }
  else if(action.type === INCORRECT_GUESS){
    return {
      ...state,
      incorrectCount: state.incorrectCount + 1,
      lastGuess: {
        correct: false,
        name: action.guessedName
      }
    }
  }
  else if(action.type === PRELOAD_NEXT_GUESS){
    if(state.identitiesToGuess.length > 1){
      var img = new window.Image()
      img.src = state.identitiesToGuess[1].imageURL
    }
    return state
  }
  else {
    return state
  }
}
