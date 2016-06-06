export const RECEIVE_GUESS = 'RECEIVE_GUESS'
export const CORRECT_GUESS = 'CORRECT_GUESS'
export const INCORRECT_GUESS = 'INCORRECT_GUESS'

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

export function correctGuess(identity) {
  return {
    'type': CORRECT_GUESS,
    'identity': identity
  }
}

export function incorrectGuess(guess) {
  return {
    'type': INCORRECT_GUESS,
    'guessedName': name
  }
}

export const INITIAL_STATE = {
  correctCount: 0,
  incorrectCount: 0,
  guessedIdentities: [],
  identitiesToGuess: []
}

export function guessReducer(state = INITIAL_STATE, action){
  if(action.type === CORRECT_GUESS){
    return {
      ...state,
      correctCount: state.correctCount + 1,
      guessedIdentities: [...state.guessedIdentities, action.identity],
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
      incorrectCount: state.incorrectCount + 1
    }
  }
  else {
    return state
  }
}
