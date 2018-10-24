import React from 'react'
import { View } from 'react-native'
import { range } from 'lodash/fp'
import CheckBox from 'react-native-checkbox'

export const CheckBoxOptions = (props) => {
  // debugger;
  return (
  <View>
    <CheckBox
      label='Allow Open Strings'
      onChange={() => props.updateFilter({incZeroFret: !props.incZeroFret})}
      checked={props.incZeroFret}
    />
    {/* <CheckBox
      label='Select Octaves'
      onChange={val => props.updateFilter({incOctaves: !val})}
      checked={props.incOctaves}
    /> */}
    {/* <CheckBox
      label='Show All Included Frets'
      onChange={() => props.updateFilter({keepAllFrets: !props.keepAllFrets})}
      checked={props.keepAllFrets}
    /> */}
    <CheckBox
      label='Require All Strings'
      onChange={() => props.updateFilter({
        allStrings: !props.allStrings,
        activeStrings: range(0,props.tuning.length).map(()=>true),
        // noGaps: !val ? true : undefined
      })}
      checked={props.allStrings}
    />
    <CheckBox
      label='No Inner Muted Strings'
      onChange={() => props.updateFilter({noGaps: !props.noGaps,})}
      checked={props.noGaps}
    />
  </View>
)}
