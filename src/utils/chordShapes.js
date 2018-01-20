import { fretMatrixForChord } from '../fretboard'
import { Chord, midi } from '/src/lib/tonal.min.js'

const getChordShapes = (activeFretMatrix, midis, fretRange = 7) => {
  let chordShapes = []
  // let inclNullStrings = activeFretMatrix.map(string=>string.concat({}))
  let stringGroups = stringCombos(activeFretMatrix)
  for (var i = 0; i < stringGroups.length; i++) {
    for (let c of combinations(stringGroups[i])) {
      let chordMidis = []
      let fretNums = []
      c.forEach( fret => {
        chordMidis.push(fret.midi % 12)
        fretNums.push(fret.loc.pos)
      })
      midis.every(midi=>chordMidis.includes(midi))
        && (Math.max(...fretNums) - Math.min(...fretNums)) < fretRange
        && chordShapes.push(c)
    }
  }
  return chordShapes
}

function stringCombos(arr) {
  let i, j, temp
  let result = []
  let arrLen = arr.length
  let power = Math.pow
  let combinations = power(2, arrLen)
  for (i = 0; i < combinations;  i++) {
    temp = []
    for (j = 0; j < arrLen; j++) (i & power(2, j)) && temp.push(arr[j])
    temp.length && result.push(temp)
  }
  return result
}

const fretFilter = (matrix) =>
  matrix.map(string=>string.filter(fret=>fret.state.status==='selected'))

export const initChord = (tuning, width, chord) => {
  let fretMatrix = fretMatrixForChord(tuning, width, chord)
  let midiNotes = Chord.notes(chord).map(note => midi(note + '0') % 12)
  let chordShapes = getChordShapes(fretFilter(fretMatrix), midiNotes)
  // console.log('CS', chordShapes)
  return {
    tuning,
    chord,
    fretMatrix,
    chordShapes,
    variationIndex: 0,
    viewMode: 'Chord Position'
  }
}

function *combinations(arrOfArrs) {
  let [head, ...tail] = arrOfArrs
  let remainder = tail.length ? combinations(tail) : [[]];
  for (let r of remainder)
    for (let h of head)
      yield [h, ...r];
}
