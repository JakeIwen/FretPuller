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

const Container = styled.View`
  display: flex;
  flex-direction: column;
`
const maxFretSpan = 7
const width  = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
const emptyFretMatrix = (tuning, width) =>
  fretMatrixForChord(tuning, width, '')

export default class App extends Component {
  constructor(props) {
    super(props)
    let { chord,
          fretMatrix,
          includedAddresses,
          chordShapes,
          variationIndex,
          viewMode } = initChord(tuning, width, 'C')
          //TODO cant init 'C9'
    this.state = {
      settings: {
        showNotes: false,
        showPositions: false,
        showOctaves: false,
      },
      maxFretSpan,
      fretRange: [0, width],
      incZeroFret: true,
      fbHeight: 0,
      fretMatrix,
      chord,
      variationIndex,
      includedAddresses,
      chordShapes,
      allShapes: chordShapes,
      viewMode,
      tuning,
      width
    }
  }

  initChord = (chord) =>
    initChord(this.state.tuning, this.state.width, chord || 'CM')

  onFretClick = (fret) => {
    this.selectLoc(fret)
    // this.selectPitch(midi)
  }

  fretMatch = (fret1, fret2) =>
    fret1.loc.crd===fret2.loc.crd && fret1.loc.pos===fret2.loc.pos

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForPc(this.state.tuning, width, pitch)
    })
  }

  selectLoc = (fret) => {
    let isSelected = fret.state.status==="selected"
    newFret = cloneDeep(fret)
    newFret.state.status = isSelected ? "unselected" : "selected"
    newFret.state.selectionText = Note.fromMidi(newFret.midi)
    this.setState({
      fretMatrix:  updateFretMatrix([newFret])(this.state.fretMatrix),
    })
  }

  getCombo = (reverse, reset) => {
    let increment = reverse ? -1 : 1
    let vars = this.state.chordShapes.length - 1
    let index = reset ? 0 : this.state.variationIndex + increment
    if (index < 0) index = vars
    if (index > vars) index = 0
    this.setState({
      fretMatrix:  updateFretMatrix(this.state.chordShapes[index])(
        emptyFretMatrix(this.state.tuning, this.state.width)
      ),
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

  fretFilter = ({fretRange, maxFretSpan, incZeroFret}) => {
    fretRange = fretRange || this.state.fretRange
    maxFretSpan = maxFretSpan || this.state.maxFretSpan
    incZeroFret = incZeroFret || this.state.incZeroFret
    console.log({fretRange, maxFretSpan, incZeroFret})

    let newShapes = this.state.allShapes
    newShapes = this.state.allShapes.filter(frets => {
      let positions = frets.map(fret=>fret.loc.pos)
        .filter( pos => !(incZeroFret && pos===0))
      let spanOk = (Math.max(...positions) - Math.min(...positions)) < maxFretSpan
      let rangeOk = positions.every( pos => pos > fretRange[0] && pos < fretRange[1])
      return spanOk && rangeOk
    })

    this.setState({
      chordShapes: newShapes,
      incZeroFret,
      maxFretSpan,
      fretRange
    })

    this.getCombo(false, true)
  }

  render() {
    console.log('HEIGHT', this.state.fbHeight);
    return (
      <Container>
        <Fretboard
          isClickable
          settings={this.state.settings}
          fretMatrix={this.state.fretMatrix}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
          setFretboardHeight={height=>this.setState({fbHeight: height})}
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
        />}

      </Container>
    )
  }
}
