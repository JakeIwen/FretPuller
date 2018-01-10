import React, {Component} from 'react'
import PropTypes from 'prop-types'
import  Row  from 'react-native-row'
import Fret from './Fret'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'

const octForMidi = midi => compose(Note.oct,Note.fromMidi)(midi)
const pcForMidi = midi => compose(Note.pc,Note.fromMidi)(midi)

const Outer = styled(TouchableOpacity)`
  flex: ${props => props.flex};
`

export default class String extends Component {

  constructor(props){
    super()
    this.state = {
      activated: true
    }
  }

  makeFrets = () => this.props.frets.map( (fret, j) =>
    <Fret
      fret={fret}
      key={`fret-${j}`}
      flex={this.props.flexArr[j]}
      settings={this.props.settings}
      onFretClick={()=>this.props.onFretClick()}
    />
  )

  render() {

    return (
      <Row dial={5} >
        {!!this.state.activated && this.makeFrets()}
      </Row>
    )
  }
}

String.propTypes = {
  frets: PropTypes.array.isRequired,
  flexArr: PropTypes.array.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
