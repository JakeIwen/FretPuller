import {Chord} from 'tonal'

export const chordIntervals = (chord) =>
  Chord.intervals(chord).map(ivls => ivls.replace('9', '2').replace('11', '4'))
