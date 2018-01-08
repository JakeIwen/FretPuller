import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text, Button} from 'react-native'
import { Picker } from 'react-native-wheel-datepicker'
import Row from 'react-native-row'

const allNotes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "B"]

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 5px;
`
const Pop = styled.View`
  display: ${props => props.show ? 'flex' : 'none'};
  flex: 1;
  ${'' /* height:60%; */}
  top: 10;
  bottom: 10;
  left: 10;
  right: 10;
`
const AddRemove = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  flex: 1;
  margin: 5px;
`

const Label = styled.Text`
  font-size: 14;
  font-family: Menlo;
`


export default class Tuning extends Component {
  state = {
    tuning: this.props.tuning,
  }

  update = (val, i) => {
    let tuning = this.state.tuning
    tuning[i] = val
    this.setState({ tuning })
  }
  render() {
    // this.props.active && this.popupDialog.show()
    // console.log({tuning});
    let {tuning} = this.state
    return (
        <Wrapper>
          <Row dial={5}>
            {tuning.map( (note, i) =>
              <Picker
                key={i}
                style={{ flex: 1 }}
                selectedValue={note}
                pickerData={allNotes}
                onValueChange={val => this.update(val, i)}
              />
            )}
          </Row>
          <AddRemove>
            <TouchableOpacity
              onPress={()=>this.setState({tuning: tuning.slice(0, tuning.length-1)})}>
              <Label>Remove</Label>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.props.onSave({tuning})}>
              <Label>Save</Label>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.setState({tuning: tuning.concat("E")})}>
              <Label>Add</Label>
            </TouchableOpacity>
          </AddRemove>
        </Wrapper>

    )
  }
}
