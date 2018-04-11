// export const fretFilter = ({fretRange, maxFretSpan, incZeroFret, activeStrings, noGaps, allStrings, state, callback}) => {
export const fretFilter = ({fretRange}) => {
    fretRange = fretRange || state.fretRange

    console.log({fretRange})

    let newShapes = state.allShapes.filter(fretsInChord => {
      let rangeOk = noZeros.every( pos => pos >= fretRange[0] && pos < fretRange[1])
      return rangeOk
    })
    let newState = {
      chordShapes: newShapes,
      fretRange,
    }
    callback({newState})
  }
