import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchIdentities } from '../modules/Identity'

import _ from 'lodash'

import Puzzle from './Puzzle'

class PuzzleSet extends React.Component {
  componentWillMount () {
    this.setState({
      currentIndex: null
    })

    this.props.fetchIdentities().then(() => {
      let randomIndex = Math.floor(Math.random() * (this.props.identities.length))
      this.setState({
        currentIndex: randomIndex
      })
    })
  }

  render () {
    if (this.state.currentIndex) {
      return (
        <div>
          <Puzzle identity={this.props.identities[this.state.currentIndex]} />
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
