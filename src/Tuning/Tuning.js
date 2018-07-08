import React, {Component} from 'react'
import styled from "styled-components/native"
import { Picker } from 'react-native-wheel-datepicker'
import {range} from 'lodash'
import { SelectionButton, ResetButton, Txt } from '../styled/selections'
import { Row, Col } from '../styled'
import {tuningsNested} from '../lib/tunings.js'

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

  render() {
    // this.props.active && this.popupDialog.show()
    let {tuning} = this.props
    console.log('tuning component', {tuning});

    return (
      <Wrapper>
        <Row flex spaceAround dial={2}>
          {instruments.map(inst => {
            const names = Object.keys(tuningsNested[inst])
            return <Col key={inst}>
              <Txt>{inst}</Txt>
              {names.map(name =>{
                return <SelectionButton key={name}
                  activated={
                    tuning.join('')==tuningsNested[inst][name].join('')}
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
