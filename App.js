import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  updateFretMatrix,
  fretMatrixForPc,
  locationsForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './src/fretboard'
import Options from './src/Options'
import {initChord} from './src/utils/chordShapes'
import { isEmpty, cloneDeep, range } from 'lodash/fp'
import { Note, Chord, Interval } from 'tonal'
import {tokenize} from '/src/utils/tokenize'
import {fretTruth} from '/src/utils/frets'
import {ivlColors, tonicColors} from '/src/theme/colors'

const Container = styled.View`
  display: flex;
  flex-direction: column;
`
const maxFretSpan = 7
const defaultWidth  = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

export default class App extends Component {
  constructor(props) {
    super(props)
    let { chord,
          fretMatrix,
          chordShapes,
          variationIndex,
          viewMode,
          width,
          selectionMatrix,
          fullSelectionMatrix } = initChord(tuning, defaultWidth, 'C')

    this.state = {
      maxFretSpan,
      fretRange: [0, width],
      incZeroFret: true,
      fbHeight: 0,
      nutWidth: 0,
      fretMatrix,
      chord,
      variationIndex,
      chordShapes,
      allShapes: chordShapes,
      viewMode,
      tuning,
      width,
      selectionMatrix,
      fullSelectionMatrix,
      incOctaves: true,
      keepAllFrets: true,
      activeStrings: [true,true,true,true,true,true],
    }
  }

  initChord = (chord) =>
    initChord(this.state.tuning, this.state.width, chord || 'CM')

  onFretClick = (fret) => {
    // this.selectPitch(midi)
    console.log(fret);
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

  changeSettings = ({incOctaves, keepAllFrets}) => {
    incOctaves!==undefined && this.setState({incOctaves})
    keepAllFrets!==undefined && this.setState({keepAllFrets}) && console.log({keepAllFrets});
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

  getCombo = (reverse, reset) => {
    let increment = reverse ? -1 : 1
    let vars = this.state.chordShapes.length - 1
    let index = reset ? 0 : this.state.variationIndex + increment
    if (index < 0) index = vars
    if (index > vars) index = 0
    let thisShape = this.state.chordShapes[index]
    let newSelect = this.state.fretMatrix.map((stg, i) =>
      stg.map( (fret,j) =>
        thisShape.some( chord => chord.loc.crd===i && chord.loc.pos===j)
      )
    )
    this.setState({
      selectionMatrix: newSelect,
      variationIndex: index
    })
  }

  changeFretboard = ({tuning, width, chord}) => {
    tuning = tuning || this.state.tuning
    width = width || this.state.width
    chord = chord || this.state.chord
    console.log('cfb', {tuning, width, chord});
    this.setState(Object.assign(this.state, initChord(tuning, width, chord)))
    console.log('CFB STATE', this.state.tuning);
  }

  showAll = () => {
    let {tuning, width, chord} = this.state
    this.setState({ fretMatrix: fretMatrixForChord(tuning, width, chord) })
  }

  fretFilter = ({fretRange, maxFretSpan, incZeroFret, activeStrings}) => {
    fretRange = fretRange || this.state.fretRange
    maxFretSpan = maxFretSpan || this.state.maxFretSpan
    activeStrings = activeStrings || this.state.activeStrings
    incZeroFret = incZeroFret===undefined ? this.state.incZeroFret : incZeroFret

    console.log({fretRange, maxFretSpan, incZeroFret, activeStrings})

    let newShapes = this.state.allShapes.filter(fretsInChord => {
      let positions = fretsInChord.map(fret=>fret.loc.pos)
      let noZeros = positions.filter( pos => !(incZeroFret && pos===0))
      let crds = fretsInChord.map(fret=>fret.loc.crd)
      let spanOk = (Math.max(...noZeros) - Math.min(...noZeros)) < maxFretSpan
      let rangeOk = positions.every( pos => pos > fretRange[0] && pos < fretRange[1])
      let stringOk = crds.every( crd => {
        return activeStrings[crd]
      })
      return spanOk && rangeOk && stringOk
    })

    this.setState({
      chordShapes: newShapes,
      incZeroFret,
      maxFretSpan,
      fretRange,
      activeStrings
    })

    this.getCombo(false, true)
  }

  render() {
    let colorArr = tonicColors(tokenize(this.state.chord)[0])
    return (
      <Container>
        <Fretboard
          isClickable
          activeStrings={this.state.activeStrings}
          selectionMatrix={this.state.selectionMatrix}
          defaultMatrix={this.state.keepAllFrets &&  this.state.fullSelectionMatrix}
          fretMatrix={this.state.fretMatrix}
          colorArr={colorArr}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
          fretFilter={this.fretFilter}
          setFretboardDims={dims => this.setState(dims)}
        />
        {!!this.state.fbHeight &&
          <Options
            setChord={newChord => this.setState(
              Object.assign(this.state, this.initChord(newChord))
            )}
            fbHeight={this.state.fbHeight}
            numVariations={this.state.chordShapes.length}
            variationIndex={this.state.variationIndex}
            fretFilter={this.fretFilter}
            maxFretSpan={this.state.maxFretSpan}
            newVariation={(reverse)=>this.getCombo(reverse)}
            changeFretboard={this.changeFretboard}
            editTuning={this.editTuning}
            tuning={this.state.tuning}
            showAll={this.showAll}
            colorArr={colorArr}
            viewMode={this.state.viewMode}
            incOctaves={this.state.incOctaves}
            keepAllFrets={this.state.keepAllFrets}
            changeSettings={this.changeSettings}
        />}

      </Container>
    )
  }
}
