import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
import { TouchableHighlight, Text, View } from 'react-native'
import Row from 'react-native-row'

const RadioBtn = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  ${'' /* padding: 0 10px; */}
`
const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  flex: 1;
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

  renderOption = (option, selected, onSelect, index) => (
    <RadioBtn onPress={()=>this.setSelectedOption(option)} key={index}>
      <Txt selected={selected}>
        {option.replace('b','\u266D').replace('#', '\u266F')}
      </Txt>
    </RadioBtn>
  )

  renderContainer = (optionNodes) =>
    <RenderContainer row={this.props.row}>{optionNodes}</RenderContainer>

  render() {
    return (
      <RadioButtons
        options={ this.props.options }
        // onSelection={ this.setSelectedOption }
        selectedOption={ this.props.selectedOption }
        renderOption={ this.renderOption }
        renderContainer={ this.renderContainer }
      />
    )
  }
}
