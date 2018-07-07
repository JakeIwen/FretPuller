import React from 'react'
import styled from "styled-components/native"
import { Scale, Note } from '../lib/tonal.min.js'
import {ivlColors, tonicColors} from '../theme/colors'
import {romanIvls, accFormat} from '../utils/format'
import {tokenize} from '../utils/tokenize'
import {Wrapper, SelectionName, MapKey, Ivl, Name} from '../styled/selectionInfo'
import {MockFret} from '../styled/selections'

const notesDetails = (name) => {
  let tokens = tokenize(name)
  let colorArr = tonicColors(tokens[0])
  let intervals = (tokens.length === 2)
    ? Scale.intervals(tokens[1])
    : Scale.intervals(tokens)
  let notes = Scale.notes(...tokens).map( n => Note.simplify(n) )

  return intervals.map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret color={colorArr[Note.chroma(notes[i])]}>
        <Name>{notes[i]}</Name>
      </MockFret>
    </MapKey>
  )
}

export default ScaleInfo = ({name}) => (
  <Wrapper>
    <SelectionName>
      {name}
    </SelectionName>
    {notesDetails(name)}
  </Wrapper>
)
