import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableHighlight, TouchableOpacity, Text, View} from 'react-native'
import {Row, Col} from 'src/styled'
import { Button } from 'react-native-elements'

export const ResetButton = styled(Button)`
  padding: 10px;
`

export const SelectionButton = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  border: ${props => props.activated ? '2px solid red' : '0'}
`

export const Txt = styled.Text`
  font-size: 24;
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`
