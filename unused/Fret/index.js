import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { Note } from '/src/lib/tonal.min.js'
import {TouchableOpacity, Text} from 'react-native'
import styled from 'styled-components/native'

const Outer = styled(TouchableOpacity)`
  flex: ${props => props.flex};
`
const Inner = styled.View`
  background-color: ${props => props.bgColor || 'transparent'};
  border: 1px solid gray;
`
const Content = styled.Text`
  text-align: center;
  overflow: hidden;
`

export default class Fret extends Component {

  render() {
    let { fret, text, onFretClick, flex , bgColor} = this.props
    let fretText = loc.pos===0 ? Note.fromMidi(fret.midi).slice(0,-1) : text
    return (
      <Outer flex={flex} onPress={()=>onFretClick(fret)} >
        <Inner bgColor={bgColor} >
          <Content>{fretText}</Content>
        </Inner>
      </Outer>
    )
  }
}

Fret.propTypes = {
  fret: PropTypes.shape({}).isRequired,
  // settings: PropTypes.shape({}).isRequired,
  // loc: PropTypes.shape({}).isRequired,
  flex: PropTypes.number.isRequired,
  // midi: PropTypes.number.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
