import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text, Button} from 'react-native'
import { Picker } from 'react-native-wheel-datepicker'
import Row from 'react-native-row'
import {range} from 'lodash'

const allNotes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "B"]

let res = []
range(2, 6).map(num=>{
  allNotes.forEach(note=>res.push(note+num))
  return res
})
const pickerData = res
console.log({pickerData});
const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 5px;
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
    tuning: tuningStgToAry(this.props.tuning),
  }

  update = (val, i) => {
    let tuning = this.state.tuning
    tuning[i] = val
    this.setState({ tuning })
  }

  render() {
    // this.props.active && this.popupDialog.show()
    let {tuning} = this.state

    console.log('tuning component', {tuning});
    return (
        <Wrapper>
          <Row dial={5}>
            {tuning.map( (note, i) =>
              <Picker
                key={i}
                style={{ flex: 1 }}
                selectedValue={note}
                pickerData={pickerData}
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
              onPress={()=>
                this.props.onSave({tuning: tuningAryToStg(this.state.tuning)})}>
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
