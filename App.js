import React, {Component} from 'react'
import {initChord} from './src/utils/chordShapes'
import { range, reverse } from 'lodash/fp'
import FretPuller from '/src/FretPuller'

let tuning = reverse(['E2', 'A2', 'D3', 'G3'])
let width = 13
let defaultSettings = {
  incOctaves: true,
  incZeroFret: true,
  keepAllFrets: true,
  activeStrings: range(0,tuning.length).map(s=>true),
  noGaps: true,
  allStrings: true,
  maxFretSpan: 7,
  fretRange: [0, 7],
  tuning,
  width
}

export default class App extends Component {

  constructor(props) {
    super()
    this.fretPullerProps = {
      ...initChord(defaultSettings.tuning, defaultSettings.width, 'C'),
      defaultSettings
    }
  }
  render() {
    return <FretPuller  {...this.fretPullerProps}/>
  }
}
