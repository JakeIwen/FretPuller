import React, {Component} from 'react'
import {  Fretboard,
          fretMatrixForNote,
          fretMatrixForChord,
          fretMatrixForScale } from './fretboard'
import ScaleOptions from './ScaleOptions'
import ChordOptions from './ChordOptions'
import {initChord} from './utils/chordShapes'
import { Col, Row } from './styled'
import { Note } from 'tonal'
import {fretTruth} from './utils/frets'
import {fretFilter} from './utils/fretFilter'
import {indexLoop} from './utils/indexLoop'
import { tonicColors} from './theme/colors'
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

  componentDidMount() {
    this.appMode == 'chord' && this.changeSettings({})
  }

  onFretClick = (fret) => {
    // this.selectPitch(midi)
    console.log(fret)
    this.showThisNote(fret)
  }

  showThisNote = (clickedFret) => {
    const {incOctaves, viewMode, selectionMatrix} = this.state
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

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForNote(this.state.tuning, width, pitch)
    })
  }

  getCombo = ({...newState}) => {
    const state = Object.assign(this.state, newState)
    reset = reset || !!newState
    const index = indexLoop(state.variationIndex, state.chordShapes)
    const thisShape = state.chordShapes[index]
    const newSelect = state.fretMatrix.map((stg, i) =>
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
      appMode: 'chord'
    }))

  updateScaleFretMatrix = ({tuning, width, tonic, scale}) => {
    tuning = tuning || this.state.tuning
    width = width || this.state.width
    tonic = tonic || this.state.tonic
    scale = scale || this.state.scale
    const fretMatrix = fretMatrixForScale( tuning, width, tonic, scale )
    const blackOut = fretMatrix.map(stg => stg.map(fret => fret.state.status==='selected'))
    this.setState({
      fretMatrix,
      tuning,
      width,
      tonic,
      scale,
      selectionMatrix: blackOut,
      fullSelectionMatrix: blackOut,
    })
}

  changeFretboard = ({tuning, width, chord, tonic}) => {
    fretFilter({
      state: this.stateWithNewChord({tuning, width, tonic, chord}),
      callback: (newState) => this.getCombo(newState)
    })
    console.log('CFB STATE', this.state);
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
    <Row>
      <FpButton
        title='CHANGE TUNING'
        onPress={()=>this.setState({showTuningModal: true})}/>
      <FpButton
        title={(this.state.appMode)=='scale' ? 'SCALE MODE' : 'CHORD MODE'}
        onPress={()=>this.setAppMode((this.state.appMode)=='scale' ? 'chord' : 'scale')}/>
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
      setScale={( {tonic, scale} ) => this.updateScaleFretMatrix( {tonic, scale } )}
      changeFretboard={this.changeFretboard}
      setAppMode={this.setAppMode}
      >
        {this.tuningModal()}
        {this.settingsButtons()}
    </ScaleOptions>

  chordOptions = () =>
    <ChordOptions
      {...this.state}
      setChord={(tonic, chord, scale) => {
        const state = this.stateWithNewChord({tonic, chord, scale})
        fretFilter({state, callback: this.getCombo})
      }}
      newVariation={(reverse)=>this.getCombo({
        variationIndex: this.state.variationIndex + (reverse ? -1 : 1)}
      )}
      changeFretboard={this.changeFretboard}
      showAll={this.showAll}
      changeSettings={this.changeSettings}
      setAppMode={this.setAppMode}
      tuningModal={this.tuningModal()}
      settingsButtons={this.settingsButtons()}
    />

  render() {
    const colorArr = tonicColors(this.state.tonic)
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
