import React from 'react'
import styled from "styled-components/native"
import { Chord, Note } from 'src/lib/tonal.min.js'
import {ivlColors} from 'src/theme/colors'
import {romanIvls, accFormat} from 'src/utils/format'
import {tokenize} from 'src/utils/tokenize'
import {chordIntervals} from 'src/utils/chordIntervals'

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 5px;
`
const SelectedChord = styled.Text`
  font-size: 30;
  ${'' /* align-self: center; */}
`
const MockFret = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || 'transparent'};
  border: 1px solid black;
  border-radius: 5px;
  margin: 2px;
  height: 20px;
  width: 50px;
`
const MapKey = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
const Ivl = styled.Text`
  font-size: 12;
  width: 30px;
  text-align:right;
  font-family: Menlo;
`

const Name = styled.Text`
  font-size: 12;
  font-family: Menlo;
`

const chordDetails = (chord, colorArr) => {
  let tokens = tokenize(chord)
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

export default ChordInfo = ({chord, colorArr}) => (
  <Wrapper>
    <SelectedChord>
      {accFormat(chord)}
    </SelectedChord>
    {chordDetails(chord, colorArr)}
  </Wrapper>
)
