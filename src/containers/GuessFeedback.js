import React, { Component } from 'react'

export default class GuessFeedback extends React.Component {
  lastGuessClass () {
    if(this.props.lastGuess.correct){
      return 'success'
    }
    else {
      return 'warning'
    }
  }

  lastGuessMessage () {
    if(this.props.guess.correct){
      return (
        <span>
          <strong>Yes! </strong>
          The last photo was <em>{this.props.guess.name}</em>
        </span>
      )
    }
    else {
      return (
        <span>
          <strong>Nope! </strong>
          This isn't <em>{this.props.guess.name}</em>
        </span>
      )
    }
  }

  lastGuessClass() {
    if(this.props.guess.correct){
      return 'correct'
    }
    else {
      return 'incorrect'
    }
  }
  render () {
    if(this.props.guess){
      return (
        <p className={this.lastGuessClass()} >{ this.lastGuessMessage() }</p>
      )
    }
    else {
      return (<p/>)
    }
  }
}
