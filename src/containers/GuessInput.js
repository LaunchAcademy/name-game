import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'

class GuessInput extends React.Component {
  constructor () {
    super();

    this.focus = this.focus.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {}
  }

  focus() {

  }

  onChange(newVal) {
    //bubble event back up to redux-form
    this.props.onChange(newVal)
  }

  componentDidMount () {
    this.focus()

    const { identities } = this.props
    if(!this.state.options){
      this.setState({
        options: identities.map((identity) => {
          return {
            value: identity.name,
            label: identity.name
          }
        })
      })
    }
  }

  render () {
    const { options } = this.state

    const { identities } = this.props

    const inputProps = {
      placeholder: 'Guess Who',
      options: options,
      autofocus: true,
      autosize: false,
      name: this.props.name,
      value: this.props.value,
      onChange: this.onChange
    }

    return (
      <div>
        <Select { ...inputProps } />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    identities: state.identities
  }
}

export default connect(mapStateToProps)(GuessInput)
