import {TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import RadioSelect from '../Aux/RadioSelect'
import {Row, Col} from '../styled'
import {  Txt } from '../styled/selections'
import ScaleInfo from './ScaleInfo'
import {indexLoop} from '../utils/indexLoop'
import { modeNames} from '../lib/scaleNames'

const columns = [modeNames]

// const tonicList = ["C", "D", "E", "F", "G", "A", "B"]
const preferredList = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]

export default class Selections extends Component {

  optionList = () => {
    return (
      <Row>
        <Col>
          <RadioSelect scale
            preventUnselect
            height={(this.props.containerHeight - 5) / preferredList.length}
            options={preferredList}
            selectedOption={this.props.tonic}
            onValueChange={tonic => this.props.setScale({tonic})}/>
        </Col>
        {columns.map((optionList, i) =>
          <Col key={i}>
            <RadioSelect scale
              options={optionList}
              height={(this.props.containerHeight - 5) / optionList.length}
              selectedOption={this.props.scale}
              onValueChange={scale =>
                this.props.setScale({scale: scale.split(' (')[0].toLowerCase()})
              }/>
          </Col>
        )}
      </Row>
    )
  }

  cycleTonic(tonic, diff) {
    let index = preferredList.indexOf(tonic)
    index = indexLoop(index + diff, preferredList)
    this.props.setScale({tonic: preferredList[index]})
  }

  render(){
    const {tonic, scale} = this.props
    return (
      <Row flex style={{marginBottom: -40}}>
        <Col style={{width: 150}}>
          <Row spaceAround>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, -1)}>
              <Txt>{'\u266D'}</Txt>
            </TouchableOpacity>
            <Txt size={32}>{tonic}</Txt>
            <TouchableOpacity onPress={() => this.cycleTonic(tonic, 1)}>
              <Txt>{'\u266F'}</Txt>
            </TouchableOpacity>
          </Row>
          <ScaleInfo tonic={tonic} scale={scale}/>
        </Col>
        <Col flex>
          {this.optionList()}
        </Col>
      </Row>
    )
  }
}
