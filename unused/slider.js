import React, {Component} from 'react'
import { StyleSheet, Text, View, Select } from 'react-native'
import styled from "styled-components/native"
import { Note, Chord } from 'tonal'
import Picker from 'react-native-picker';


const Container = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const SelectNote = styled.View`
  flex: 1;
  align-items: stretch;
  justify-content: center;
`

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export default class Options extends Component {
  constructor() {
    state = {
      noteVal: 0
    }
    Picker.init({
        pickerData: notes,
        selectedValue: ['C'],
        onPickerConfirm: data => {
            console.log(data);
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    Picker.show()
  }

  setNote = (noteVal) => {
    console.log('wihcbwuiyebfiuqywbefiu', noteVal);
    debugger
    console.log({noteVal})
    this.setState({ noteVal })
  }

  render() {
    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }


    return (
      <Container>
        {/* <SelectNote>
          <Slider
            value={this.state.noteVal}
            minimumValue={0}
            maximumValue={11}
            step={1}
            onValueChange={val=>this.setNote(val)} />
          <Text>Value: {notes[this.state.noteVal]}</Text>
        </SelectNote> */}
      </Container>
    )
  }
}
