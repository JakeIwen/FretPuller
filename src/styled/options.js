import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableHighlight, Text, View} from 'react-native'
import {Row, Col} from '/src/styled'

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 65%;
  ${'' /* flex-grow: 1; */}
  border: 2px solid green;
  background-color: #FDF3E7;
`
export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const NavText = styled.Text`
  font-size: 32;
`
export const Nav = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
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
