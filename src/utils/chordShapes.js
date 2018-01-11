import { fretMatrixForChord } from '../fretboard'
import { Chord, midi } from 'tonal'

const getChordShapes = (activeFretMatrix, midis) => {
  let chordShapes = []
  let inclNullStrings = activeFretMatrix.map(string=>string.concat({}))
  for (let c of combinations(inclNullStrings)) {
    let chordMidis = c.map( fret => fret.midi %12)
    midis.every(midi=>chordMidis.includes(midi))
      && chordShapes.push( c.filter( fret => fret.midi ))
  }
  return chordShapes
}

const includedFrets = (fretMatrix) => {
  let incFrets = []
  fretMatrix.forEach( (string, i) =>
    string.forEach( (fret, j) =>
      fret.state.bgColor && incFrets.push(i*string.length + j)
    )
  )
  return incFrets
}

const fretFilter = (matrix) =>
  matrix.map(string=>string.filter(fret=>fret.state.bgColor))

export const initChord = (tuning, width, chord) => {
  let fretMatrix = fretMatrixForChord(tuning, width, chord, true)
  let includedAddresses = includedFrets(fretMatrix)
  let midiNotes = Chord.notes(chord).map(note => midi(note + '0') % 12)
  let chordShapes = getChordShapes(fretFilter(fretMatrix), midiNotes)
  // console.log('CS', chordShapes)
  return {
    tuning,
    chord,
    fretMatrix,
    includedAddresses,
    chordShapes,
    variationIndex: 0,
    viewMode: 'Chord Position'
  }
}

function *combinations(arrOfArrs) {
  let [head, ...tail] = arrOfArrs
  let remainder = tail.length ? combinations(tail) : [[]];
  for (let r of remainder) for (let h of head) yield [h, ...r];
}
