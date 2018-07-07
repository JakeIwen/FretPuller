import React from 'react'
import styled from "styled-components/native"
import RNRow from 'react-native-row'
import { Text } from 'react-native'

export const Row = RNRow

export const Col = styled(Row)`
  flex-direction: column;
`
export const Br = () => <Text>{`\n`}</Text>

export const SettingsWrapper = styled(Row)`
  align-self: flex-end;
  margin-top: auto;
`
 
