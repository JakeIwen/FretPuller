import React, {Component} from 'react'
import {  Fretboard,
          fretMatrixForNote,
          fretMatrixForChord,
          fretMatrixForScale } from './fretboard'
import ScaleOptions from './ScaleOptions'
import ChordOptions from './ChordOptions'
import {initChord} from './utils/chordShapes'
import { Col, Row, SettingsWrapper } from './styled'
import { Note } from './lib/tonal.min.js'
import {fretTruth} from './utils/frets'
import {getFilteredShapes} from './utils/fretFilter'
import {indexLoop} from './utils/indexLoop'
import {getSelectionMatrix} from './utils/getSelectionMatrix'
import {TuningModal} from './Tuning/TuningModal'
import {FpButton} from './styled/options'

const chordShapeKeys = ['incZeroFret', 'noGaps', 'allStrings', 'fretRange', 'activeStrings', 'allShapes', 'tuning', 'maxFretSpan']


export default class FretPuller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.props,
      ...initChord(this.props),
      fbHeight: 0,
      showTuningModal: false,
      keepAllFrets: true
    }
  }

  componentDidMount = () => this.updateFilter()

  onFretClick = (fret) => {
    // this.selectPitch(midi)
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

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForNote(this.state.tuning, width, pitch)
    })
  }

  updateFilter = (args={}) => {
    if ((args.appMode || this.state.appMode) === 'scale') return this.updateScaleFretMatrix(args)
    if (args.maxFretSpan!==undefined) {
      if (args.maxFretSpan < 2) args.maxFretSpan = 2
      else if (args.maxFretSpan > 7) args.maxFretSpan = 7
    }
    const argKeys = Object.keys(args)
    const newState = {...this.state, ...args}
    const needsNewShapes = argKeys.some(key => chordShapeKeys.includes(key))
    const chordShapes = needsNewShapes
      ? getFilteredShapes(newState)
      : newState.chordShapes
    const variationIndex = indexLoop(newState.variationIndex, chordShapes)
    const selectionMatrix = getSelectionMatrix({...newState, variationIndex, chordShapes})
    this.setState({
      ...newState,
      chordShapes,
      variationIndex,
      selectionMatrix
    })
  }

  updateScaleFretMatrix = ( settings={} ) => {
    const keys = ['tuning', 'width', 'tonic', 'scale', 'showNames']
    const state = keys.reduce( (acc, key) => {
      acc[key] = settings[key]===undefined ? this.state[key] : settings[key]
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

  changeFretboard = ( settings={} ) => {
    const keys = ['tuning', 'width', 'chord', 'tonic', 'scale', 'appMode', 'showNames']
    let state = keys.reduce( (acc, key) => {
      acc[key] = settings[key]===undefined ? this.state[key] : settings[key]
      return acc
    }, {})
    if (settings.chord || settings.tonic || settings.tuning || settings.showNames!==undefined) {
      state = Object.assign(state, initChord(state))
    }
    this.updateFilter(Object.assign(this.state, state))
  }

  showAll = () => {
    const {tuning, width, chord, tonic} = this.state
    this.setState({ fretMatrix: fretMatrixForChord(tuning, width, tonic+chord) })
  }

  setAppMode = (mode) => {
    this.setState({
      ...initChord({...this.state, appMode: mode})
    })
  }

  settingsButtons = () =>
    <SettingsWrapper>
      <Col>
        <FpButton width={160}
          title={`SHOW NOTE ${this.state.showNames ? 'INTERVALS' : 'NAMES'}`}
          onPress={()=>this.changeFretboard({showNames: !this.state.showNames})}/>
          <Row>
            <FpButton
              title='CHANGE TUNING'
              onPress={()=>{
                this.setState({showTuningModal: true})
              }}/>
            <FpButton
              title={(this.state.appMode)=='chord' ? 'SCALE MODE' : 'CHORD MODE'}
              onPress={()=>this.setAppMode((this.state.appMode)=='scale' ? 'chord' : 'scale')}/>
        </Row>
        </Col>
    </SettingsWrapper>

  scaleOptions = () =>
    <ScaleOptions
      {...this.state}
      setScale={this.updateScaleFretMatrix}
      changeFretboard={this.changeFretboard}
      setAppMode={this.setAppMode}
      >
        {this.settingsButtons()}
    </ScaleOptions>

  chordOptions = () =>
    <ChordOptions
      {...this.state}
      changeFretboard={this.changeFretboard}
      showAll={this.showAll}
      updateFilter={this.updateFilter}
      setAppMode={this.setAppMode}
    >
      {this.settingsButtons()}
    </ChordOptions>


  optionsElements = () => {
    switch (!!this.state.fbHeight && this.state.appMode) {
      case 'chord':
        return this.chordOptions()
      case 'scale':
        return this.scaleOptions()
      default:
        return null
    }
  }

  render() {
    return (
      <Col flex>
        <Fretboard
          isClickable
          defaultMatrix={this.state.keepAllFrets && this.state.possibilitiesMatrix}
          onFretClick={this.onFretClick}
          updateFilter={this.updateFilter}
          setFretboardDims={dims => this.setState(dims)}
          {...this.state}
        />
        {this.optionsElements()}
        <TuningModal {...this.state} onSave={this.changeFretboard} />
      </Col>
    )
  }
}
