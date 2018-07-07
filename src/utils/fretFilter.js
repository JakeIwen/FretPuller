
export const fretFilter = ({state, callback}) => {
  const {incZeroFret, noGaps, allStrings, fretRange, activeStrings} = state
  console.log({state, callback});
  const chordShapes = state.allShapes.filter( fretsInChord => {

    const positions = fretsInChord.map(fret => fret.loc.pos)

    const inRange = positions.every(pos =>
      (pos >= fretRange[0] && pos < fretRange[1]) || (incZeroFret && pos==0)
    )

    const allStringsReq = !allStrings || (state.tuning.length == fretsInChord.length)

    const crds = fretsInChord.map(fret => fret.loc.crd)
    const consecutive = crds.every((crd, i) => i==0 || crd-crds[i-1]==1)
    const stringsActive = crds.every(crd => activeStrings[crd]==true)

    return inRange && allStringsReq && stringsActive && (consecutive || !noGaps)
  })

  callback({...state, chordShapes})
}
