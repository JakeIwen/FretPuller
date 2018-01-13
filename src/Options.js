import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from '/src/lib/tonal.min.js'
import { TouchableOpacity, Text, Picker } from 'react-native'
import ChordInfo from './ChordInfo'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import { findChordFromNames } from './utils/findChordFromNames'
import { tunings, stringsOnly } from './lib/tunings'
import { Row, Br } from '/src/styled'
import { SelectChord } from './SelectChord'
import { Button } from 'react-native-elements'
// import {Slider} from 'react-native-multi-slider'

import {accFormat} from '/src/utils/format'
const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  background-color: #FDF3E7;
`
const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const NavText = styled.Text`
  font-size: 32;
`
const Nav = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const SelectChordFlex = styled(SelectChord)`
  width: 25%;
`

export default class Options extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      types: [],
      extensions: [],
      chord: 'C',
      sf: '',
      showTuningModal: false,
      tuningName: tunings.find( tuning =>
        tuning.value.join('')===this.props.tuning.join('')
        ).name || 'Custom'
    }
  }
  componentWillReceiveProps(newProps) {
    console.log('new tuning', newProps.tuning)
  }

  setChord = ({tonic, sf, types, extensions}) => {
    let typeArr = types ? types : this.state.types
    let extArr = extensions ? extensions : this.state.extensions
    tonic = tonic || this.state.tonic
    sf = sf===undefined ? this.state.sf : sf
    // sf = sf || this.state.sf
    let found = findChordFromNames( {tonic, sf, typeArr, extArr} )
    this.setState({
      tonic,
      sf,
      chord: found,
      types: typeArr,
      extensions: extArr,
    })
    found!=='unknown' && this.props.setChord(found)
    setTimeout(()=>console.log('new options st', this.state), 500);

  }

  render() {
    let { types, extensions, chord, tonic } = this.state
    // console.log('tn name', this.state.tuningName);
    let pickerVal = (tunings[stringsOnly.indexOf(
      this.props.tuning.join(''))] || {}).name
      || 'custom'
    console.log('names', Chord.names(true));
    return (
      <Container>
        <SelectChordFlex {...this.state} setChord={this.setChord} />
        <Wrapper>
          <Nav>
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
          </Nav>
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
          <Button onPress={()=>this.setState({showTuningModal: true})}>
            CHANGE TUNING
          </Button>
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

          </Picker>
        </Wrapper>
        <TouchableOpacity
          onPress={() => this.setChord({types: [], extensions: []}) }>
          <ChordInfo chord={chord} />
        </TouchableOpacity>
      </Container>
    )
  }
}
{/* <TouchableOpacity onPress={this.props.showAll} >
  <NavText>Show All</NavText>
</TouchableOpacity> */}
