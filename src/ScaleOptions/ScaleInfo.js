import React from 'react'
import { Scale, Note } from '../lib/tonal.min.js'
import { tonicColors} from '../theme/colors'
import {romanIvls, accFormat} from '../utils/format'
import {tokenize} from '../utils/tokenize'
import {Wrapper, SelectionName, MapKey, Ivl, Name} from '../styled/selectionInfo'
import {MockFret} from '../styled/selections'

const notesDetails = (name) => {
  const tokens = tokenize(name)
  const colorArr = tonicColors(tokens[0])
  const intervals = (tokens.length === 2)
    ? Scale.intervals(tokens[1])
    : Scale.intervals(tokens)
  const notes = Scale.notes(...tokens).map( n => Note.simplify(n) )

  return intervals.map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret scale color={colorArr[Note.chroma(notes[i])]}>
        <Name>{accFormat(notes[i])}</Name>
      </MockFret>
    </MapKey>
  )
}

export default ScaleInfo = ({tonic, scale}) => {
  const split = scale.split(' ')
  const addendum = split.length > 1 ? '-' + split[1][0] : ''
  return <Wrapper>
    <SelectionName>
      {accFormat(split[0] + addendum)}
    </SelectionName>
    {notesDetails(tonic + scale)}
  </Wrapper>
}
