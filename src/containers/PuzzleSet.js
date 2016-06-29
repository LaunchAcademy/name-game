import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchIdentities } from '../modules/Identity'
import PuzzleStatistics from './PuzzleStatistics'
import GuessFeedback from './GuessFeedback'
import GiveUpFeedback from './GiveUpFeedback'

import _ from 'lodash'

import Puzzle from './Puzzle'

class PuzzleSet extends React.Component {
  componentWillMount () {
    if(this.props.identities.length === 0){
      this.props.fetchIdentities()
    }
  }

  render () {
    if (this.props.identities[0]) {
      return (
        <div className="puzzle-set">
          <PuzzleStatistics />
          <h4>Who Dat?</h4>
          <GuessFeedback guess={ this.props.lastGuess } />
          <GiveUpFeedback skippedIdentity={ this.props.skippedIdentity } />
          <Puzzle identity={this.props.identities[0]} />
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchIdentities }, dispatch)
}

function mapStateToProps (state) {
  return {
    identities: state.guesses.identitiesToGuess,
    lastGuess: state.guesses.lastGuess,
    skippedIdentity: state.guesses.skippedIdentity
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PuzzleSet)
