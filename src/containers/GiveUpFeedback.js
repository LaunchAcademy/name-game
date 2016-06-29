import React, { Component } from 'react'
export default class GiveUpFeedback extends Component {
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
