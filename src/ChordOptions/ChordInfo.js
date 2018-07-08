import React from 'react'
import { Chord, Note } from '../../src/lib/tonal.min.js'
import {tonicColors} from '../../src/theme/colors'
import {romanIvls, readFormat} from '../../src/utils/format'
import {tokenize} from '../../src/utils/tokenize'
import {chordIntervals} from '../../src/utils/chordIntervals'
import {Wrapper, SelectionName, MapKey, Ivl, Name} from '../styled/selectionInfo'
import {MockFret} from '../styled/selections'

const notesDetails = (name) => {
  const tokens = tokenize(name)
  const colorArr = tonicColors(tokens[0])
  const intervals = (tokens.length === 2)
    ? chordIntervals(tokens[1])
    : chordIntervals(tokens)
  const notes = Chord.notes(...tokens).map( n => Note.simplify(n) )

  return intervals.map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret color={colorArr[Note.chroma(notes[i])]}>
        <Name>{notes[i]}</Name>
      </MockFret>
    </MapKey>
  )
}

export default ChordInfo = ({tonic, chord}) => (
  <Wrapper>
    <SelectionName>
      {tonic + readFormat(chord)}
    </SelectionName>
    {notesDetails(tonic+chord)}
  </Wrapper>
)
