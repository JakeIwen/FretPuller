import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text, Button} from 'react-native'
import { Picker } from 'react-native-wheel-datepicker'
import { Row } from 'src/styled'
import {range} from 'lodash'

const allNotes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "B"]

let res = []
range(2, 6).map(num=>{
  allNotes.forEach(note=>res.push(note+num))
  return res
})
const pickerData = res

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #708090;
`
const TPicker = styled(Picker)`
  flex: 1;
`
const AddRemove = styled(Row)`
  margin: 5px;
`

const Label = styled.Text`
  font-size: 16;
  font-family: Menlo;
`

export default class Tuning extends Component {
  state = {
    tuning: this.props.initialTuning,
  }

  update = (val, picker) => {
    let tuning = this.state.tuning
    tuning[picker] = val + '2'
    this.setState({ tuning })
  }

  render() {
    // this.props.active && this.popupDialog.show()
    let {tuning} = this.state

    console.log('tuning component', {tuning});
    return (
        <Wrapper>
          <Row dial={5}>
            {tuning.map( (note, picker) =>
              <TPicker
                key={picker}
                selectedValue={note.slice(0,-1)}
                pickerData={allNotes}
                onValueChange={(val) => this.update(val, picker)}
              />
            )}
          </Row>
          <AddRemove flex dial={5} spaceBetween>
            <TouchableOpacity
              onPress={()=>this.setState({tuning: tuning.slice(0, tuning.length-1)})}>
              <Label>Remove</Label>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>
                this.props.onSave(this.state.tuning)}>
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
