import React from 'react'
import styled from "styled-components/native"
import { Chord } from 'tonal'
import ivlColors from './theme/colors'
import {romanIvls} from './utils/convert'

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  margin: 5px;
`
const SelectedChord = styled.Text`
  font-size: 30;
  align-self: center;
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

const chordDetails = (chord) => {
  let notes = Chord.notes(chord)
  return Chord.intervals(chord).map( (ivl, i) =>
    <MapKey key={i}>
      <Ivl>{romanIvls(ivl)}: </Ivl>
      <MockFret color={ivlColors[ivl]}>
        <Name>{notes[i]}</Name>
      </MockFret>
    </MapKey>
  )
}

export default chordInfo = ({chord}) => (
  <Wrapper>
    <SelectedChord>
      {chord.replace('#','\u266D').replace('b', '\u266F')}
    </SelectedChord>
    {chordDetails(chord)}
  </Wrapper>
)
