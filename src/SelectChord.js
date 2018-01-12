import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
import Row from 'react-native-row'
import { Chord } from 'tonal'

const MainSelect = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const sfList = ['b', '#']
const tonicsList = ["C", "D", "E", "F", "G", "A", "B"]
const typeList = ['Maj','min','7', '9', '11']
const extensionList = ['add2', 'add4', 'add9', 'sus2', 'sus4']

export const SelectChord = (props) => {
  // console.log({props});
  let {tonic, sf, types, extensions, setChord, chord} = props
  let supersets = Chord.supersets(chord).map( superset => {
    types.forEach( type => {superset = superset.replace(type, '')})
    return superset
  }).concat(extensions).reverse()

  return (
    <Row flex>
      <MainSelect>
        <Row dial={6} spaceAround >
          <RadioSelect
            row
            options={sfList}
            selectedOption={sf}
            onValueChange={newSf => setChord({sf: newSf})}
          />
        </Row>
        <Row>
          <RadioSelect
            options={tonicsList}
            selectedOption={tonic}
            onValueChange={newTonic => setChord({tonic: newTonic})}
          />
          <MultiSelect
            options={typeList}
            selectedOptions={types}
            onValueChange={newTypes => setChord({types: newTypes})}
          />
        </Row>
      </MainSelect>
      <MultiSelect
        options={supersets}
        selectedOptions={extensions}
        onValueChange={extensions => setChord({extensions})}
        flex={2}
      />
    </Row>
  )
}
