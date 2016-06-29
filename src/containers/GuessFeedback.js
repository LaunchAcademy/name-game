import React, { Component } from 'react'

export default class GuessFeedback extends React.Component {

  lastGuessClass () {
   const { correct } = this.props.guess
   return correct ? 'correct' : 'incorrect'
  }

  lastGuessMessage () {
    const { guess: { correct, name } } = this.props
    if(correct){
      return (
        <span>
          <strong>Yes! </strong>
          The last photo was <em>{name}</em>
        </span>
      )
    }
    else {
      return (
        <span>
          <strong>Nope! </strong>
          This isn't <em>{name}</em>
        </span>
      )
    }
  }

  render () {
    const { guess } = this.props
    if(guess){
      return (
        <p id="guessFeedback" className={this.lastGuessClass()} >{ this.lastGuessMessage() }</p>
      )
    }
    else {
      return null//(<p id="guessFeedback"/>)
    }
  }
}
