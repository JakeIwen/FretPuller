


import React, {Component} from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
import {TouchableHighlight, Text, View} from 'react-native'

const RadioBtn = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  align-self:stretch;
  justify-content:space-around;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''} */}
`

const RadioItem = styled.View`
  display: flex;
  align-items: center;
  align-self:stretch;
  justify-content:space-around;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''}; */}
`
const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  border: 1px solid blue;
  ${'' /* align-items: center;
  justify-content:space-around;
  border: ${props => props.selected ? '1px solid gray' : ''} */}
`

const Txt = styled.Text`
  font-size: 24;
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`

export default class RadioSelect extends Component {

  setSelectedOption = (selectedOption) => {
    let unselect = selectedOption===this.props.selectedOption
    this.props.onValueChange(unselect ? '' : selectedOption)

  }

  renderOption = (option, selected, onSelect, index) => {
    return (
      <RadioBtn onPress={()=>this.setSelectedOption(option)} key={index}>
        <RadioItem><Txt selected={selected}>{option}</Txt></RadioItem>
      </RadioBtn>
    );
  }

  renderContainer = (optionNodes) => {
    return <View>{optionNodes}</View>;
  }

  render() {

    return (
      <Wrapper>
        <RadioButtons
          options={ this.props.options }
          onSelection={ this.setSelectedOption }
          selectedOption={ this.props.selectedOption }
          renderOption={ this.renderOption }
          renderContainer={ this.props.row
            ? RadioButtons.renderHorizontalContainer
            : RadioButtons.renderVerticalContainer
          }
        />
      </Wrapper>);
  }
}
