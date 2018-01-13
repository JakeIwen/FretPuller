import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
import {Row, Col} from '/src/styled'
import { Chord } from '/src/lib/tonal.min.js'
import {ScrollView} from 'react-native'


const sfList = ['b', '#']
const tonicsList = ["C", "D", "E", "F", "G", "A", "B"]
const typeList = ['maj','m','dim', 'aug', '11']
const extensionList = ['add2', 'add4', 'add9', 'sus2', 'sus4']

export const SelectChord = (props) => {
  // console.log({props});
  let {tonic, sf, types, extensions, setChord, chord} = props
  let supersets = Chord.supersets(chord).reverse()
  // .map( superset => {
  //   types.forEach( type => {superset = superset.replace(type, '')})
  //   return superset
  // })
  // .concat(extensions).reverse()

  return (
    <Row flex spaceAround>
      <Col flex={0.5}>
        <Row>
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
        </Row>
      </Col>
      <Col flex={0.5}>
        <MultiSelect
          options={typeList}
          selectedOptions={types}
          onValueChange={newTypes => setChord({types: newTypes})}
        />
      </Col>
      <ScrollView>
        <MultiSelect
          options={supersets}
          selectedOptions={extensions}
          onValueChange={extensions => setChord({extensions})}
          // flex={2}
        />
      </ScrollView>
    </Row>
  )
}
