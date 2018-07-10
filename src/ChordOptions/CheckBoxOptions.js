import React from 'react'
import { FpCheckBox } from '../styled'
import { View } from 'react-native'
import { range } from 'lodash/fp'

export const CheckBoxOptions = (props) => {
  console.log({props});
  return (
  <View>
    <FpCheckBox
      label='Allow Open Strings'
      onChange={() => props.updateFilter({incZeroFret: !props.incZeroFret})}
      checked={props.incZeroFret}
    />
    {/* <FpCheckBox
      label='Select Octaves'
      onChange={val => props.updateFilter({incOctaves: !val})}
      checked={props.incOctaves}
    /> */}
    {/* <FpCheckBox
      label='Show All Included Frets'
      onChange={() => props.updateFilter({keepAllFrets: !props.keepAllFrets})}
      checked={props.keepAllFrets}
    /> */}
    <FpCheckBox
      label='Require All Strings'
      onChange={() => props.updateFilter({
        allStrings: !props.allStrings,
        activeStrings: range(0,props.tuning.length).map(()=>true),
        // noGaps: !val ? true : undefined
      })}
      checked={props.allStrings}
    />
    <FpCheckBox
      label='No Inner Muted Strings'
      onChange={() => props.updateFilter({noGaps: !props.noGaps,})}
      checked={props.noGaps}
    />
    <FpCheckBox
      label='Show Note Names'
      onChange={() => props.changeFretboard({showNames: !props.showNames})}
      checked={props.showNames}
    />
  </View>
)}
