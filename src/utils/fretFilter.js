// export const fretFilter = ({fretRange, maxFretSpan, incZeroFret, activeStrings, noGaps, allStrings, state, callback}) => {
export const fretFilter = ({fretRange, state, allowZeroes=true, noGaps=true, allStrings=true, callback}) => {
  fretRange = fretRange || state.fretRange
  console.log('STATE', state);
  let newShapes = state.allShapes.filter( fretsInChord => {
    const positions = fretsInChord.map(fret => fret.loc.pos)
    const crds = fretsInChord.map(fret => fret.loc.crd)
    const inRange =  positions.every(pos =>
      (pos >= fretRange[0] && pos < fretRange[1]) || (allowZeroes && pos==0)
    )
    const allStringsReq = !allStrings || (state.tuning.length == fretsInChord.length)
    const consecutive = crds.every( (crd, i) => i==0 || crd-crds[i-1]==1 )
    return inRange && allStringsReq && (consecutive || !noGaps)
  })
  let newState = {
    chordShapes: newShapes,
    fretRange,
  }
  callback({newState})
}
