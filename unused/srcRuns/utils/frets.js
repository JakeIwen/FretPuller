export const fretTruth = (fret, clickedFret, incOctaves, viewMode, alreadySelected) => {
  let noteMatch = incOctaves
    ? (fret.midi % 12 === clickedFret.midi % 12)
    : fret.loc.pos===clickedFret.loc.pos && fret.loc.crd===clickedFret.loc.crd
  let existingMatch = viewMode==='select' && alreadySelected
  return !!(noteMatch ^ existingMatch)
}
