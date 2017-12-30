import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from "styled-components/native"
import Fretboard, { fretMatrixForChord, fretMatrixForPc } from './fretboard'
import Options from './src/Options'
import { isEmpty, clone } from 'lodash/fp'
import { Note, Chord } from 'tonal'

const Container = styled.View`
  ${'' /* display: flex;
  flex-direction: column;
  justify-content: space-between; */}
  ${'' /* width: 100%;
  height: 100%; */}
`

const width = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

export default class App extends Component {

  state = {
    showNotes: false,
    showPositions: true,
    showOctaves: false,
    fretMatrix: fretMatrixForPc(tuning, width, 'C', true)
  }

  onFretClick = (loc, midi) => {
    // this.selectLoc(loc, midi)
    this.selectPitch(midi)
  }

  changeChord = (chordName) => {
    this.setState({fretMatrix: fretMatrixForChord(tuning, width, chordName,  true)})
  }

  selectPitch = (midi) => {
    let pitch = Note.fromMidi(midi)
    pitch = pitch.slice( 0, pitch.length - 1 )
    this.setState({fretMatrix: fretMatrixForPc(tuning, width, pitch, true)})
  }

  selectLoc = (loc, midi) => {
    let matrix = clone(this.state.fretMatrix)
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].loc.crd===loc.crd && matrix[i][j].loc.pos===loc.pos) {
          console.log(matrix[i][j])
          console.log('isEQUAL')
          matrix[i][j].state.status = "selected"
        }
      }
    }
    this.setState({fretMatrix: matrix})
  }

  render() {
    // console.log(fretMatrixForChord(tuning, width, 'Cmaj7', true))
    //"eslint-config-react-native": "^2.0.0",
    //
    return (
      <Container>
        <Options changeChord={newChord => this.changeChord(newChord)}/>
        <Fretboard
          isClickable
          settings={{
            showNotes: this.state.showNotes,
            showPositions: this.state.showPositions,
            showOctaves: this.state.showOctaves,
          }}
          fretMatrix={this.state.fretMatrix}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
        />
      </Container>
    )
  }
}
