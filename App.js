import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  fretMatrixForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './fretboard'
import Options from './src/Options'
import { isEmpty, clone, range } from 'lodash/fp'
import { Note, Chord, Interval } from 'tonal'

const Container = styled.View`
  display: flex;
  flex-direction: column;
`

console.log(Chord.intervals('CM7'));

const width  = 13
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

export default class App extends Component {
  constructor(props) {
    super(props)
    let fretMatrix = fretMatrixForChord(tuning, width, 'C', true)
    let {divisors, stringFrets} = this.findVariations(clone(fretMatrix))
    // console.log({divisors})
    this.state = {
      showNotes: false,
      showOctaves: false,
      newMode: false,
      fretMatrix,
      rootMatrix: fretMatrix.map(string=>string.map(fret=>clone(fret))),
      chordMode: true,
      chordName: 'C',
      variationIndex: 1,
      divisors,
      stringFrets
    }
  }


  onFretClick = (loc, midi) => {
    this.selectLoc(loc, midi)
    // this.selectPitch(midi)
  }

  getPermutation = (n) => {
     var chord = [], curArray;
     for (var i = 0; i < this.state.stringFrets.length; i++) {
        curArray = this.state.stringFrets[i];
        chord.push(curArray[Math.floor(n / this.state.divisors[i]) % curArray.length])
     }
     console.log({chord});
     let matrix = fretMatrixForChord(tuning, width, 'C', true)
     let fretMatrix = matrix.map(string=>string.map(fret=>{
       let hasFret = chord.filter(c =>
         fret.loc.crd===c.loc.crd && fret.loc.pos===c.loc.pos
       )
       if (hasFret.length) {
         // console.log('replacing', fret, matrix[i][j], '\n\n')
         
       } else {
         fret.state = {
          "bgColor": "",
          "selectionText": "",
          "status": "unselected",
         }
       }
       return fret
     }))

     this.setState({fretMatrix, variationIndex: n})
  }

  findVariations = (fretMatrix) => {

    let stringFrets = fretMatrix.map(stg => stg.filter(fret => (fret.state.bgColor)))
    // let notes = Chord.notes(this.state.chordName)

    var divisors = [];
    for (var i = stringFrets.length - 1; i >= 0; i--) {
       divisors[i] = divisors[i + 1] ? divisors[i + 1] * stringFrets[i + 1].length : 1
    }

    let combos = []
    let stringIndicies = range(0, stringFrets.length).map(()=>0)
    let firstNote = [0,0]

    function addCombo(combo) {

    }

    function getCombo(firstNote) {
      let thisCombo = []
      for (var i = 0; i < stringIndicies.length; i++) {
        thisCombo.push(stringFrets[i][stringIndicies[i]])
      }
      return thisCombo
    }
    console.log('combo', getCombo());


    return {divisors, stringFrets}



  }

  changeChord = (chordName) => {
    this.setState({
      chordName,
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
    let strings = clone(this.state.rootMatrix)
    strings.forEach( (string, i) => string.forEach( (fret, j) => fret=fn(fret, i, j)) )
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
        <Options
          changeChord={newChord => this.changeChord(newChord)}
          nextVariation={()=>this.getPermutation(this.state.variationIndex+1)}
          showAll={()=>this.setState({fretMatrix: fretMatrixForChord(tuning, width, 'C', true)})}
        />
      </Container>
    )
  }
}
