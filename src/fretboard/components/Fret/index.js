import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { Note } from '/src/lib/tonal.min.js'
import Inner from './Inner'
import Content from './Content'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'

const octForMidi = midi => compose(Note.oct, Note.fromMidi)(midi)
const pcForMidi = midi => compose(Note.pc,Note.fromMidi)(midi)
console.log('octmidi', octForMidi(60));
console.log(Note.oct('C4'), Note.fromMidi(60));

const Outer = styled(TouchableOpacity)`
  flex: ${props => props.flex};
`

export default class Fret extends Component {

  constructor(props){
    super()
    this.state = {
      selectionText: "1P",
      status: "unselected"
    }
  }

  render() {
    let { fret, settings, onFretClick, flex , bgColor, selected} = this.props
    const { showOctaves, showNotes, viewMode } = settings
    const { midi, loc, state: { status, selectionText} } = fret
    let text = loc.pos===0 ? Note.fromMidi(midi).slice(0,-1) : selectionText
    // debugger
    return (
      <Outer
        flex={flex}
        onPress={()=>onFretClick(fret)}
        onLongPress={()=>this.props.toggleString(fret.loc.crd)}
      >
        <Inner
          selected={selected}
          bgColor={bgColor}
        >
          <Content
            pc={pcForMidi(midi)}
            showNotes={showNotes}
            selectionText={text}
            isNut={loc.pos===0}
            isSelected={selected}
          />
        </Inner>
      </Outer>
    )
  }
}

Fret.propTypes = {
  fret: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
  // loc: PropTypes.shape({}).isRequired,
  flex: PropTypes.number.isRequired,
  // midi: PropTypes.number.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
