import React, { Component } from 'react'
import styled from "styled-components/native"
import { Row } from '/src/styled'
import { View } from 'react-native'
import { range } from 'lodash/fp'
import { SelectionOption, Txt } from '/src/styled/options'
import CheckBox from 'react-native-checkbox'

const RenderContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-around;
  ${'' /* flex: 1; */}
`

export const CheckBoxOptions = (props) => {
  console.log({props});
  return (
  <View>
    <CheckBox
      label='Allow Open Strings'
      onChange={() =>
        props.changeSettings({incZeroFret: !props.incZeroFret})
      }
      checked={props.incZeroFret}
    />
    {/* <CheckBox
      label='Select Octaves'
      onChange={val => props.changeSettings({incOctaves: !val})}
      checked={props.incOctaves}
    /> */}
    <CheckBox
      label='Show All Included Frets'
      onChange={() => props.changeSettings({keepAllFrets: !props.keepAllFrets})}
      checked={props.keepAllFrets}
    />
    <CheckBox
      label='Require All Strings'
      onChange={() => props.changeSettings({
        allStrings: !props.allStrings,
        activeStrings: range(0,props.tuning.length).map(s=>true),
        // noGaps: !val ? true : undefined
      })}
      checked={props.allStrings}
    />
    <CheckBox
      label='No Inner Muted Strings'
      onChange={() => props.changeSettings({
        noGaps: !props.noGaps,
      })}
      checked={props.noGaps}
    />
  </View>
)}
