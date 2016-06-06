import React, { Component } from 'react'
import { connect } from 'react-redux'

export class PuzzleStatistics extends Component {
  render () {
    return (
      <dl>
        <dt>Correct Guesses</dt>
        <dd>{ this.props.correctCount }</dd>
        <dt>Total Guesses</dt>
        <dd>{ this.props.correctCount + this.props.incorrectCount }</dd>
        <dt>Identities Left to Guess</dt>
        <dd>{ this.props.leftToGuessCount }</dd>
        <dt>Incorrect Guesses</dt>
        <dd>{ this.props.incorrectCount }</dd>
      </dl>
    )
  }
}

function mapStateToProps(state){
  return {
    correctCount: state.guesses.correctCount,
    incorrectCount: state.guesses.incorrectCount,
    leftToGuessCount: state.guesses.identitiesToGuess.length
  }
}

export default connect(mapStateToProps, null)(PuzzleStatistics)
