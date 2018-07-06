import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
import { TouchableHighlight, Text, View } from 'react-native'
// import { SegmentedControlIOS } from 'react-native/Libraries/Components/SegmentedControlIOS.ios'
import { Row } from '../styled'
import {accFormat} from '../utils/format'
import { SelectionOption, Txt } from '../styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
`

export default class RadioSelect extends Component {

  setSelectedOption = (newSelectedOption) => {
    let {preventUnselect, selectedOption, onValueChange} = this.props
    let unselect = !preventUnselect && selectedOption===newSelectedOption
    onValueChange(unselect ? '' : newSelectedOption)
  }

  renderOption = (option, selected, onSelect, index) => (
    <SelectionOption
      onPress={()=>this.setSelectedOption(option)}
      key={index}
      title={accFormat(option)}
      activated={option == this.props.selectedOption}
    />
  )

  renderContainer = (optionNodes) =>
    <RenderContainer row={this.props.row}>{optionNodes}</RenderContainer>

  render() {
    return (
      <RadioButtons
        options={ this.props.options }
        selectedOption={ this.props.selectedOption }
        renderOption={ this.renderOption }
        renderContainer={ this.renderContainer }
      />
    )
  }
}
