import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
import { TouchableHighlight, Text, View } from 'react-native'
import { Row } from '/src/styled'
import {accFormat} from '/src/utils/format'
import { SelectionButton, Txt } from '/src/styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`

export default class RadioSelect extends Component {

  setSelectedOption = (selectedOption) => {
    let unselect = selectedOption===this.props.selectedOption
    this.props.onValueChange(unselect ? '' : selectedOption)
  }

  renderOption = (option, selected, onSelect, index) => (
    <SelectionButton onPress={()=>this.setSelectedOption(option)} key={index}>
      <Txt selected={selected}>
        {accFormat(option)}
      </Txt>
    </SelectionButton>
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
