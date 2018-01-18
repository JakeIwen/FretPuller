import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableHighlight, TouchableOpacity, Text, View} from 'react-native'
import {Row, Col} from '/src/styled'
import { Button } from 'react-native-elements'

export const Container = styled(Col)`
  width: 100%;
  ${'' /* height: 65%; */}
  height: ${props => console.log('propsheight', props.height) && props.height};
  border: 2px solid green;
  background-color: #FDF3E7;
`
export const RightOptions = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
`
export const NavText = styled.Text`
  font-size: 32;
`
export const OptionSection = styled(Row)`
  border: 1px solid black;
`
export const OptionSectionCol = styled(Col)`
  border: 1px solid black;
`
export const ChangeTuning = styled(Button)`
  align-self: flex-end;
`

// const LeftArr = () =>
//   <TouchableOpacity
//     onPress={ ()=>this.props.fretFilter({maxFretSpan: this.props.maxFretSpan-1})}>
//     <NavText>&larr;</NavText>
//   </TouchableOpacity>

// export const SelectChordFlex = styled(SelectChord)`
//   width: 25%;
// `


export const SelectionButton = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  border: ${props => props.activated ? '2px solid red' : '0'}
  ${'' /* padding: 0 10px; */}

`
export const Txt = styled.Text`
  font-size: 24;
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`
