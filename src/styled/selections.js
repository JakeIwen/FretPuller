import styled from "styled-components/native"
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
  font-size: ${props => props.size || 24};
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`
export const MockFret = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || 'transparent'};
  border: 1px solid black;
  border-radius: 5px;
  margin: 2px;
  height: 20px;
  width: 50px;
`
