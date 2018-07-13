import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
// import { SegmentedControlIOS } from 'react-native/Libraries/Components/SegmentedControlIOS'
import {accFormat} from '../utils/format'
import {SelectionOption} from '../styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`

export default class RadioSelect extends Component {
  isActivated = (option) => {
    const {selectedOption, scale, tonic} = this.props
    if (scale && !tonic) return option.includes(selectedOption.split(' ')[0])
    else return option == selectedOption
  }
  setSelectedOption = (newSelectedOption) => {
    const {preventUnselect, selectedOption, onValueChange} = this.props
    const unselect = !preventUnselect && selectedOption===newSelectedOption
    onValueChange(unselect ? '' : newSelectedOption)
  }
  renderOption = (option, selected, onSelect, index) => (
    <SelectionOption
      onPress={()=>this.setSelectedOption(option)}
      key={index}
      title={accFormat(option)}
      activated={this.isActivated(option)}
      height={this.props.height}
      scale={this.props.scale}
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
