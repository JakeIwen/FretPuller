import React, {Component} from 'react'
import RadioSelect from '../Aux/RadioSelect'
import {Row, Col, Txt} from '../../src/styled'
import { Chord } from '../../src/lib/tonal.min.js'
import {TouchableOpacity} from 'react-native'
import { SelectionButton, ResetButton} from '../../src/styled/selections'
import ChordInfo from './ChordInfo'
import {indexLoop} from '../../src/utils/indexLoop'
import { range } from 'lodash/fp'
// require('../../src/lib/tonal.min.js')

const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const preferredList = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
const allNames = Chord.names().sort().reverse()
console.log({allNames});
export default class Selections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tonic: props.tonic,
      extensions: [],
      name: 'C',
      activeSelector: 'tonic',
    }
  }

  setChord = ({tonic, extensions}) => {
    let activeSelector
    if (tonic) {
      activeSelector = 'extensions0'
    } else if ((extensions || []).length){
      tonic = this.state.tonic
    } else {
      tonic = this.state.tonic
      activeSelector = 'tonic'
    }
    const extArr = extensions || this.state.extensions
    const chord = extArr.join('')
    tonic = tonic || this.state.tonic
    const exists = Chord.exists(chord)
    this.setState({
      tonic,
      name: exists ? (tonic + chord) : this.state.name,
      extensions: extArr,
      activeSelector: activeSelector || 'extensions' + extArr.length
    })
    exists && this.props.setChord({tonic, chord})
  }

  changeExtValue = (newExt, sIndex) => {
    let {extensions} = this.state
    // debugger;
    if (sIndex == extensions.length) {
      return this.setChord({extensions: extensions.slice(0,sIndex).concat(newExt)})
    }
    extensions = extensions.slice(0,sIndex+1)
    return newExt
      ? this.setChord({
        extensions: extensions.map((ext,i)=>i==sIndex ? newExt : ext)
      })
      : this.setChord({extensions: extensions.slice(0,sIndex)})
  }

  optionList = () => {
    const {tonic, extensions} = this.state
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
                options={this.extOptions(extensions.slice(0,sIndex).join(''), sIndex)}
                selectedOption={extensions[sIndex]}
                onValueChange={newExt=>this.changeExtValue(newExt, sIndex)}/>
            </Col>
          )
        })}
      </Row>
    )
  }
  
  extOptions = (currentName, sIndex) => {
    //must begin with currentName to be a possible chord/
    // TODO: find extra possibilities with aliases
    // TODO: slash chords A/G
    let possibilities = [...new Set(allNames.filter(name => name.startsWith(currentName))
      .map(name => name.replace(currentName, '')))].filter(p => p)
    
    if (sIndex > 1) return possibilities
    const counts = []
    
    if (possibilities.length) {
      for (let len = Math.max(...possibilities.map(p=>p.length)); len; len--) {
        const clippedPosses = possibilities.map(p => p.slice(0,len))
        console.log({clippedPosses});
        clippedPosses.forEach(term => {
          const matches = possibilities.filter(poss => poss.slice(0,len) === term)
          // if (term=='sus') {
          //   debugger;
          // }
          if (matches.length > 1) {
            possibilities = possibilities.filter(poss => poss.slice(0,len) !== term)
            counts.push([term, matches.length, matches])
          }
        } )
      }
    }
    
    const ret = counts.map(c => c[0]).concat(possibilities)
    const res = ret
      .filter( val => !ret.some(term=>val.startsWith(term) && term!==val)).sort().reverse()
      // .sort((a,b) => (parseInt(a) && parseInt(b)) ? parseInt(b) - parseInt(a) : b - a)
    return res
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
    return (
      <Row flex style={{marginBottom: -40}}>
        <Col style={{width: 140}}>
          <Row spaceAround>
            <TouchableOpacity onPress={()=>this.cycleTonic(this.state.tonic, -1)}>
              <Txt>{'\u266D'}</Txt>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.cycleTonic(this.state.tonic, 1)}>
              <Txt>{'\u266F'}</Txt>
            </TouchableOpacity>
          </Row>
          <ChordInfo
            tonic={this.state.tonic}
            chord={this.state.extensions.join('')} />
          <ResetButton title='RESET' onPress={this.reset} />
        </Col>
        <Col flex>
          {this.optionList()}
        </Col>
      </Row>
    )
  }
}
