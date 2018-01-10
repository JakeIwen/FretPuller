import React from 'react'
import styled from "styled-components/native"
import {TouchableOpacity} from 'react-native'

const Activate = styled.View`
  margin: 5px;
  border: 2px solid black;
  border-radius: 5px;
`
const Title = styled.Text`
  font-size: 16;
  font-family: Menlo;
`

export const TuningActivate = ({tuning, activate}) => (
  <Activate>
    <TouchableOpacity onPress={activate} >
      <Title>Change Tuning</Title>
    </TouchableOpacity>
  </Activate>
)
