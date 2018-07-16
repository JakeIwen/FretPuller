import {Chord, Note, Dictionary, interval as getInterval} from '../lib/tonal.min.js'
import {cloneDeep, uniq} from 'lodash'


Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;
    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int
        // convert count to value in range [0, len)
        count = ((count % len) + len) % len;
        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();



const allChords = Dictionary.allChords
const chordNames = Object.keys(allChords)
chordNames.forEach(key =>  allChords[key] = allChords[key][0])

let tonal = require('../lib/tonal.min.js')
console.log('tonal', tonal);

export const getSelectedFrets = fretMatrix => {
  const sf = []
  fretMatrix.forEach( stg =>
    stg.forEach( fret =>
      fret.state.status==="selected" && sf.push(cloneDeep(fret))
  ) )
  return sf
}

export const getSelectedNotes = fretMatrix => {
  const midis = []
  fretMatrix.forEach( stg =>
    stg.forEach( fret =>
      fret.state.status==="selected" && midis.push(fret.midi)
  ) )
  return midis.sort().map(midi => Note.pc(Note.fromMidi(midi)))
}

export const getSelectionMatrix = (fretMatrix) => {
  if (fretMatrix) {
    return fretMatrix.map( (stg) =>
      stg.map( fret => fret.state.status==="selected" ) )
  } else {
    return []
  }
}

export const getChordsIncludingNotes = (fretMatrix) => {
  const notes = uniq(getSelectedNotes(fretMatrix))
  if (notes.length < 1) return []

  const intervals = []
  const possibleChords = []
  for (let i = 0; i < notes.length; i++) {
    const intervalSet = []
    for (let j = 0; j < notes.length; j++) {
      intervalSet.push(getInterval(notes[0], notes[j]))
    }
    intervals.push(intervalSet)
    notes.rotate(1) //original notes array recreated at loop exit
  }
  for (let i = 0; i < intervals.length; i++) {
    const thisIntervalSet = intervals[i]
    chordNames.forEach(key =>  {
      if(thisIntervalSet.every(ivl => allChords[key].includes(ivl)))
        possibleChords.push([notes[i], key])
    })
  }
  return possibleChords
  // debugger;
  // console.log('all', Dictionary.allChords);
}
