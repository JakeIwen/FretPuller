import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { Note } from 'tonal'
import Inner from './Inner'
import Content from './Content'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'

const octForMidi = midi => compose(Note.oct,Note.fromMidi)(midi)
const pcForMidi = midi => compose(Note.pc,Note.fromMidi)(midi)

const Outer = styled(TouchableOpacity)`
  ${'' /* height: 20px; */}
  flex: ${props => props.flex};
`

const Fret = ({ fret, settings, isClickable, onFretClick, flex }) => {
  const { showOctaves, showNotes, viewMode } = settings
  const { midi, loc, state: { status, selectionText, bgColor} } = fret
  const isFretClickable = isClickable
  let text = loc.pos===0 ? Note.fromMidi(midi).slice(0,-1) : selectionText

  loc.pos===0 && console.log(Note.fromMidi(midi).slice(0,-1));
  // console.log(text);
  return (
    <Outer
      flex={flex}
      isClickable={isFretClickable}
      onPress={isFretClickable ? () => onFretClick(fret) : null }
    >
      <Inner
        // chordTone={Chord.notes(chordName).indexOf}
        status={status}
        showOctaves={showOctaves}
        bgColor={ bgColor}
        oct={octForMidi(midi)}
      >
        <Content
          pc={pcForMidi(midi)}
          showNotes={showNotes}
          viewMode={viewMode}
          selectionText={text}
          isNut={loc.pos===0}
          isSelected={status === 'selected'}
        />
      </Inner>
    </Outer>
  )
}

Fret.propTypes = {
  fret: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
  isClickable: PropTypes.bool.isRequired,
  onFretClick: PropTypes.func.isRequired,
}

export default Fret
