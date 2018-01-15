import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
import {Row, Col} from '/src/styled'
import { Chord } from '/src/lib/tonal.min.js'
import {ScrollView} from 'react-native'


const sfList = ['b', '#']
const tonicsList = ["C", "D", "E", "F", "G", "A", "B"]
const typeList = ['maj', 'min', 'dim', 'aug']
const typeAlias = ['M', 'm', 'o', 'aug']
const extensionList = ['add2', 'add4', 'add9', 'sus2', 'sus4']

export const SelectChord = (props) => {
  // console.log({props});
  let {tonic, sf, type, extensions, setChord, chord} = props
  let alias = type && typeAlias[typeList.indexOf(type)] + extensions[0]
  console.log({alias});
  let supersets = Chord.supersets(chord).map(item=>item.replace(alias, '')).sort()
  // .map( superset => {
  //   type.forEach( type => {superset = superset.replace(type, '')})
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
      <Col>
        <RadioSelect
          options={typeList}
          selectedOption={type}
          onValueChange={newType => setChord({type: newType})}
        />
      </Col>
      {/* <Col> */}
      <ScrollView>
        <MultiSelect
          options={supersets}
          selectedOptions={extensions}
          onValueChange={extensions => setChord({extensions})}
          // flex={2}
        />
      </ScrollView>
    {/* </Col> */}
    </Row>
  )
}
