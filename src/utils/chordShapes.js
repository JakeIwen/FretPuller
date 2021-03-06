import { fretMatrixForChord } from '../fretboard'
import { Chord, midi } from '/src/lib/tonal.min.js'

const compareSpan = (aVals, bVals) => {
  let aRange = Math.max(...aVals) - Math.min(...aVals)
  let bRange = Math.max(...bVals) - Math.min(...bVals)
  if (aRange === bRange ) return 0
  return aRange < bRange ? -1 : 1
}

const compareMax = (a,b) => {
  let aVals = a.map(f=>f.loc.pos)
  let bVals = b.map(f=>f.loc.pos)
  let aMax = Math.max(...aVals)
  let bMax = Math.max(...bVals)
  if (aMax === bMax ) return compareSpan(aVals,bVals)
  return aMax < bMax ? -1 : 1
}


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
        && (fretNums.includes(0) || (Math.max(...fretNums) - Math.min(...fretNums)) < fretRange)
        && chordShapes.push(c)
    }
  }
  let ret = chordShapes.sort(compareMax)
  console.log('sorted', ret.map(frets => Math.max(...frets.map(fret=>fret.loc.pos)) - Math.min(...frets.map(fret=>fret.loc.pos))))
  return ret
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
  let selectionMatrix = fretMatrix.map(stg => stg.map(fret => fret.state.status==='selected'))
  return {
    tuning,
    chord,
    width,
    fretMatrix,
    chordShapes,
    allShapes: chordShapes,
    viewMode: 'chord',
    selectionMatrix,
    fullSelectionMatrix: selectionMatrix,
    variationIndex: 0
  }
}

function *combinations(arrOfArrs) {
  let [head, ...tail] = arrOfArrs
  let remainder = tail.length ? combinations(tail) : [[]];
  for (let r of remainder)
    for (let h of head)
      yield [h, ...r];
}
