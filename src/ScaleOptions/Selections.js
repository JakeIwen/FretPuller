import {TouchableOpacity, Text} from 'react-native'
import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import {Row, Col} from '../styled'
import { Chord, Scale } from '../lib/tonal.min.js'
import { SelectionButton, ResetButton, Txt } from '../styled/selections'
import ChordInfo from './ChordInfo'
import {indexLoop} from '../utils/indexLoop'
import { range } from 'lodash/fp'

console.log({Scale});
const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const preferredList = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
const typeList = ['M', 'm', 'o', 'aug']
const typeAlias = ['M', 'm', 'o', 'aug']
const allScaleNames = Scale.names().sort().reverse()
console.log('allScaleNames', allScaleNames);
export default class Selections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      scale: 'mine',
      name: 'C',
      fullName: 'C',
    }
    console.log({Chord, Scale});

    console.log('scale notes', Scale.notes(props.tonic));
    console.log(this);
  }
  optionList = () => {
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
            options={allScaleNames}
            selectedOption={this.props.scale}
            onValueChange={scale => this.props.setScale({scale})}/>
        </Col>

      </Row>
    )
  }
  extOptions = (currentName) => {
    //must begin with currentName to be a possible chord/
    let possibilities = currentName
      ? allScaleNames.filter(name => name.startsWith(currentName))
        .map(name => name.replace(currentName, ''))
      : allScaleNames
    let res = ['']
    if (possibilities.length) {
      let lastPoss = possibilities[0]
      possibilities.forEach((poss,i)=> {
        if (i===0) return
        let j = 0
        while(poss[j]===lastPoss[j]) j++
        if (j) {
          if(j==poss.length-1) j++
          res.pop()
          res.push(poss.slice(0,j))
        } else {
          res.push(poss)
        }
        lastPoss = poss
      })
    }
    return res.filter(item=>{
      return !!item
    })
  }

  reset = () => this.setAcale({scale: ''})

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
    let {tonic, fullName} = this.state
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
          <ChordInfo name={fullName} />
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
