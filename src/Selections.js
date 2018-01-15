import React, {Component} from 'react'
import styled from "styled-components/native"
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
import {Row, Col} from '/src/styled'
import { Chord } from '/src/lib/tonal.min.js'
import {TouchableOpacity, Text} from 'react-native'
import { SelectionButton, Txt } from '/src/styled/options'
import { findChordFromNames } from '/src/utils/findChordFromNames'
import ChordInfo from './ChordInfo'

const sfList = ['b', '#']
const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const typeList = ['M', 'm', 'o', 'aug']
const typeAlias = ['M', 'm', 'o', 'aug']
const allNames = Chord.names()

export default class Selections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      type: 'M',
      extensions: [],
      chord: 'CM',
      sf: '',
      fullChord: 'CM',
      activeSelector: 'tonic',
    }
  }

  setChord = ({tonic, sf, type, extensions}) => {
    sf = sf===undefined ? this.state.sf : sf
    let newChord, activeSelector, extArr
    if (tonic) {
      let extArr = []
      newChord = tonic + sf + this.state.type
      activeSelector = 'type'
    } else {
      tonic = this.state.tonic
    }
    if (type) {
      newChord = this.state.tonic + sf + type
      activeSelector = 'extensions0'
    } else {
      type = this.state.type
    }
    if (extensions) {
      extArr = extensions
      newChord = tonic + sf + type + extArr.join('')
    } else {
      extArr = []
    }

    // let extArr = extensions ? extensions : this.state.extensions
    tonic = tonic || this.state.tonic
    // sf = sf || this.state.sf
    // let newChord = findChordFromNames( {tonic, sf, type, extArr} )
    let exists = allNames.includes(type + extArr.join(''))
    console.log({exists}, type + extArr.join(''));
    this.setState({
      tonic,
      sf,
      fullChord: exists ? newChord : this.state.fullChord,
      chord: exists ? newChord : this.state.chord,
      type,
      extensions: extArr,
      activeSelector: activeSelector || 'extensions' + extArr.length
    })
    exists && this.props.setChord(newChord)
  }

  optionList = () => {
    let {tonic, sf, type, activeSelector, extensions} = this.state
    // let option, selectedOption
    return (
      <Col>
        {activeSelector==='tonic' && <RadioSelect
          options={tonicList}
          selectedOption={tonic}
          onValueChange={newTonic => newTonic===this.state.tonic
            ? this.setState({activeSelector : 'extensions' + extensions.length-1})
            : this.setChord({tonic: newTonic})}/>
        }
        {activeSelector==='type' && <RadioSelect
          options={typeList}
          selectedOption={type}
          onValueChange={newType => newType===this.state.type
            ? this.setState({activeSelector : 'extensions' + extensions.length-1})
            : this.setChord({type: newType})}/>
        }
        {activeSelector.startsWith('extensions') && <RadioSelect
          options={this.extOptions()}
          selectedOption={extensions[activeSelector.slice(-1)]}
          onValueChange={newExt => {
            let newExtensions = extensions
              .slice(0,activeSelector.slice(-1))
              .concat(newExt)
            console.log('new extensions', newExtensions);
            this.setChord({extensions: newExtensions})
          }}/>
        }
      </Col>
    )
  }
  extOptions = () => {
    let {type, extensions} = this.state
    // let alias = type && typeAlias[typeList.indexOf(type)]
    let currentName = type + extensions.join('')
    console.log({allNames, possibilities});
    let possibilities = allNames
      .filter(name => name.startsWith(currentName))
      .map(name => name.replace(currentName, ''))
      .sort()
      .reverse()
    let res = ['']
    if (possibilities.length) {
      let lastPoss = possibilities[0]
      possibilities.forEach((pos,i)=> {
        if (i===0) return
        let j = 0
        while(pos[j]===lastPoss[j]) j++
        if (j) {
            res.pop()
            res.push(pos.slice(0,j))
        } else {
          res.push(pos)
        }
        lastPoss = pos
      })
    }
    // res = [...new Set(res)]
    console.log({possibilities, res});
    return res
  }

  render(){
  // console.log({props});
    let {chord, tonic, sf, type, activeSelector, extensions, fullChord} = this.state
    console.log('selections render', this.state);
    return (
      <Row flex spaceAround>
        <TouchableOpacity
          onPress={() => this.setChord({type: 'M'}) }>
          <ChordInfo chord={fullChord} />
        </TouchableOpacity>
        <Col>
          <SelectionButton
            activated={activeSelector==='tonic'}
            onPress={() => this.setState({activeSelector: 'tonic'}) }
          ><Txt>{tonic}</Txt>
        </SelectionButton>
          <SelectionButton
            activated={activeSelector==='type'}
            onPress={() => this.setState({activeSelector: 'type'}) }>
              <Txt>{type}</Txt>
          </SelectionButton>
          {extensions.concat('').map((ext,i) =>
            <SelectionButton
              key={i}
              activated={activeSelector===('extensions' + i)}
              onPress={() => this.setState({activeSelector: 'extensions' + i}) }
            >
              <Txt>{ext}</Txt>
            </SelectionButton>
            )
          }
        </Col>
        {this.optionList()}
      </Row>
    )
  }
}
