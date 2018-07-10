import { fretMatrixForChord, fretMatrixForScale } from '../fretboard'
import { Chord, Scale, midi } from '../../src/lib/tonal.min.js'
import { range } from 'lodash/fp'

const getChordShapes = (activeFretMatrix, midis, fretRange = 7) => {
  const chordShapes = []
  // let inclNullStrings = activeFretMatrix.map(string=>string.concat({}))
  const stringGroups = stringCombos(activeFretMatrix)
  for (let i = 0; i < stringGroups.length; i++) {
    for (const c of combinations(stringGroups[i])) {
      const chordMidis = []
      const fretNums = []
      c.forEach( fret => {
        chordMidis.push(fret.midi % 12)
        fretNums.push(fret.loc.pos)
      })
      midis.every(midi=>chordMidis.includes(midi))
        && (fretNums.includes(0) || (Math.max(...fretNums) - Math.min(...fretNums)) < fretRange)
        && chordShapes.push(c)
    }
  }
  return chordShapes
}

function stringCombos(arr) {
  let i, j, temp
  const result = []
  const arrLen = arr.length
  const power = Math.pow
  const combinations = power(2, arrLen)
  for (i = 0; i < combinations;  i++) {
    temp = []
    for (j = 0; j < arrLen; j++) (i & power(2, j)) && temp.push(arr[j])
    temp.length && result.push(temp)
  }
  return result
}

const fretFilter = (matrix) =>
  matrix.map(string=>string.filter(fret=>fret.state.status==='selected'))

export const initChord = ({tuning, width, chord, tonic, scale, appMode, showNames}) => {

  const fretMatrix = fretMatrixForChord(tuning, width, tonic+chord, showNames)
  const midiNotes = Chord.notes(tonic+chord).map(note => midi(note + '0') % 12)
  const chordShapes = getChordShapes(fretFilter(fretMatrix), midiNotes)

  const selectionMatrix = fretMatrix.map(stg => stg.map(fret => fret.state.status==='selected'))

  return {
    tuning,
    chord,
    scale,
    tonic,
    width,
    appMode,
    fretMatrix,
    chordShapes,
    allShapes: chordShapes,
    selectionMatrix,
    possibilitiesMatrix: selectionMatrix,
    variationIndex: 0,
    showTuningModal: false,
    activeStrings: range(0, tuning.length).map(()=>true),
  }
}

function *combinations(arrOfArrs) {
  const [head, ...tail] = arrOfArrs
  const remainder = tail.length ? combinations(tail) : [[]];
  for (const r of remainder)
    for (const h of head)
      yield [h, ...r];
}
