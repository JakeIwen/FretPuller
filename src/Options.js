import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from 'tonal'
import { Picker } from 'react-native-wheel-datepicker'

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 5px solid green;
  align-items: flex-end;
`

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 25%;
`

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const names1 = ['M', 'm', '7', '9', '11', 'add2', 'add4', 'add9', 'sus2', 'sus4']
// let names1 = new Set(Chord.names().map(name => name.slice(0,1)))
// let names2 = new Set(Chord.names().map(name => name.slice(1,name.length)))
// console.log({names1});
export default class Options extends Component {

  state = {
    note: 'C',
    name1: '7',
    name2: '',
    notes,
    names: Chord.names(),
    names1,
    // names2: []
  }

  setChord = ({note, name1, name2}) => {
    note = note || this.state.note
    name1 = name1 || this.state.name1
    name2 = name2 || this.state.name2
    this.setState({ note, name1, name2 })
    this.props.changeChord(note + name1 + name2)
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
            selectedValue={this.state.name1}
            pickerData={this.state.names1}
            onValueChange={name1 =>
              this.setChord({name1})}
          />
          {/* <Picker
            style={{flex:1}}
            selectedValue={this.state.name2}
            pickerData={this.state.names2}
            onValueChange={name2 =>
              this.setChord({name2})}
          /> */}
      </Wrapper>
      </Container>
    )
  }
}

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
