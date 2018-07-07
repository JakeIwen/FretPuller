import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
// import { SegmentedControlIOS } from 'react-native/Libraries/Components/SegmentedControlIOS'
import {accFormat} from '../../src/utils/format'
import { ScaleSelectionOption} from '../../src/styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`


export default class RadioSelect extends Component {

  setSelectedOption = (newSelectedOption) => {
    const {preventUnselect, selectedOption, onValueChange} = this.props
    const unselect = !preventUnselect && selectedOption===newSelectedOption
    onValueChange(unselect ? '' : newSelectedOption)
  }

  renderOption = (option, selected, onSelect, index) => (
    <ScaleSelectionOption
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
