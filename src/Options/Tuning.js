import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text, Button} from 'react-native'
import { SelectionButton, ResetButton, Txt } from '../../src/styled/selections'
import { Picker } from 'react-native-wheel-datepicker'
import { Row, Col } from '../../src/styled'
import {range} from 'lodash'
import {tuningsNested} from '../../src/lib/tunings.js'

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

const instruments = Object.keys(tuningsNested)

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
        <Row flex spaceAround dial={2}>
          {instruments.map(inst => {
            const names = Object.keys(tuningsNested[inst])
            return <Col key={inst}>
              <Txt>{inst}</Txt>
              {names.map(name =>{
                if (inst=='Mandolin' && name=='Standard') {
                  console.log(this.state.tuning.join(''), tuningsNested[inst][name].join(''))
                }
                return <SelectionButton key={name}
                  activated={
                    this.state.tuning.join('')==tuningsNested[inst][name].join('')}
                  onPress={()=>this.props.onSave(tuningsNested[inst][name])}
                ><Label>{name}</Label></SelectionButton>})}
              </Col>
          })
          }
        </Row>
      </Wrapper>

    )
  }
}
