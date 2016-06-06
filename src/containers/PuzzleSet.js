import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchIdentities } from '../modules/Identity'

import _ from 'lodash'

import Puzzle from './Puzzle'

class PuzzleSet extends React.Component {
  componentWillMount () {
    this.props.fetchIdentities()
  }

  render () {
    if (this.props.identities[0]) {
      return (
        <div>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PuzzleSet)
