import React, { Component } from 'react'
export default class GiveUpFeedback extends Component {
  render () {
    const { skippedIdentity } = this.props
    //TODO: make close button functional
    if(skippedIdentity){
      return (
        <div className="callout alert">
          <p><strong>D'oh!</strong> That was: <em>{ skippedIdentity.name }</em></p>

          <img src={skippedIdentity.imageURL}
            alt={skippedIdentity.name}
            className="skipped-image" />


          <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
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
