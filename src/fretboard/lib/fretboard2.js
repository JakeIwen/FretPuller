
// Alternate approach to lib/fretboard.js
// could be modified to expand the api with
// functions that update an existing fretMatrix
import {tokenize} from '../../utils/tokenize'
import {arrayRotate} from '../../utils'
import {chordIntervals} from '../../utils/chordIntervals'
import { range, compose, curry, update, merge } from 'lodash/fp'
import { Distance, Interval, Note, Chord, Scale } from '/src/lib/tonal.min.js'
import {ivlColors, colors} from '/src/theme/colors'

const transpose = curry(Distance.transpose)

export const midiForLocation = (tuning, { crd, pos }) =>
  compose(
    Note.midi,
    transpose(tuning[crd]),
    Interval.fromSemitones
  )(pos)


const fretStatePath = ({ crd, pos }) =>
  `[${crd}][${pos}].state`

export const updateFretMatrix = updates => matrix =>
  updates.reduce((acc, upd) =>
    update(
      fretStatePath(upd.loc),
      fretState => merge(fretState)(upd.state),
      acc,
    ), matrix)


export const fretState = (status, selectionText) => (
  { status, selectionText }
)

export const createFret = ({ midi, loc }) =>
  ({midi, loc, state: fretState('unselected', Note.pc(Note.fromMidi(midi)))})

export const fretMatrix = ({ tuning, width }) =>
  range(0, tuning.length).map((crd, i) =>
    range(0, width).map((pos, j) =>
      createFret({
        midi: midiForLocation(tuning, { crd, pos }),
        loc: { crd, pos } }
      )
    )
  )

export const locationsForNote = (tuning, width, note) =>
  tuning.reduce( (acc, openNote, i) => {
      const smtns = Distance.semitones(openNote, note)
      return (smtns >= 0 && smtns < width)
        ? [...acc, [i, smtns]]
        : acc
    },
    [],
  )

export const locationsForPc = (tuning, width, pc) =>
  tuning.reduce( (acc, openNote, i) => {
      const smtns = Distance.semitones(openNote, Note.pc(pc))
      const occurences = Math.floor((width - smtns - 1) / 12) + 1
      return (smtns < width)
        ? [...acc, ...range(0, occurences).map(o => [i, smtns + (o * 12)])]
        : acc
    },
    [],
  )

export const updatesForLocsAndName = (locs, name, showName) =>
  locs.map(([crd, pos]) => {
    let status = 'selected'
    return showName
      ? { loc: { crd, pos }, state: fretState(status, name ) }
      : { loc: { crd, pos }, state: fretState(status, '') }
  })

/* refactor this in
export const entities = {
  pc: pc => [[pc, pc]],
  pitch: pitch => [[pitch, pitch]],
  interval: (tonic, ivl) => [[tonic, '1P'], [Distance.transpose(tonic, ivl), ivl]],
  chord: chord => zip(Chord.notes(chord), chordIntervals(chord)),
  scale: (tonic, scale) => zip(Scale.notes(tonic, scale), Scale.intervals(scale)),
}
*/

export const fretMatrixForPc = (tuning, width, pc, showName = false) => {
  const locs = locationsForPc(tuning, width, pc)
  const updates = updatesForLocsAndName(locs, pc, showName)

  return updateFretMatrix(updates)(fretMatrix({ tuning, width, pc }))
}

export const fretMatrixForNote = (tuning, width, note, showName = false) => {
  const locs = locationsForNote(tuning, width, note)
  const updates = updatesForLocsAndName(locs, note, showName)
  return updateFretMatrix(updates)(fretMatrix({ tuning, width }))
}

export const fretMatrixForInterval = (tuning, width, tonic, ivl, showName = false) => {
  const intervals = ['1P', ivl]
  const notes = [tonic, Distance.transpose(tonic, ivl)]
  const updates = notes.reduce(
    (acc, pc, i) => {
      const locs = locationsForPc(tuning, width, pc)
      const name = intervals[i]
      return [...acc, ...updatesForLocsAndName(locs, name, showName)]
    },
    [],
  )
  return updateFretMatrix(updates)(fretMatrix({ tuning, width }))
}

export const fretMatrixForChord = (tuning, width, chord, showName = true) => {
  let tokens = tokenize(chord)
  let intervals = chordIntervals(chord)
  if (tokens.length === 2)
    intervals = chordIntervals(tokens[1])
  const updates = Chord.notes(...tokens).reduce(
    (acc, pc, i) => {
      const locs = chord ? locationsForPc(tuning, width, pc) : []
      const name = pc
      return [...acc, ...updatesForLocsAndName(locs, name, showName)]
    },
    [],
  )
  return updateFretMatrix(updates)(fretMatrix({ tuning, width }))
}

export const fretMatrixForScale = (tuning, width, tonic, scale, showName = false) => {
  const intervals = Scale.intervals(scale)
  const updates = Scale.notes(tonic, scale).reduce(
    (acc, pc, i) => {
      const locs = locationsForPc(tuning, width, pc)
      const name = intervals[i]
      return [...acc, ...updatesForLocsAndName(locs, name, showName)]
    },
    [],
  )
  return updateFretMatrix(updates)(fretMatrix({ tuning, width }))
}
