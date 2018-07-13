import React from 'react'
import { Chord, Note } from '../lib/tonal.min.js'
import {tonicColors} from '../theme/colors'
import {romanIvls, readFormat, accFormat} from '../utils/format'
import {tokenize} from '../utils/tokenize'
import {chordIntervals} from '../utils/chordIntervals'
import {Wrapper, SelectionName, MapKey, Ivl, Name} from '../styled/selectionInfo'
import {MockFret} from '../styled/selections'

const notesDetails = (name, highlightNote) => {
  const tokens = tokenize(name)
  const colorArr = tonicColors(tokens[0])
  const intervals = (tokens.length === 2)
    ? chordIntervals(tokens[1])
    : chordIntervals(tokens)
  const notes = Chord.notes(...tokens).map( n => Note.simplify(n) )

  return intervals.map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret
        onPressIn={()=>highlightNote()}
        color={colorArr[Note.chroma(notes[i])]}>
        <Name>{accFormat(notes[i])}</Name>
      </MockFret>
    </MapKey>
  )
}

export default ChordInfo = ({tonic, chord, highlightNote}) => (
  <Wrapper>
    <SelectionName>
      {accFormat(tonic) + readFormat(chord)}
    </SelectionName>
    {notesDetails(tonic+chord, highlightNote)}
  </Wrapper>
)
