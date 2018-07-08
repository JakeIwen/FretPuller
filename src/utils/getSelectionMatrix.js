export const getSelectionMatrix = (state) => {
  //must call with corrrect index
  const { variationIndex, chordShapes, fretMatrix } = state
  const thisShape = chordShapes[variationIndex]
  return fretMatrix.map( (stg, i) =>
    stg.map( (fret,j) =>
      (thisShape || []).some( chord =>
        chord.loc.crd===i && chord.loc.pos===j
      )
    )
  )
}
