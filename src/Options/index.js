import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from '/src/lib/tonal.min.js'
import { TouchableOpacity, Text} from 'react-native'
import CheckBox from 'react-native-checkbox'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import { tunings, stringsOnly } from '/src/lib/tunings'
import { Row, Col, Br } from '/src/styled'
import { Button } from 'react-native-elements'
import {Container, RightOptions, NavText, OptionSection, OptionSectionCol, Txt, ChordOpts, ChangeTuning} from '/src/styled/options'
import Selections from './Selections'
import Slider from '@ptomasroos/react-native-multi-slider'
import {accFormat} from '/src/utils/format'
import { range } from 'lodash/fp'
import Dimensions from 'Dimensions'

const widthCalc = (pos, fbWidth) =>
  ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2

const numFrets = 13

const closest = (arr, val) => arr.reduce((prev, curr) =>
  Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev)

export default class Options extends Component {

  constructor(props) {
    super(props)
    let sliderStops = [0, widthCalc(numFrets, numFrets)]
    let sum = sliderStops[1]
    sliderStops.push(...range(0, numFrets-1).map( n => {
      sum += widthCalc(n, numFrets)
      return sum
    } ))
    this.state = {
      sliderStops,
      showTuningModal: false,
      sliderValue: [0,100],
      tuningName: tunings.find( tuning =>
        tuning.value.join('')===this.props.tuning.join('')
        ).name || 'Custom'
    }
  }

  sliderValuesChange = (vals) => {
    let snappedVals = vals.map(val => closest(this.state.sliderStops, val))
    console.log({snappedVals})
    this.props.fretFilter({
      fretRange: snappedVals.map( (val) => this.state.sliderStops.indexOf(val))
    })
    this.setState({
      sliderValue: vals.map(val=>Math.floor(closest(this.state.sliderStops, val))),
    });
  }

  render() {
    let { type, extensions, chord, tonic } = this.state
    return (
      <Container height={Dimensions.get('window').height - this.props.fbHeight}>
        <Slider
          sliderLength={Dimensions.get('window').width}
          values={this.state.sliderValue}
          min={0}
          max={100}
          step={1}
          onValuesChangeFinish={this.sliderValuesChange}
          containerStyle={{ height: 15 }}
        />
        <Row flex>
          <Selections
            colorArr={this.props.colorArr}
            setChord={this.props.setChord}
          />
          <RightOptions>
            <OptionSection>
              <TouchableOpacity onPress={()=>this.props.newVariation(true)} >
                <NavText>&larr;</NavText>
              </TouchableOpacity>
              <Text>
                {this.props.variationIndex+1} of {this.props.numVariations}
                <Br/>possible <Br/>variations
              </Text>
              <TouchableOpacity onPress={()=>this.props.newVariation()} >
                <NavText>&rarr;</NavText>
              </TouchableOpacity>
            </OptionSection>
            <Modal
              isVisible={this.state.showTuningModal}
              supportedOrientations={['portrait', 'landscape']} >
              <Tuning
                initialTuning={this.props.tuning}
                onSave={ tuning => {
                  this.setState({showTuningModal: false})
                  console.log('tuning onsave', tuning)
                  this.props.changeFretboard({tuning})}
                } />
            </Modal>
            <OptionSectionCol spaceBetween>
              <Text>Max Fret Span</Text>
              <Row>
                <TouchableOpacity
                  disabled={this.props.maxFretSpan < 3}
                  onPress={ ()=>this.props.fretFilter({
                    maxFretSpan: this.props.maxFretSpan-1,
                    incZeroFret: true
                  })}>
                  <NavText>&larr;</NavText>
                </TouchableOpacity>
                <NavText>{this.props.maxFretSpan}</NavText>
                <TouchableOpacity
                  disabled={this.props.maxFretSpan > 6}
                   onPress={()=>this.props.fretFilter({
                  maxFretSpan: this.props.maxFretSpan+1,
                  incZeroFret: true
                })} >
                  <NavText>&rarr;</NavText>
                </TouchableOpacity>
              </Row>
            </OptionSectionCol>
            <CheckBox
              label='Allow Open Strings'
              onChange={val => this.props.fretFilter({incZeroFret: val})}
              checked={this.props.incZeroFret}
            />
            <CheckBox
              label='Select Octaves'
              onChange={val => this.props.changeSettings({incOctaves: !val})}
              checked={this.props.incOctaves}
            />
            <ChangeTuning
              title='CHANGE TUNING'
              onPress={()=>this.setState({showTuningModal: true})}
            />
          </RightOptions>
        </Row>
      </Container>
    )
  }
}

// setChord = ({tonic, sf, type, extensions}) => {
//   type = type ? type : this.state.type
//   let extArr = extensions ? extensions : this.state.extensions
//   tonic = tonic || this.state.tonic
//   sf = sf===undefined ? this.state.sf : sf
//   // sf = sf || this.state.sf
//   let found = findChordFromNames( {tonic, sf, type, extArr} )
//   this.setState({
//     tonic,
//     sf,
//     chord: found,
//     type,
//     extensions: extArr,
//   })
//   found!=='unknown' && this.props.setChord(found)
//   setTimeout(()=>console.log('new options st', this.state), 500);
//
// }

{/* <TouchableOpacity onPress={this.props.showAll} >
  <NavText>Show All</NavText>
</TouchableOpacity> */}
{/*
  let pickerVal = (tunings[stringsOnly.indexOf(
    this.props.tuning.join(''))] || {}).name
    || 'custom'

  <Picker
  selectedValue={pickerVal}
  onValueChange={(val, index) => val==='Custom'
    ? this.setState({showTuningModal: true})
    : this.props.changeFretboard({tuning: tunings[index].value})
  }
>
  {tunings.map((tng, i) =>
    <Picker.Item key={i} label={accFormat(tng.name)} value={tng.name} />
  )}

</Picker> */}
