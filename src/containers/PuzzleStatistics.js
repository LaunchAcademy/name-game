import React, { Component } from 'react'
import { connect } from 'react-redux'

// this is really a presentational component.  It should be
// a functional stateless component that uses pure shouldComponentUpdate
// How I would create the container below:
export class PuzzleStatistics extends Component {
  render () {
    return (
      <div>
        <ul className="puzzle-statistics">
          <li className="correct-guesses">
            <label>Correct</label>
            { this.props.correctCount }
          </li>
          <li className="total-guesses">
            <label>Total Guesses</label>
            { this.props.correctCount + this.props.incorrectCount }
          </li>
          <li className="incorrect-guesses">
            <label>Incorrect</label>
            { this.props.incorrectCount }
          </li>
        </ul>
        <ul className="puzzle-statistics">
          <li>
            <label>Left to Guess</label>
            { this.props.leftToGuessCount }
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    correctCount: state.guesses.correctCount,
    incorrectCount: state.guesses.incorrectCount,
    leftToGuessCount: state.guesses.identitiesToGuess.length
  }
}

// can remove null here
export default connect(mapStateToProps)(PuzzleStatistics)

// const propTypes = {
  // correctCount: PropTypes.number.isRequired,
  // incorrectCount: PropTypes.number.isRequired,
  // leftToGuessCount: PropTypes.number.isRequired,
// };

// class PuzzleStatContainer extends Component {
  // render() {
    // const { correctCount, incorrectCount } = this.props;
    // const totalGuesses = correctCount + incorrectCount;
    // return (
      // <PuzzleStatistics {...this.props} totalGuesses={totalGuesses} />
    // )
  // }
// }

// const mapStateToProps = (state) => ({
  // correctCount: state.guesses.correctCount,
  // incorrectCount: state.guesses.incorrectCount,
  // leftToGuessCount: state.guesses.identitiesToGuess.length
// });

// PuzzleStatContainer.propTypes = propTypes;
// export default PuzzleStatContainer;
//
// The 'totalGuesses' prop in this scenario is a perfect use case for a
// selector.  Its some derived data that depends on input selectors.  I'm a big 
// fan of selectors becaues they decouple your state tree to the data the
// component actually needs.  for example when you do leftToGuessCount you are
// reaching through multiple objects to get access to the number you want:
// state.guesses.identitiesToGuess 
//
// Imagine if multiple places in your state tree you want to know that number
// and then later you decide to refactor your Reducer so it looks like:
// state.guesses.activeGuesses.identitiesToGuess.length.  You now need to change 
// that series of calls in lots of places.  If you use selectors you only need
// to change it in ONE place -- the selector
//
// If using selectors your mapState would like like this:
//
// const mapStateToProps = (state) => ({
  // correctCount: getCorrectCount(state),     // input selector
  // incorrectCount: getIncorrectCount(state), // input selector
  // leftToGuessCount: getLeftCount(state),    // derived selector (the length)
  // totalGuesses: getTotalCount(state),       // derived selector (combo of two input selectors)
// });
//
// Prsentational component
// export const PuzzleStatistics = ({
  // correctCount, incorrectCount, 
  // leftToGuessCount, totalGuesses
// }) => {
  // return (
    // <div>
      // <ul className="puzzle-statistics">
        // <li className="correct-guesses">
          // <label>Correct</label>
          // {correctCount}
        // </li>
        // <li className="total-guesses">
          // <label>Total Guesses</label>
          // {totalGuesses}
        // </li>
        // <li className="incorrect-guesses">
          // <label>Incorrect</label>
          // {incorrectCount}
        // </li>
      // </ul>
      // <ul className="puzzle-statistics">
        // <li>
          // <label>Left to Guess</label>
          // {leftToGuessCount}
        // </li>
      // </ul>
    // </div>
  // )
// }

// PuzzleStatistics.propTypes = {
  // correctCount: PropTypes.number.isRequired,
  // incorrectCount: PropTypes.number.isRequired,
  // leftToGuessCount: PropTypes.number.isRequired,
  // totalGuesses: PropTypes.number.isRequired,
// }
//
// we can then use a HOC to make it a pure component using the 'recompose' library
// export default pure(PuzzleStatistics);
