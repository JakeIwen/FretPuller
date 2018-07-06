import React, {Component} from 'react'
import styled from "styled-components/native"
import {Fretboard,
  updateFretMatrix,
  fretMatrixForPc,
  locationsForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './fretboard'
import Options from './Options'
import {initChord} from './utils/chordShapes'
import { isEmpty, cloneDeep, range, reverse } from 'lodash/fp'
import { Col } from './styled'
import { Note, Chord, Interval } from 'tonal'
import {tokenize} from './utils/tokenize'
import {fretTruth} from './utils/frets'
import {fretFilter} from './utils/fretFilter'
import {indexLoop} from './utils/indexLoop'
import {ivlColors, tonicColors} from './theme/colors'

export default class FretPuller extends Component {
  constructor(props) {
    super(props)
    let { fretMatrix,
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
      appMode: 'chord'
    }
  }

  componentDidMount() {

    this.appMode == 'chord' && this.changeSettings({})
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

  getCombo = ({reset, ...newState}) => {
    let state = Object.assign(this.state, newState)
    reset = reset || !!newState
    let index = indexLoop(state.variationIndex, state.chordShapes)
    let thisShape = state.chordShapes[index]
    let newSelect = state.fretMatrix.map((stg, i) =>
      stg.map( (fret,j) =>
        (thisShape || []).some( chord => chord.loc.crd===i && chord.loc.pos===j)
      )
    )
    this.setState(Object.assign(state, {
      selectionMatrix: newSelect,
      variationIndex: index
    }))
  }

  stateWithNewChord = ({tuning, width, chord, tonic, scale, appMode}) =>
    Object.assign(this.state, initChord({
      appMode: appMode || this.state.appMode,
      tuning: tuning || this.state.tuning,
      width: width || this.state.width,
      chord: chord || this.state.chord,
      tonic: tonic || this.state.tonic,
      scale: scale || this.state.scale,
    }))

  changeFretboard = ({tuning, width, chord, tonic}) => {
    fretFilter({
      state: this.stateWithNewChord({tuning, width, tonic, chord}),
      callback: (newState) => this.getCombo(newState)
    })
    console.log('CFB STATE', this.state);
  }

  showAll = () => {
    let {tuning, width, chord, tonic} = this.state
    this.setState({ fretMatrix: fretMatrixForChord(tuning, width, tonic+chord) })
  }

  setMode = (mode) => {
    console.log('setting mode', mode);
    switch (mode) {
      case 'chord':
        this.changeSettings({})
        this.setState({appMode: 'chord'})
        break;
      case 'scale':
        this.setState({appMode: 'scale'})

        break;
      default:

    }
  }

  render() {
    let colorArr = tonicColors(this.state.tonic)
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
            setChord={(tonic, chord, scale) => {
              let state = this.stateWithNewChord({tonic, chord, scale})
              fretFilter({state, callback: this.getCombo})
            }}
            newVariation={(reverse)=>this.getCombo({
              variationIndex: this.state.variationIndex + (reverse ? -1 : 1)}
            )}
            changeFretboard={this.changeFretboard}
            editTuning={this.editTuning}
            showAll={this.showAll}
            colorArr={colorArr}
            changeSettings={this.changeSettings}
            keepAllFrets={this.state.keepAllFrets}
            setMode={this.setMode}

        />}

      </Col>
    )
  }
}
