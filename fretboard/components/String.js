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
      {...fret}
      key={`fret-${j}`}
      flex={this.props.flexArr[j]}
      onFretClick={()=>this.props.onFretClick()}
    />
  )

  render() {
    // console.log(text);//render empty boxes for off frets

  return (
      <Row dial={5} key={i}>
        {this.state.activated && frets}
      </Row>
    )
  }
}

Fret.propTypes = {
  frets: PropTypes.shape([]).isRequired,
  slexArr: PropTypes.shape([]).isRequired,
  onFretClick: PropTypes.func.isRequired,
}
