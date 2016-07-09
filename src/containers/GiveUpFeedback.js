import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { purgeSkippedIdentity } from '../modules/Guess'

export class GiveUpFeedback extends Component {
  constructor () {
    super()
    this.purgeSkippedIdentity = this.purgeSkippedIdentity.bind(this)
  }

  purgeSkippedIdentity (e) {
    this.props.purgeSkippedIdentity()
  }

  render () {
    const { skippedIdentity } = this.props
    //TODO: make close button functional
    if(skippedIdentity){
      return (
        <div className="give-up-panel contrast-panel columns mbl pal">
          <h4>D'oh! That was: <em>{ skippedIdentity.name }</em></h4>

          <img src={skippedIdentity.imageURL}
            alt={skippedIdentity.name}
            className="skipped-image" />


          <button onClick={this.purgeSkippedIdentity} className="close-button" aria-label="Dismiss alert" type="button" data-close>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    }
    else {
      return null
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ purgeSkippedIdentity }, dispatch)
}

export default connect(null, mapDispatchToProps)(GiveUpFeedback)
