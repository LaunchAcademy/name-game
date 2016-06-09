import React from 'react'

import {reduxForm} from 'redux-form';
import { receiveGuess, RECEIVE_GUESS } from '../modules/Guess'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GuessInput from './GuessInput'

// unless your comp needs local state I usually avoid using
// the constructor in favor of arrow funcs.  My thought process
// is if there is a constructor it should stand out and I want the
// next person looking at it.  If there isn't then I just needed
// to bind my funcs appropriately and the arrow syntax lets me do that.
export class Puzzle extends React.Component {
  guessHappened = ({ guess }) => {
    // I would store all this logic in the action creator
    // that way it's easier to test (no react involved)
    //
    // also you want to be able to reuse this logic in another place -- the 
    // Autosuggest component.  You should have an onEnter that does this logic.
    // Right now there is a bug, if I hit enter on the autosuggest with the
    // CORRECT answer it doesn't give me credit
    const clear = this.props.identity.name === guess
    const { resetForm } = this.props
    this.props.receiveGuess(this.props.identity, guess)
    if(clear) {
      resetForm()
    }
  }

  render () {
    const { handleSubmit, fields: { guess, boo }} = this.props
    return (
      <form onSubmit={handleSubmit(this.guessHappened)}>
        <div className="identity-image-container">
          <img src={this.props.identity.imageURL} alt="Guess the identity"></img>
        </div>
        <div className="guess-container">
          <GuessInput reactForm={guess}></GuessInput>
          <input type="submit" value="Guess" className="submit-guess" />
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ receiveGuess }, dispatch)
}

let decoratedPuzzle = connect(null, mapDispatchToProps)(Puzzle)

export default reduxForm({
  form: 'a-puzzle',
  fields: ['guess']
})(decoratedPuzzle);
