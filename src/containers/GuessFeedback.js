import React, { Component } from 'react'

export default class GuessFeedback extends React.Component {
  lastGuessClass () {
    const { lastGuess } = this.props;
    return lastGuess.correct ? 'success' : 'warning';
  }

  lastGuessMessage () {
    const { guess: { correct, name } } = this.props;
    if (correct){
      return (
        <span>
          <strong>Yes! </strong>
          The last photo was <em>{name}</em>
        </span>
      )
    }
    return (
      <span>
        <strong>Nope! </strong>
        This isn't <em>{name}</em>
      </span>
    )
  }

  render () {
    if(this.props.guess){
      return (
        <p className={this.lastGuessClass()}>{ this.lastGuessMessage() }</p>
      )
    }

    return null;
  }
}

  // lastGuessClass() {
    // duplicate method?
    // if(this.props.guess.correct){
      // return 'correct'
    // }
    // else {
      // return 'incorrect'
    // }
  // }
