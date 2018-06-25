import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  updateFretMatrix,
  fretMatrixForPc,
  locationsForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from '/src/fretboard'
import Options from '/src/Options'
import {initChord} from '/src/utils/chordShapes'
import { isEmpty, cloneDeep, range, reverse } from 'lodash/fp'
import { Col } from '/src/styled'
import { Note, Chord, Interval } from 'tonal'
import {tokenize} from '/src/utils/tokenize'
import {fretTruth} from '/src/utils/frets'
import {fretFilter} from '/src/utils/fretFilter'
import {indexLoop} from '/src/utils/indexLoop'
import {ivlColors, tonicColors} from '/src/theme/colors'

export default class FretPuller extends Component {
  constructor(props) {
    super(props)
    let { chord,
          fretMatrix,
          chordShapes,
          variationIndex,
          viewMode,
          selectionMatrix,
          fullSelectionMatrix,
          allShapes,
          defaultSettings } = this.props
    this.state = {
      ...defaultSettings,
      fbHeight: 0,
      fretMatrix,
      allShapes,
      variationIndex,
      chordShapes,
      viewMode,
      selectionMatrix,
      fullSelectionMatrix,
    }
    console.log('constructor default state', this.state);
    console.log('constructor default props', this.props);
  }

  componentDidMount() {
    this.changeSettings({})
  }

  onFretClick = (fret) => {
    // this.selectPitch(midi)
    console.log(fret)
    this.showThisNote(fret)
  }

  showThisNote = (clickedFret) => {
    let {incOctaves, viewMode, selectionMatrix} = this.state
    this.setState({
      viewMode: 'select',
      selectionMatrix: this.state.fretMatrix.map( (stg, i) =>
        stg.map( (fret,j) =>
          fretTruth(fret, clickedFret, incOctaves, viewMode, selectionMatrix[i][j])
        )
      )
    })
  }

  changeSettings = (args) => {
    console.log('new settign args', args);
    fretFilter({
      state: {...this.state, ...args},
      callback: (newState) => this.getCombo(newState)
    })
  }

  fretMatch = (fret1, fret2) =>
    fret1.loc.crd===fret2.loc.crd && fret1.loc.pos===fret2.loc.pos

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForNote(this.state.tuning, width, pitch)
    })
  }

  getCombo = ({reverse, reset, ...newState}) => {
    let chordShapes = newState ? newState.chordShapes : this.state.chordShapes
    let increment = reverse ? -1 : 1
    reset = reset || !!newState
    let index = reset ? 0 : this.state.variationIndex + increment
    index = indexLoop(index, chordShapes)
    let thisShape = chordShapes[index]
    let newSelect = this.state.fretMatrix.map((stg, i) =>
      stg.map( (fret,j) =>
        (thisShape || []).some( chord => chord.loc.crd===i && chord.loc.pos===j)
      )
    )
    this.setState(Object.assign(newState || {}, {
      selectionMatrix: newSelect,
      variationIndex: index
    }))
  }

  stateWithNewChord = ({tuning, width, chord}) => Object.assign(this.state, initChord({
      tuning: tuning || this.state.tuning,
      width: width || this.state.width,
      chord: chord || this.state.chord
    }))

  changeFretboard = ({tuning, width, chord}) => {
    fretFilter({
      state: this.stateWithNewChord({tuning, width, chord}),
      callback: (newState) => this.getCombo(newState)
    })
    console.log('CFB STATE', this.state);
  }

  showAll = () => {
    let {tuning, width, chord} = this.state
    this.setState({ fretMatrix: fretMatrixForChord(tuning, width, chord) })
  }

  render() {
    let colorArr = tonicColors(tokenize(this.state.chord)[0])
    return (
      <Col flex>
        <Fretboard
          isClickable
          defaultMatrix={this.state.keepAllFrets && this.state.fullSelectionMatrix}
          colorArr={colorArr}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
          fretFilter={this.changeSettings}
          setFretboardDims={dims => {this.setState(dims)}}
          {...this.state}
        />
        {!!this.state.fbHeight &&
          <Options
            {...this.state}
            setChord={chord => {
              let state = this.stateWithNewChord({chord})
              fretFilter({state, callback: this.getCombo})
            }}
            newVariation={(reverse)=>this.getCombo({reverse})}
            changeFretboard={this.changeFretboard}
            editTuning={this.editTuning}
            showAll={this.showAll}
            colorArr={colorArr}
            changeSettings={this.changeSettings}
            keepAllFrets={this.state.keepAllFrets}

        />}

      </Col>
    )
  }
}
