import React, {Component} from 'react'
import styled from "styled-components/native"
import Fretboard, {
  updateFretMatrix,
  fretMatrixForPc,
  locationsForPc,
  fretMatrixForNote,
  fretMatrixForInterval,
  fretMatrixForChord,
  fretMatrixForScale, } from './fretboard'
  import Options from './src/Options'
import {initChord} from './src/utils/chordShapes'
import { isEmpty, cloneDeep, range } from 'lodash/fp'
import { Note, Chord, Interval } from 'tonal'
import Tuning from './Tuning'

import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'


const Container = styled.View`
  display: flex;
  flex-direction: column;
`

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const width  = 13
const tuning = ['E', 'A', 'D', 'G', 'B', 'E']
const emptyFretMatrix = fretMatrixForChord(tuning, width, '')

export default class App extends Component {
  constructor(props) {
    super(props)
    let { chord,
          fretMatrix,
          includedAddresses,
          chordShapes,
          variationIndex,
        viewMode } = initChord(tuning, width, 'CM')

    this.state = {
      showNotes: false,
      showOctaves: false,
      fretMatrix,
      chord,
      variationIndex,
      includedAddresses,
      chordShapes,
      viewMode,
      editTuning: true,
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

  changeFretboard = ({tuning, width, chord}) => {
    tuning = tuning || this.state.tuning
    width = width || this.state.width
    chord = chord || this.state.chord
    console.log('cfb', {tuning, width, chord});
    this.setState(
      Object.assign(this.state,
      initChord(tuning, width, chord))
    )
  }

  editTuning = () => this.popupDialog.show()

  render() {
    return (
      <Container>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation={slideAnimation}
            dialogTitle={<DialogTitle title="Tuning" />}
            dismissOnTouchOutside
          >
            <Tuning
              tuning={this.state.tuning}
              onSave={(tuning)=>{
                this.popupDialog.dismiss()
                console.log('onsave', {tuning})

                this.changeFretboard(tuning)}
              } />
        </PopupDialog>
        <Fretboard
          isClickable
          settings={{
            showNotes: this.state.showNotes,
            showPositions: this.state.showPositions,
            showOctaves: this.state.showOctaves,
            viewMode: this.state.viewMode
          }}
          fretMatrix={this.state.fretMatrix}
          onFretClick={(loc, midi) => this.onFretClick(loc, midi)}
        />
        <Options
          setChord={newChord => this.setState(
            Object.assign(this.state, this.initChord(newChord))
          )}
          numVariations={this.state.chordShapes.length}
          variationIndex={this.state.variationIndex}
          newVariation={(reverse)=>this.getCombo(reverse)}
          changeFretboard={this.changeFretboard}
          editTuning={()=>{this.editTuning()}}
          tuning={this.state.tuning}
          showAll={()=>this.setState({
            fretMatrix: fretMatrixForChord(this.state.tuning, width, 'C')}
          )}
        />

      </Container>
    )
  }
}
