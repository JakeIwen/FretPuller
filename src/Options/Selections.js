import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import {Row, Col} from '/src/styled'
import { Chord } from '/src/lib/tonal.min.js'
import {TouchableOpacity, Text} from 'react-native'
import { SelectionButton, Txt } from '/src/styled/options'
import ChordInfo from './ChordInfo'
import {ScrollView} from 'react-native'
import {indexLoop} from '/src/utils/indexLoop'

const sfList = ['b', '#']
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
      sf: '',
      fullChord: 'C',
      activeSelector: 'tonic',
    }
  }


  setChord = ({tonic, sf, extensions}) => {
    sf = sf===undefined ? this.state.sf : sf
    let newChord, activeSelector, extArr
    if (tonic) {
      newChord = tonic + sf
      activeSelector = 'extensions0'
    } else {
      tonic = this.state.tonic
    }
    if (extensions) {
      extArr = extensions
      newChord = tonic + sf + extArr.join('')
    } else {
      extArr = this.state.extensions
    }
    tonic = tonic || this.state.tonic
    let exists = Chord.exists(extArr.join(''))
    this.setState({
      tonic,
      sf,
      fullChord: exists ? newChord : this.state.fullChord,
      chord: exists ? newChord : this.state.chord,
      extensions: extArr,
      activeSelector: activeSelector || 'extensions' + extArr.length
    })
    exists && this.props.setChord(newChord)
  }

  optionList = () => {
    let {tonic, activeSelector, extensions} = this.state
    // let option, selectedOption
    let sIndex = activeSelector.slice(-1)
    return (
      <Col>
        <ScrollView>
        {activeSelector==='tonic' && <RadioSelect
          options={tonicList}
          selectedOption={tonic}
          onValueChange={newTonic => newTonic===this.state.tonic
            ? this.setState({activeSelector : 'extensions0'})
            : this.setChord({tonic: newTonic})}/>
        }
        {activeSelector.startsWith('extensions') && <RadioSelect
          options={this.extOptions(extensions.slice(0,sIndex).join(''))}
          selectedOption={extensions[sIndex]}
          onValueChange={newExt => newExt
            ? this.setChord({
              extensions: extensions.slice(0,sIndex).concat(newExt)
            })
            : this.setChord({extensions: extensions.slice(0,sIndex)})
          }/>
        }
        </ScrollView>
      </Col>
    )
  }
  extOptions = (currentName) => {
    let {extensions} = this.state
    // let alias = type && typeAlias[typeList.indexOf(type)]
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
            res.pop()
            res.push(poss.slice(0,j))
        } else {
          res.push(poss)
        }
        lastPoss = poss
      })
    }
    return res
  }

  reset() { this.setChord({extensions: []}) }

  cycleTonic(tonic, diff) {
    let index = preferredList.indexOf(tonic)
    index = indexLoop(index + diff, preferredList)
    this.setChord({tonic: preferredList[index]})
  }

  render(){
    let {chord, tonic, sf, type, activeSelector, extensions, fullChord} = this.state
    return (
      <Row flex spaceBetween>
        <Col>
          <TouchableOpacity onPress={this.reset}>
            <Txt>{"RESET"}</Txt>
          </TouchableOpacity>
          <Row spaceAround>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, -1)}>
              <Txt>{'\u266D'}</Txt>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, 1)}>
              <Txt>{'\u266F'}</Txt>
            </TouchableOpacity>
          </Row>
          <ChordInfo colorArr={this.props.colorArr} chord={fullChord} />
        </Col>
        <Row>
          <SelectionButton
            activated={activeSelector==='tonic'}
            onPress={() => this.setState({activeSelector: 'tonic'}) }
          >
            <Txt>{tonic}</Txt>
          </SelectionButton>
          {extensions.concat('').map((ext,i) =>
            <SelectionButton
              key={i}
              activated={activeSelector===('extensions' + i)}
              onPress={() => this.setState({activeSelector: 'extensions' + i})}
            >
              <Txt>{ext}</Txt>
            </SelectionButton>
            )
          }
        </Row>
        {this.optionList()}
      </Row>
    )
  }
}
