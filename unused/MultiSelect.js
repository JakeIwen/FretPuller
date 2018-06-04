import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableHighlight, Text, View} from 'react-native'
import {accFormat} from '/src/utils/format'

const MultiBtn = styled.TouchableHighlight`
  display: flex;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''} */}
`

const MultiItem = styled.View`
  display: flex;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''}; */}
`
const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex || 1};
`

const Txt = styled.Text`
  font-size: 22;
  font-weight: ${props => props.selected ? 'bold' : 'normal' };
`

export default class MultiSelect extends Component {

  setSelectedOption = (selectedOption) => {
    let unselect = this.props.selectedOptions.includes(selectedOption)
    let newSelected = unselect
      ? this.props.selectedOptions.filter(option => option!==selectedOption)
      : this.props.selectedOptions.concat(selectedOption)
      // console.log(this.props.selectedOptions, {newSelected})
    this.props.onValueChange(newSelected)
  }

  renderOption = (option, index) => {
    let selected = this.props.selectedOptions.includes(option)
    // console.log('soptions', this.props.selectedOption);
    // console.log('option', option);
    // console.log('isSelected', selected);
    return (
      <MultiBtn onPress={()=>this.setSelectedOption(option)} key={index}>
        <MultiItem>
          <Txt selected={selected}>
            {accFormat(option)}
          </Txt>
        </MultiItem>
      </MultiBtn>
    );
  }

  render() {
    return (
      <Wrapper flex={this.props.flex}>
        {this.props.options.map((option, i) => this.renderOption(option, i))}
      </Wrapper>)
  }
}
