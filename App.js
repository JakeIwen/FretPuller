import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  fretMatrixForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './fretboard'
import Options from './src/Options'
import { isEmpty, clone } from 'lodash/fp'
import { Note, Chord, Interval } from 'tonal'

const Container = styled.View`
  display: flex;
  flex-direction: column;
`

console.log(Chord.intervals('CM7'));

const width  = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

export default class App extends Component {

  state = {
    showNotes: false,
    showOctaves: false,
    newMode: false,
    fretMatrix: fretMatrixForChord(tuning, width, 'C', true),
    chordMode: true,
  }

  onFretClick = (loc, midi) => {
    this.selectLoc(loc, midi)
    // this.selectPitch(midi)
  }

  findVariations = () => {

  }

  changeChord = (chordName) => {
    this.setState({
      fretMatrix: fretMatrixForChord(tuning, width, chordName, true)
    })
  }

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForPc(tuning, width, pitch, true)
    })
  }

  fretIterator = (fn) => {
    let strings = clone(this.state.fretMatrix)
    strings.forEach( string => string.forEach( fret => fn(fret)) )
    return strings
  }

  selectLoc = (loc, midi) => {
    let fretMatrix = this.fretIterator(fret => {
      if (fret.loc.crd===loc.crd && fret.loc.pos===loc.pos) {
        console.log(fret)
        fret.state.status = "selected"
        fret.state.selectionText = Note.fromMidi(fret.midi)
      }
    } )
    this.setState({fretMatrix})
  }

  render() {
    return (
      <Container>
        <Fretboard
          isClickable
          settings={{
            showNotes: this.state.showNotes,
            showPositions: this.state.showPositions,
            showOctaves: this.state.showOctaves,
            chordMode: this.state.chordMode,
          }}
          fretMatrix={this.state.fretMatrix}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
        />
        <Options changeChord={newChord => this.changeChord(newChord)}/>
      </Container>
    )
  }
}
