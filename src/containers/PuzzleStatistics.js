import React, { Component } from 'react'
import { connect } from 'react-redux'

export class PuzzleStatistics extends Component {
  render () {
    return (
      <div>
        <ul className="puzzle-statistics">
          <li className="correct-guesses">
            <label>Correct</label>
            { this.props.correctCount }
          </li>
          <li className="total-guesses">
            <label>Total Guesses</label>
            { this.props.correctCount + this.props.incorrectCount }
          </li>
          <li className="incorrect-guesses">
            <label>Incorrect</label>
            { this.props.incorrectCount }
          </li>
        </ul>
        <ul className="puzzle-statistics">
          <li>
            <label>Left to Guess</label>
            { this.props.leftToGuessCount }
          </li>
        </ul>
      </div>
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

export default connect(mapStateToProps)(PuzzleStatistics)
