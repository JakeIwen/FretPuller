import React, {Component} from 'react'
import {  Fretboard,
          fretMatrixForNote,
          fretMatrixForChord,
          fretMatrixForScale } from './fretboard'
import ScaleOptions from './ScaleOptions'
import ChordOptions from './ChordOptions'
import {initChord} from './utils/chordShapes'
import { Col, SettingsWrapper } from './styled'
import { Note } from 'tonal'
import {fretTruth} from './utils/frets'
import {fretFilter} from './utils/fretFilter'
import {indexLoop} from './utils/indexLoop'
import Tuning from './Tuning'
import Modal from 'react-native-modal'
import {FpButton} from './styled/options'


export default class FretPuller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.props,
      ...initChord(this.props),
      fbHeight: 0,
      showTuningModal: false
    }
    console.log(this.state);
    // this.setAppMode(appMode)
  }

  // componentDidMount() {
  //   this.appMode == 'chord' && this.updateFilter({})
  // }

  onFretClick = (fret) => {
    // this.selectPitch(midi)
    console.log(fret)
    this.showThisNote(fret)
  }

  showThisNote = (clickedFret) => {
    const {incOctaves, viewMode, selectionMatrix} = this.state
    this.setState({
      selectionMatrix: this.state.fretMatrix.map( (stg, i) =>
        stg.map( (fret,j) =>
          fretTruth(fret, clickedFret, incOctaves, viewMode, selectionMatrix[i][j])
        )
      )
    })
  }

  updateFilter = (args) => {
    fretFilter({
      state: {...this.state, ...args},
      callback: (newState) => this.getCombo(newState)
    })
  }

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForNote(this.state.tuning, width, pitch)
    })
  }

  getCombo = (newState) => {
    const state = Object.assign(this.state, newState)
    const index = indexLoop(state.variationIndex, state.chordShapes)
    const thisShape = state.chordShapes[index]
    const newSelect = state.fretMatrix.map( (stg, i) =>
      stg.map( (fret,j) =>
        (thisShape || []).some( chord =>
          chord.loc.crd===i && chord.loc.pos===j
        )
      )
    )
    this.setState(Object.assign(state, {
      selectionMatrix: newSelect,
      variationIndex: index
    }))
  }

  updateScaleFretMatrix = ( settings ) => {
    const keys = ['tuning', 'width', 'tonic', 'scale']
    const state = keys.reduce( (acc, key) => {
      acc[key] = settings[key] || this.state[key]
      return acc
    }, {})
    const fretMatrix = fretMatrixForScale( state )
    const blackOut = fretMatrix.map(stg => stg.map(fret => fret.state.status==='selected'))

    this.setState( {
      fretMatrix,
      selectionMatrix: blackOut,
      possibilitiesMatrix: blackOut,
      ...state
    });
  }

  changeFretboard = ( settings ) => {
    const keys = ['tuning', 'width', 'chord', 'tonic', 'scale', 'appMode']
    let state = keys.reduce( (acc, key) => {
      acc[key] = settings[key] || this.state[key]
      return acc
    }, {})
    if (settings.chord || settings.tonic) {
      state = Object.assign(state, initChord(state))
    }
    this.updateFilter(Object.assign(this.state, state))
  }

  showAll = () => {
    const {tuning, width, chord, tonic} = this.state
    this.setState({ fretMatrix: fretMatrixForChord(tuning, width, tonic+chord) })
  }

  setAppMode = (mode) => {
    console.log('setting mode', mode);
    this.setState({
      ...initChord({...this.state, appMode: mode})
    })
  }

  settingsButtons = () =>
    <SettingsWrapper>
      <FpButton
        title='CHANGE TUNING'
        onPress={()=>this.setState({showTuningModal: true})}/>
      <FpButton
        title={(this.state.appMode)=='chord' ? 'SCALE MODE' : 'CHORD MODE'}
        onPress={()=>this.setAppMode((this.state.appMode)=='scale' ? 'chord' : 'scale')}/>
    </SettingsWrapper>

  tuningModal = () =>
    <Modal
      isVisible={this.state.showTuningModal}
      supportedOrientations={['landscape']} >
      <Tuning
        initialTuning={this.state.tuning}
        onSave={ tuning => {
          console.log('save');
          this.setState({showTuningModal: false})
          this.changeFretboard({tuning})
        }
        } />
    </Modal>

  scaleOptions = () =>
    <ScaleOptions
      {...this.state}
      setScale={this.updateScaleFretMatrix}
      changeFretboard={this.changeFretboard}
      setAppMode={this.setAppMode}
      >
        {this.tuningModal()}
        {this.settingsButtons()}
    </ScaleOptions>

  chordOptions = () =>
    <ChordOptions
      {...this.state}
      newVariation={(reverse)=>this.getCombo({
        variationIndex: this.state.variationIndex + (reverse ? -1 : 1)}
      )}
      changeFretboard={this.changeFretboard}
      showAll={this.showAll}
      updateFilter={this.updateFilter}
      setAppMode={this.setAppMode}
    >
      {this.tuningModal()}
      {this.settingsButtons()}
    </ChordOptions>

  render() {
    return (
      <Col flex>
        <Fretboard
          isClickable
          defaultMatrix={this.state.keepAllFrets && this.state.possibilitiesMatrix}
          onFretClick={this.onFretClick}
          fretFilter={this.updateFilter}
          setFretboardDims={dims => this.setState(dims)}

          {...this.state}
        />
        {!!this.state.fbHeight && this.chordOptions()}
      </Col>
    )
  }
}
