export const fretFilter = ({fretRange, maxFretSpan, incZeroFret, activeStrings, noGaps, allStrings, state, callback}) => {
    fretRange = fretRange || state.fretRange

    activeStrings = activeStrings || state.activeStrings
    incZeroFret = incZeroFret===undefined ? state.incZeroFret : incZeroFret

    console.log({fretRange, maxFretSpan, incZeroFret, activeStrings, noGaps, allStrings})

    let newShapes = state.allShapes.filter(fretsInChord => {
      let crds = fretsInChord.map(fret=>fret.loc.crd)
      let positions = fretsInChord.map(fret=>fret.loc.pos)
      let spanOk = (Math.max(...noZeros) - Math.min(...noZeros)) < maxFretSpan
      let rangeOk = noZeros.every( pos => pos >= fretRange[0] && pos < fretRange[1])
      let stringOk = crds.every( crd => activeStrings[crd])
      let noGapsOk = !noGaps || crds.every((val, index) => {
        return index===crds.length-1 || (crds[index+1]-val)===1
      })
      let allStringsOk = !allStrings || (crds.length===state.tuning.length)

      return spanOk && rangeOk && stringOk && noGapsOk && allStringsOk
    })

    let newState = {
      chordShapes: newShapes,
      incZeroFret,
      maxFretSpan,
      fretRange,
      activeStrings,
      noGaps,
      allStrings
    }

    callback({newState})
  }
