import React from 'react'
import styled from "styled-components/native"
import RNRow from 'react-native-row'
import { Text } from 'react-native'
import CheckBox from 'react-native-checkbox'

export const Row = RNRow

export const Col = styled(Row)`
  flex-direction: column;
`
export const Br = () => <Text>{`\n`}</Text>

export const SettingsWrapper = styled(Row)`
  align-self: flex-end;
  margin-top: auto;
`

export const Txt = styled.Text`
  font-size: ${props => props.size || 24};
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`

export const FpCheckBox = ({label, checked, disabled, onChange}) =>
  <CheckBox
    label={label}
    checkboxStyle={{opacity: disabled ? 0.5 : 1}}
    labelStyle={{color: disabled ? 'lightgrey' : 'black'}}
    onChange={() => !disabled && onChange()}
    checked={checked}
  />
