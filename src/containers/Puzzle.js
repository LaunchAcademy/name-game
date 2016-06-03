import React from 'react'

import {reduxForm} from 'redux-form';

import GuessInput from './GuessInput'

class Puzzle extends React.Component {
  guessHappened({ guess }){
    if(guess === this.props.identity.name){
      alert('yup')
    }
    else {
      alert('nope')
    }

  }

  render () {
    const { handleSubmit, fields: { guess, boo }} = this.props
    return (
      <form onSubmit={handleSubmit(this.guessHappened.bind(this))}>
        <img src={this.props.identity.imageURL} alt="Guess the identity"></img>
        <GuessInput reactForm={guess}></GuessInput>
        <input type="submit" value="Guess" />
      </form>
    )
  }
}

export default reduxForm({
  form: 'a-puzzle',
  fields: ['guess']
})(Puzzle);
