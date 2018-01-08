import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  updateFretMatrix,
  fretMatrixForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './fretboard'
  import Options from './src/Options'
import {initChord} from './src/utils/chordShapes'
import { isEmpty, clone, range } from 'lodash/fp'
import { Note, Chord, Interval } from 'tonal'

const Container = styled.View`
  display: flex;
  flex-direction: column;
`

const width  = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
const emptyFretMatrix = fretMatrixForChord(tuning, width, '', true)
export default class App extends Component {
  constructor(props) {
    super(props)
    let { chordName,
          fretMatrix,
          includedAddresses,
          chordShapes,
          chordMode,
          variationIndex } = initChord(tuning, width, '', true)

    this.state = {
      showNotes: false,
      showOctaves: false,
      fretMatrix,
      chordMode,
      chordName,
      variationIndex,
      includedAddresses,
      chordShapes
    }
  }

  onFretClick = (loc, midi) => {
    this.selectLoc(loc, midi)
    // this.selectPitch(midi)
  }

  fretMatch = (fret1, fret2) =>
    fret1.loc.crd===fret2.loc.crd && fret1.loc.pos===fret2.loc.pos

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({
      fretMatrix: fretMatrixForPc(tuning, width, pitch, true)
    })
  }

  fretIterator = (fn) => {
    let strings = this.state.fretMatrix.map(string=>
      string.map(fret=> fn(clone(fret))
    ))
    return strings
  }

  selectLoc = (loc, midi) => {
    let fretMatrix = this.fretIterator(fret => {
      if (fret.loc.crd===loc.crd && fret.loc.pos===loc.pos) {
        console.log('FRET', fret)
        fret.state.status = "selected"
        fret.state.selectionText = Note.fromMidi(fret.midi)
      }
      return fret
    } )
    this.setState({fretMatrix})
  }

  getCombo = (reverse) => {
    let increment = reverse ? -1 : 1
    let vars = this.state.chordShapes.length-1
    let index = this.state.variationIndex + increment
    if (index < 0) index = vars
    if (index > vars ) index = 0
    // console.log('st', this.state.chordShapes[index].keys());
    this.setState({
      fretMatrix:  updateFretMatrix(this.state.chordShapes[index])(emptyFretMatrix),
      variationIndex: index
    })
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
        <Options
          setChord={newChord => this.setState(
            Object.assign(this.state, initChord(tuning, width, newChord, true))
          )}
          numVariations={this.state.chordShapes.length}
          variationIndex={this.state.variationIndex}
          newVariation={(reverse)=>this.getCombo(reverse)}
          showAll={()=>this.setState({fretMatrix: fretMatrixForChord(tuning, width, 'C', true)})}
        />
      </Container>
    )
  }
}
