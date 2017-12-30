import React, {Component} from 'react'
import { StyleSheet, Text, View, Select } from 'react-native'
import styled from "styled-components/native"
import { Note, Chord } from 'tonal'
import { Picker } from 'react-native-wheel-datepicker';


const Container = styled.View`
  display: flex;
  flex-direction:row;
  width: 100%;
  height: 50%;
  border: 5px solid green;
  align-items: flex-end;
`

const Wrapper = styled.View`
  display: flex;
  flex-direction:row;
  width: 25%;
`

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
// const names = Chord.names()
// const rotate = (array, val) => {
//   let result = [...array].reverse
//   console.log("before:", result);
//   let i = 0
//   while(result.indexOf(val)!==5 && i<100) {
//     result.unshift(result.pop())
//     i++
//   }
//   console.log("after:", result);
//
//   return result
// }
export default class Options extends Component {

  state = {
    note: 'C',
    name: '7',
    notes,
    names: Chord.names()
  }

  setChord = ({note, name}) => {
    note = note || this.state.note
    name = name || this.state.name
    this.setState({ note, name })
    this.props.changeChord(note + name)
    // console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Wrapper>
        <Picker
          style={{flex:1}}
          selectedValue={this.state.note}
          pickerData={this.state.notes}
          onValueChange={note =>
            this.setChord({note})}
        />
        <Picker
          style={{flex:1}}
          selectedValue={this.state.name}
          pickerData={this.state.names}
          onValueChange={name =>
            this.setChord({name})}
        />
      </Wrapper>
      </Container>
    )
  }
}
