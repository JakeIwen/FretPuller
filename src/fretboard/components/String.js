import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row } from '/src/styled'
import Fret from './Fret'
// import {TouchableOpacity} from 'react-native'

export default class String extends Component {

  // constructor(props){
  //   super()
  //   this.state = {
  //     activated: true
  //   }
  // }

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
        {this.makeFrets()}
      </Row>
    )
  }
}

String.propTypes = {
  frets: PropTypes.array.isRequired,
  flexArr: PropTypes.array.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
