import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import {Row, Col} from '../../src/styled'
import { Chord, Scale } from '../../src/lib/tonal.min.js'
import {TouchableOpacity, Text} from 'react-native'
import { SelectionButton, ResetButton, Txt } from '../../src/styled/selections'
import ChordInfo from './ChordInfo'
import {indexLoop} from '../../src/utils/indexLoop'
import { range } from 'lodash/fp'
// require('../../src/lib/tonal.min.js')

console.log({Scale});
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
      name: 'C',
      fullName: 'C',
      activeSelector: 'tonic',
    }
    console.log({Chord, Scale});

    console.log(Chord.notes('CM'));
    console.log(this);
  }

  setChord = ({tonic, extensions}) => {
    let chord, activeSelector
    if (tonic) {
      activeSelector = 'extensions0'
    } else if ((extensions || []).length){
      tonic = this.state.tonic
    } else {
      tonic = this.state.tonic
      activeSelector = 'tonic'
    }
    let extArr = extensions || this.state.extensions
    chord = extArr.join('')
    tonic = tonic || this.state.tonic
    let exists = Chord.exists(chord)
    this.setState({
      tonic,
      fullName: exists ? (tonic + chord) : this.state.fullName,
      name: exists ? (tonic + chord) : this.state.name,
      extensions: extArr,
      activeSelector: activeSelector || 'extensions' + extArr.length
    })
    exists && this.props.setChord(tonic, chord)
  }

  optionList = () => {
    let {tonic, activeSelector, extensions} = this.state
    // let option, selectedOption
    let sIndex = activeSelector.slice(-1)
    console.log({activeSelector});
    console.log('extensions length', (extensions || []).length);
    console.log('tonic', tonic);
    let exts = [...extensions]
    return (
      <Row>
        <Col>
          <RadioSelect
            preventUnselect
            options={tonicList}
            selectedOption={tonic}
            onValueChange={newTonic => this.setChord({tonic: newTonic})}/>
        </Col>
        {range(0, extensions.length+1).map(sIndex => {
          return (
            <Col key={sIndex}>
              <RadioSelect
                options={this.extOptions(extensions.slice(0,sIndex).join(''))}
                selectedOption={extensions[sIndex]}
                onValueChange={newExt => {
                  if (sIndex == extensions.length) {
                    return this.setChord({extensions: extensions.slice(0,sIndex).concat(newExt)})
                  }
                  return newExt
                    ? this.setChord({
                      extensions: extensions.map((ext,i)=>i==sIndex ? newExt : ext)
                    })
                    : this.setChord({extensions: extensions.slice(0,sIndex)})
                }}/>
            </Col>
          )
        })}

      </Row>
    )
  }
  extOptions = (currentName) => {
    //must begin with currentName to be a possible chord/
    let possibilities = currentName
      ? allNames.filter(name => name.startsWith(currentName))
        .map(name => name.replace(currentName, ''))
      : allNames
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

  reset = () => this.setChord({extensions: []})

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
          <ChordInfo colorArr={this.props.colorArr} name={fullName} />
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
