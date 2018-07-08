import React from 'react'
import styled from "styled-components/native"
import {TouchableOpacity, Text,} from 'react-native'
import {Row, Col} from '../../src/styled'
import { Button } from 'react-native-elements'

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
export const OptionSection = styled(Row)`
  border: 1px solid black;
`
export const ChangeTuning = styled(Button)`
  align-self: flex-end;
`
export const SelectionButton = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  border: ${props => props.activated ? '2px solid red' : '0'}
  ${'' /* padding: 0 10px; */}

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
  border-radius: 5px;
  margin: 1px;
  height: ${props => (props.height ? props.height-2 : 20 ) + 'px'};
  width: 45px;
`

export const ScaleSelectionOption = styled(SelectionOption)`
  height: ${props => (props.height-2 || 23)}px;
  width: 70px;
`

export const FpButton = styled(fpButton)`
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 1px;
  height: ${props => props.height || '40px'};
  width: ${props => props.width || '80px'};
`
export const Txt = styled.Text`
  font-size: 24;
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`
