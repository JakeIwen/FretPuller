import React, {Component} from 'react'
import styled from "styled-components/native"
import {range} from 'lodash'
import { SelectionButton } from '../styled/selections'
import { Row, Col, Txt } from '../styled'
import {tuningsNested} from '../lib/tunings.js'

const allNotes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "B"]

const res = []
range(2, 6).map(num=>{
  allNotes.forEach(note=>res.push(note+num))
  return res
})

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #708090;
`


const Label = styled.Text`
  font-size: 16;
  font-family: Menlo;
`

const instruments = Object.keys(tuningsNested)

export default class Tuning extends Component {

  render() {
    // this.props.active && this.popupDialog.show()
    const {tuning} = this.props

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
