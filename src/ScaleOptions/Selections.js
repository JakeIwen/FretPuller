import {TouchableOpacity, Text} from 'react-native'
import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import {Row, Col} from '../styled'
import { Chord, Scale } from '../lib/tonal.min.js'
import { SelectionButton, Txt } from '../styled/selections'
import ScaleInfo from './ScaleInfo'
import {indexLoop} from '../utils/indexLoop'
import { range } from 'lodash/fp'
const allScaleNames = Scale.names(false).sort()

const tokens = allScaleNames.map(name => name.split(' '))
const columns = range(0,3).map(num =>
  [...new Set(
    allScaleNames.map(name => name.split(' ')[num]))
  ]
)
console.log({columns, tokens});
const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const preferredList = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]

console.log('allScaleNames', allScaleNames);
export default class Selections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'C',
      fullName: 'C',
      cursor: 0
    }
  }
  optionList = () => {
    console.log('props', this.props);
    return (
      <Row>
        <Col>
          <RadioSelect
            preventUnselect
            options={tonicList}
            selectedOption={this.props.tonic}
            onValueChange={tonic => this.props.setScale({tonic})}/>
        </Col>
            <Col>

            <RadioSelect
              options={columns[0]}
              selectedOption={this.props.scale}
              onValueChange={scale => this.props.setScale({scale})}/>
            </Col>

      </Row>
    )
  }

  cycleTonic(tonic, diff) {
    let index = preferredList.indexOf(tonic)
    index = indexLoop(index + diff, preferredList)
    this.setChord({tonic: preferredList[index]})
  }

  chordElements = () => (
    <Row style={{width: 120}}>
      <SelectionButton
        activated={this.state.activeSelector==='tonic'}
        onPress={() => this.setState({activeSelector: 'tonic'}) }
      >
        <Txt>{this.state.tonic}</Txt>
      </SelectionButton>
      {this.state.extensions.concat('').map((ext,i) =>
        <SelectionButton
          key={i}
          activated={this.state.activeSelector===('extensions' + i)}
          onPress={() => this.setState({activeSelector: 'extensions' + i})}
        >
          <Txt>{ext}</Txt>
        </SelectionButton>
      )}
    </Row>
  )

  render(){
    const {tonic, scale} = this.props
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
          <ScaleInfo name={tonic + scale}/>
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
