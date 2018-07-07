import React, {Component} from 'react'
import { range } from 'lodash/fp'
import {tuningsNested} from './src/lib/tunings.js'
import FretPuller from './src/FretPuller'

const tuning = tuningsNested['Mandolin']['Standard']
const defaultSettings = {
  tuning,
  incOctaves: true,
  incZeroFret: true,
  keepAllFrets: true,
  activeStrings: range(0, tuning.length).map(()=>true),
  noGaps: true,
  allStrings: true,
  allowZeroes: true,
  maxFretSpan: 7,
  fretRange: [0, 7],
  width: 13,
  tonic: 'C',
  chord: '',
  scale: 'minor',
  appMode: 'chord'
}

export default class App extends Component {

  constructor() {
    super()
  }
  render() {
    console.log('fpp', this.fretPullerProps);
    return <FretPuller  {...defaultSettings}/>
  }
}
