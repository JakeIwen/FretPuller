


import React, {Component} from 'react'
import styled from "styled-components/native"
import {TouchableHighlight, Text, View} from 'react-native'

const MultiBtn = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  align-self:stretch;
  justify-content:space-around;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''} */}
`

const MultiItem = styled.View`
  display: flex;
  align-items: center;
  align-self:stretch;
  justify-content:space-around;
  ${'' /* border: ${props => props.selected ? '1px solid gray' : ''}; */}
`
const Wrapper = styled.View`
  display: flex;
  flex-direction:column;
  height: 100%;
  flex: ${props => props.flex || 1};
  border: 1px solid blue;
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
    this.props.onValueChange(newSelected)
  }

  renderOption = (option, index) => {
    let selected = this.props.selectedOptions.includes(option)
    return (
      <MultiBtn onPress={()=>this.setSelectedOption(option)} key={index}>
        <MultiItem>
          <Txt selected={selected}>{option.replace(/m$/, 'min').replace(/M$/, 'Maj')}</Txt>
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
