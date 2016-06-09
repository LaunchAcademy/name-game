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
    'guessedName': guess
  }
}

// I like exporting a default 'actions' which you then pass to as your
// mapDispatchToProps because then its easy to add more ACreators to your
// containers.  In connect if you pass an object of funcs as the arg to
// mapDispatchToProps it will auto bind them for you preventing you from needing
// to use the bindActionCreators method.
//
// See here: https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-todos-and-all-action-creators
//
// Inside a container comp:
// import { actions as guessActions } from 'modules/guesses'
//
//
// connect(mapStateToProps, guessActions)(MyContainer);
//
// now all guessActions are available and bound to dispatch
// when I add a new ACreator I only need to add it in ONE place: this exported
// action object
//
export const actions = {
  guessReceived,
  receiveGuess,
  correctGuess,
  incorrectGuess,
};

export const INITIAL_STATE = {
  correctCount: 0,
  incorrectCount: 0,
  lastGuess: null,
  guessedIdentities: [],
  identitiesToGuess: []
}

// 'Duck's should always export a default of their reducer
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
  // nice, great job responding to side affects from the other ACreators in identities
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
  else {
    return state
  }
}
