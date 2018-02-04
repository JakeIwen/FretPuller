import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
import { TouchableHighlight, Text, View } from 'react-native'
import { Row } from 'src/styled'
import {accFormat} from 'src/utils/format'
import { SelectionOption, Txt } from 'src/styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`

export default class RadioSelect extends Component {

  setSelectedOption = (newSelectedOption) => {
    let {preventUnselect, selectedOption, onValueChange} = this.props
    let unselect = !preventUnselect && selectedOption===newSelectedOption
    onValueChange(unselect ? '' : newSelectedOption)
  }

  renderOption = (option, selected, onSelect, index) => (
    // <SelectionOption onPress={()=>this.setSelectedOption(option)} key={index}>
    //   <Txt selected={selected}>
    //     {accFormat(option)}
    //   </Txt>
    // </SelectionOption>
    <SelectionOption
      onPress={()=>this.setSelectedOption(option)}
      key={index}
      title={accFormat(option)} />
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
