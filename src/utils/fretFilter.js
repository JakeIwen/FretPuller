export const getFilteredShapes = (settings) => {
  const {incZeroFret, noGaps, allStrings, fretRange, activeStrings, allShapes, tuning, maxFretSpan} = settings

  return allShapes.filter( fretsInChord => {

    const positions = fretsInChord.map(fret => fret.loc.pos)

    const inRange = positions.every(pos =>
      (pos >= fretRange[0] && pos < fretRange[1]) || (incZeroFret && pos==0)
    )

    const allStringsReq = !allStrings || (tuning.length == fretsInChord.length)

    const crds = fretsInChord.map(fret => fret.loc.crd)
    const consecutive = crds.every((crd, i) => i==0 || crd-crds[i-1]==1)
    const stringsActive = crds.every(crd => activeStrings[crd])

    const withinFretSpan = maxFretSpan >= (Math.max(...positions) - Math.min(...positions))

    return inRange &&
      allStringsReq &&
      stringsActive &&
      withinFretSpan &&
      (consecutive || !noGaps)
  })

}
