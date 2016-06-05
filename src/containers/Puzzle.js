import React from 'react'

import {reduxForm} from 'redux-form';
import { receiveGuess, RECEIVE_GUESS } from '../modules/Guess'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GuessInput from './GuessInput'

export class Puzzle extends React.Component {
  constructor(props) {
    super(props)
    this.guessHappened = this.guessHappened.bind(this)
  }

  guessHappened({ guess }){
    this.props.receiveGuess(this.props.identity, guess)
  }

  render () {
    const { handleSubmit, fields: { guess, boo }} = this.props
    return (
      <form onSubmit={handleSubmit(this.guessHappened)}>
        <img src={this.props.identity.imageURL} alt="Guess the identity"></img>
        <GuessInput reactForm={guess}></GuessInput>
        <input type="submit" value="Guess" />
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
