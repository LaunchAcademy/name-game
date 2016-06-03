import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchIdentities } from '../modules/Identity'

import Puzzle from './puzzle'

class PuzzleSet extends React.Component {
  componentWillMount () {
    this.props.fetchIdentities()
  }

  render () {
    const firstIdentity = this.props.identities[0]
    if (firstIdentity) {
      return (
        <div>
          <Puzzle identity={firstIdentity} />
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
    identities: state.identities
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PuzzleSet)
