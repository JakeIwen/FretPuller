import React, {Component} from 'react'
import { range, reverse } from 'lodash/fp'
import {initChord} from './src/utils/chordShapes'
import {tuningsNested} from '/src/lib/tunings.js'
import FretPuller from '/src/FretPuller'

let tuning = tuningsNested['Mandolin']['Standard']
let defaultSettings = {
  tuning,
  incOctaves: true,
  incZeroFret: true,
  keepAllFrets: true,
  activeStrings: range(0, tuning.length).map(s=>true),
  noGaps: true,
  allStrings: true,
  maxFretSpan: 7,
  fretRange: [0, 7],
  width: 13
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
