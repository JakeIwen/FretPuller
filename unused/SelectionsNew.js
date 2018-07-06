import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import {Row, Col} from '../../src/styled'
import { Chord } from '../../src/lib/tonal.min.js'
import {TouchableOpacity, Text} from 'react-native'
import { SelectionButton, ResetButton, Txt } from '../../src/styled/selections'
import ChordInfo from './ChordInfo'
import {indexLoop} from '../../src/utils/indexLoop'
import { range } from 'lodash/fp'


const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const preferredList = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
const typeList = ['M', 'm', 'o', 'aug']
const typeAlias = ['M', 'm', 'o', 'aug']
const allNames = Chord.names().sort().reverse()

export default class Selections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      extensions: [],
      chord: 'C',
      fullChord: 'C',
      activeSelector: 'tonic',
    }
  }

  setMatrix = () => {
    optionMatrix = []
    optionMatrix.push(preferredList)
    optionMatrix.push(this.extOptions('C'))
  }

  extOptions = (currentName) => {
    let possibilities = currentName
      ? allNames.filter(name => name.startsWith(currentName))
        .map(name => name.replace(currentName, ''))
      : allNames
    let res = ['']
    if (possibilities.length) {
      debugger;
      let lastPoss = possibilities[0]
      possibilities.forEach((poss,i)=> {
        if (i===0) return
        let j = 0
        while(poss[j]===lastPoss[j]) j++
        if (j) {
            res.pop()
            res.push(poss.slice(0,j))
        } else {
          res.push(poss)
        }
        lastPoss = poss
      })
    }
    return res.filter(item=>!!item)
  }


  render(){
    let {tonic, fullChord} = this.state
    return (
      <Row flex>
        <Col>
          <Row spaceAround>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, -1)}>
              <Txt>{'\u266D'}</Txt>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, 1)}>
              <Txt>{'\u266F'}</Txt>
            </TouchableOpacity>
          </Row>
          <ChordInfo colorArr={this.props.colorArr} chord={fullChord} />
          <ResetButton title='RESET' onPress={this.reset} />
        </Col>
        {/* <Col>
          {this.chordElements()}
        </Col> */}
        <Col flex>

          {this.optionList()}
        </Col>
      </Row>
    )
  }
}
