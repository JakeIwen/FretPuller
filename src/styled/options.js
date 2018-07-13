import React from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text,} from 'react-native'
import {Col} from '../styled'

export const Container = styled(Col)`
  width: 100%;
  height: ${props => props.height};
  border: 2px solid green;
  background-color: #FDF3E7;
`
export const RightOptions = styled.View`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
`
export const NavText = styled.Text`
  font-size: 32;
`
export const SelectionButton = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  border: ${props => props.activated ? '2px solid red' : '0'}
`
const OptionText = styled.Text`
  font-size: ${props => (props.len > 5) ? 10 : 12};
`

const sButton = (props) =>
  <TouchableOpacity {...props} >
    <OptionText len={props.title.length}>{props.title}</OptionText>
  </TouchableOpacity>

const fpButton = (props) =>
  <TouchableOpacity {...props} >
    <Text>{props.title}</Text>
  </TouchableOpacity>

export const SelectionOption = styled(sButton)`
  border: ${props => props.activated ? '2px solid red' : '2px solid black'};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-radius: 5px;
  height: ${props => props.height-1 || (props.scale ? 23 : 20) }px;
  margin: 0.5px;
  width: ${props => props.scale ? 70 : 45}px;
  max-height: 40px;
`

export const FpButton = styled(fpButton)`
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 1px;
  height: ${props => props.height ? props.height + 'px' :  '40px'};
  width: ${props => props.width ? props.width + 'px' :  '80px'};
`
