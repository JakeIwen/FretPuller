import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from '/src/lib/tonal.min.js'
import { TouchableOpacity,Text} from 'react-native'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import { tunings, stringsOnly } from './lib/tunings'
import { Row, Br } from '/src/styled'
import { Button } from 'react-native-elements'
import {Container, Wrapper, NavText, Nav} from '/src/styled/options'
import Selections from '/src/Selections'
 // import {Slider} from 'react-native-multi-slider'

import {accFormat} from '/src/utils/format'

export default class Options extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      type: '',
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

  render() {
    let { type, extensions, chord, tonic } = this.state
    // console.log('tn name', this.state.tuningName);
    console.log('names', Chord.names(true));
    return (
      <Container>
        <Selections
          setChord={this.props.setChord}
        >
        </Selections>
        {/* <SelectChordFlex {...this.state} setChord={this.setChord} /> */}
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
          <Button
            title='CHANGE TUNING'
            onPress={()=>this.setState({showTuningModal: true})}
          />
        </Wrapper>
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
