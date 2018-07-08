import React, { Component } from 'react'
import styled from "styled-components/native"
import { RadioButtons } from 'react-native-radio-buttons'
// import { SegmentedControlIOS } from 'react-native/Libraries/Components/SegmentedControlIOS'
import {accFormat} from '../../src/utils/format'
import { ScaleSelectionOption, SelectionOption} from '../../src/styled/options'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`

const SOption = (props) => props.scale ? <ScaleSelectionOption {...props}/> : <SelectionOption {...props}/>

export default class RadioSelect extends Component {

  setSelectedOption = (newSelectedOption) => {
    const {preventUnselect, selectedOption, onValueChange} = this.props
    const unselect = !preventUnselect && selectedOption===newSelectedOption
    onValueChange(unselect ? '' : newSelectedOption)
  }
  renderOption = (option, selected, onSelect, index) => (
    <SOption
      onPress={()=>this.setSelectedOption(option)}
      key={index}
      title={accFormat(option)}
      activated={option == this.props.selectedOption}
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
