import React from 'react'
import { resetGame } from '../modules/Guess'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export class GameOver extends React.Component {
  constructor () {
    super()
    this.resetGame = this.resetGame.bind(this)
  }

  resetGame (e) {
    e.preventDefault();
    this.props.resetGame()
  }
  render () {
    return (
      <div>
        <h1>Game Over!</h1>
        <button onClick={this.resetGame} className="btn-green">Play Again</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({resetGame}, dispatch)
}

export default connect(null, mapDispatchToProps)(GameOver)
