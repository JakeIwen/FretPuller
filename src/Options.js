import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from 'tonal'
import {TouchableOpacity, Text, Picker} from 'react-native'
import ChordInfo from './ChordInfo'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import {findChordFromNames} from './utils/findChordFromNames'
import {tunings} from './lib/tunings'
import Row from 'react-native-row'
import {SelectChord} from './SelectChord'

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
  font-size: 26;
`
const Nav = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const SelectChordFlex = styled(SelectChord)`
  width: 25%;
`

const typeListV = ['\u266D','\u266F','Maj','min', '7', '9', '11']
const tStrings = tunings.map( t => (t.value || []).join('') )
export default class Options extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      types: ['M'],
      extensions: [],
      chord: 'CM',
      showTuningModal: false,
      tuningName: tunings.find( tuning =>
        tuning.value.join('')===this.props.tuning.join('')
        ).name || 'Custom'
    }
  }
  componentWillReceiveProps(newProps) {
    console.log('new tuning', newProps.tuning);
  }

  setChord = ({tonic, types, extensions}) => {
    let typeArr = types ? types : this.state.types
    let extArr = extensions ? extensions : this.state.extensions
    tonic = tonic || this.state.tonic
    let found = findChordFromNames({tonic, typeArr, extArr})
    this.setState({
      tonic,
      chord: found,
      types: typeArr,
      extensions: extArr,
    })
    console.log('st', this.state);
    found!=='unknown' && this.props.setChord(found)
  }

  render() {
    let {types, extensions, chord, tonic } = this.state
    console.log('tn name', this.state.tuningName);
    return (
      <Container>
        <SelectChordFlex
          {...this.state}
          setChord={this.setChord}
        />
        <ChordInfo chord={chord} />
        <Wrapper>
          <Text>{this.props.variationIndex+1} of {this.props.numVariations}</Text>
          <Nav>
            <TouchableOpacity onPress={()=>this.props.newVariation()} >
              <NavText>Next</NavText>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.showAll} >
              <NavText>Show All</NavText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.newVariation(true)} >
              <NavText>Prev</NavText>
            </TouchableOpacity>
          </Nav>
          <Modal
            isVisible={this.state.showTuningModal}
            supportedOrientations={['portrait', 'landscape']}
          >
            <Tuning
              initialTuning={this.props.tuning}
              onSave={ tuning => {
                this.setState({showTuningModal: false})
                console.log('tuning onsave', tuning)
                this.props.changeFretboard({tuning})}
              } />
          </Modal>
          <Picker
            selectedValue={(tunings[tStrings.indexOf(this.props.tuning.join(''))] || {}).name || 'custom'}
            onValueChange={(val, index) => val!=='Custom'
              ? this.props.changeFretboard({tuning: tunings[index].value})
              : this.setState({showTuningModal: true})
            }
          >
            {tunings.map((tng, i) =>
              <Picker.Item key={i} label={tng.name} value={tng.name} />
            )}

          </Picker>
        </Wrapper>
      </Container>
    )
  }
}
