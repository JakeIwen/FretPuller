import {Chord} from '/src/lib/tonal.min.js'

export const chordIntervals = (chord) =>
  Chord.intervals(chord).map(ivls => ivls.replace('9', '2').replace('11', '4'))
