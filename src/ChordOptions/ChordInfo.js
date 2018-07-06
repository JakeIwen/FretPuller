import React from 'react'
import styled from "styled-components/native"
import { Chord, Note } from '../../src/lib/tonal.min.js'
import {ivlColors, tonicColors} from '../../src/theme/colors'
import {romanIvls, accFormat} from '../../src/utils/format'
import {tokenize} from '../../src/utils/tokenize'
import {chordIntervals} from '../../src/utils/chordIntervals'
import {Wrapper, SelectionName, MapKey, Ivl, Name} from '../styled/selectionInfo'
import {MockFret} from '../styled/selections'

const notesDetails = (name) => {
  let tokens = tokenize(name)
  let colorArr = tonicColors(tokens[0])
  let intervals = (tokens.length === 2)
    ? chordIntervals(tokens[1])
    : chordIntervals(tokens)
  let notes = Chord.notes(...tokens).map( n => Note.simplify(n) )

  return intervals.map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret color={colorArr[Note.chroma(notes[i])]}>
        <Name>{notes[i]}</Name>
      </MockFret>
    </MapKey>
  )
}

export default ChordInfo = ({name}) => (
  <Wrapper>
    <SelectionName>
      {accFormat(name)}
    </SelectionName>
    {notesDetails(name)}
  </Wrapper>
)
