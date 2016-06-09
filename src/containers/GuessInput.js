import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Autosuggest from 'react-autosuggest'
import ReactDOM from 'react-dom'

class GuessInput extends React.Component {
  constructor () {
    super();

    this.state = {
      value: '',
      suggestions: this.getSuggestions('')
    };

    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.focus = this.focus.bind(this)
  }

  focus() {
    if(this.container && this.container.input){
      ReactDOM.findDOMNode(this.container.input).focus()
    }
  }

  componentDidMount() {
    this.focus()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.reactForm.value !== '' && nextProps.reactForm.value == ''){
      this.setState({
        value: ''
      })

      setTimeout(this.focus.bind(this), 200)
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.identities.filter((identity) => {
      let names = identity.name.split(" ")
      let found = false
      names.forEach((name) => {
        if(name.toLowerCase().slice(0, inputLength) === inputValue){
          found = true
        }
      })

      if(identity.name.toLowerCase().includes(inputValue)){
        found = true
      }
      return found
    })
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  render () {
    const { value } = this.state;
    const inputProps = Object.assign(
      this.props.reactForm, {
        name: 'guess',
        placeholder: 'Guess Who',
        value,
        onChange: this.onChange
      })

    return (
      <Autosuggest suggestions={this.state.suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        multisection={true}
        inputProps={inputProps}
        ref={(c) => this.container = c}
        {...this.props.guess} />
    );
  }
}

function mapStateToProps (state) {
  return {
    identities: state.identities
  }
}

// can remove the null here if you don't need to pass in any bound
// action creators
export default connect(mapStateToProps)(GuessInput)
