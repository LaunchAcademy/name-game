export const ACTION_PREFIX = 'nameGame/identities'

export const RECEIVE_GUESS = `${ACTION_PREFIX}/RECEIVE_GUESS`
export const CORRECT_GUESS = `${ACTION_PREFIX}/CORRECT_GUESS`
export const INCORRECT_GUESS = `${ACTION_PREFIX}/INCORRECT_GUESS`
export const PRELOAD_NEXT_GUESS = `${ACTION_PREFIX}/PRELOAD_NEXT_GUESS`
export const SKIP_GUESS = `${ACTION_PREFIX}/SKIP_GUESS`
export const PURGE_SKIPPED_IDENTITY = `${ACTION_PREFIX}/PURGE_SKIPPED_IDENTITY`
export const GAME_RESET = `${ACTION_PREFIX}/GAME_RESET`

import _ from 'lodash'
import { fetchIdentities, RECEIVE_IDENTITIES } from './Identity'

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

export function skipGuess() {
  return {
    'type': SKIP_GUESS
  }
}

export function purgeSkippedIdentity() {
  return {
    'type': PURGE_SKIPPED_IDENTITY
  }
}

export function signalReset() {
  return {
    'type': GAME_RESET
  }
}
export function resetGame() {
  return function (dispatch) {
    dispatch(signalReset())
    return dispatch(fetchIdentities())
  }
}

export const actions = {
  guessReceived,
  receiveGuess,
  correctGuess,
  incorrectGuess,
  skipGuess
}

export const INITIAL_STATE = {
  correctCount: 0,
  incorrectCount: 0,
  lastGuess: null,
  guessedIdentities: [],
  identitiesToGuess: [],
  skippedIdentity: null,
  gamesPlayed: 0,
  gameStartedAt: null,
  lastGameEndedAt: null
}

export default function (state = INITIAL_STATE, action){
  if(action.type === CORRECT_GUESS){
    return {
      ...state,
      correctCount: state.correctCount + 1,
      guessedIdentities: [...state.guessedIdentities, action.identity],
      skippedIdentity: null,
      lastGuess: {
        correct: true,
        name: action.identity.name
      },
      identitiesToGuess: state.identitiesToGuess.filter((id) => {
        return id.name !== action.identity.name
      })
    }
  }
  else if(action.type === GAME_RESET) {
    return {
      ...INITIAL_STATE,
      lastGameEndedAt: new Date(),
      gamesPlayed: (state.gamesPlayed || 0) + 1
    }
  }
  else if(action.type === RECEIVE_IDENTITIES){
    return {
      ...state,
      gameStartedAt: new Date(),
      identitiesToGuess: _.shuffle(action.payload)
    }
  }
  else if(action.type === INCORRECT_GUESS){
    return {
      ...state,
      incorrectCount: state.incorrectCount + 1,
      skippedIdentity: null,
      lastGuess: {
        correct: false,
        name: action.guessedName
      }
    }
  }
  else if(action.type === PRELOAD_NEXT_GUESS){
    const PRELOAD_INDEX = 2
    if(state.identitiesToGuess.length > PRELOAD_INDEX){
      var img = new window.Image()
      img.src = state.identitiesToGuess[PRELOAD_INDEX].imageURL
    }
    return state
  }
  else if(action.type === SKIP_GUESS){
    return {
      ...state,
      lastGuess: null,
      skippedIdentity: state.identitiesToGuess[0],
      identitiesToGuess: state.identitiesToGuess.slice(1)
    }
  }
  else if(action.type === PURGE_SKIPPED_IDENTITY) {
    return {
      ...state,
      skippedIdentity: null
    }
  }
  else {
    return state
  }
}
