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
import ScaleOptions from './ScaleOptions'
import Options from './ChordOptions'
import {initChord} from './utils/chordShapes'
import { isEmpty, cloneDeep, range, reverse } from 'lodash/fp'
import { Col, Row } from './styled'
import { Note, Chord, Interval } from 'tonal'
import {tokenize} from './utils/tokenize'
import {fretTruth} from './utils/frets'
import {fretFilter} from './utils/fretFilter'
import {indexLoop} from './utils/indexLoop'
import {ivlColors, tonicColors} from './theme/colors'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import {FpButton} from './styled/options'

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
      appMode: 'chord',
      showTuningModal: false
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

  stateWithNewChord = ({tuning, width, chord, tonic}) =>
    Object.assign(this.state, initChord({
      tuning: tuning || this.state.tuning,
      width: width || this.state.width,
      chord: chord || this.state.chord,
      tonic: tonic || this.state.tonic,
    }))

  stateWithNewScale = ({tuning, width, tonic, scale}) =>
    Object.assign(this.state, initChord({
      tuning: tuning || this.state.tuning,
      width: width || this.state.width,
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

  settingsButtons = () =>
    <Row>
      <FpButton
        title='CHANGE TUNING'
        onPress={()=>this.setState({showTuningModal: true})}/>
      <FpButton
        title={(this.state.appMode)=='scale' ? 'SCALE MODE' : 'CHORD MODE'}
        onPress={()=>this.setMode((this.state.appMode)=='scale' ? 'chord' : 'scale')}/>
    </Row>

  tuningModal = () =>
    <Modal
      isVisible={this.state.showTuningModal}
      supportedOrientations={['landscape']} >
      <Tuning
        initialTuning={this.state.tuning}
        onSave={ tuning => {
          this.setState({showTuningModal: false})
          this.changeFretboard({tuning})}
        } />
    </Modal>

  scaleOptions = () =>
    <ScaleOptions
      {...this.state}
      setScale={( {tonic, scale} ) =>
        this.setState({...this.stateWithNewScale({tonic, scale})})
      }
      changeFretboard={this.changeFretboard}
      setScale={this.editTuning}
      setMode={this.setMode}
      >
        {this.tuningModal}
        {this.settingsButtons}
    </ScaleOptions>

  chordOptions = () =>
    <ChordOptions
      {...this.state}
      setChord={(tonic, chord, scale) => {
        let state = this.stateWithNewChord({tonic, chord, scale})
        fretFilter({state, callback: this.getCombo})
      }}
      newVariation={(reverse)=>this.getCombo({
        variationIndex: this.state.variationIndex + (reverse ? -1 : 1)}
      )}
      changeFretboard={this.changeFretboard}
      showAll={this.showAll}
      changeSettings={this.changeSettings}
      keepAllFrets={this.state.keepAllFrets}
      setMode={this.setMode}
      tuningModal={this.tuningModal()}
      settingsButtons={this.settingsButtons()}
    />

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
          setFretboardDims={dims => this.setState(dims)}
          {...this.state}
        />
        {!!this.state.fbHeight && this.scaleOptions()}
      </Col>
    )
  }
}
