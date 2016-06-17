import React, { Component } from 'react'

import { skipGuess } from '../modules/Guess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class GiveUpButton extends Component {
  constructor () {
    super()
    this.skipGuess = this.skipGuess.bind(this)
  }

  skipGuess (e) {
    e.preventDefault()
    this.props.skipGuess()
  }

  render () {
    return (
      <button onClick={ this.skipGuess } className="skip-guess">
      Give Up
      </button>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ skipGuess }, dispatch)
}

export default connect(null, mapDispatchToProps)(GiveUpButton)
