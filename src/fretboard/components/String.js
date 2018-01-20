import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row } from '/src/styled'
import Fret from './Fret'
import {Switch} from 'react-native'
import {ivlColors} from '/src/theme/colors'
// import {TouchableOpacity} from 'react-native'

export default class String extends Component {

  makeFrets = () => this.props.frets.map( (fret, j) =>
    <Fret
      fret={fret}
      bgColor={this.props.colorArr[fret.midi % 12 ]}
      key={`fret-${j}`}
      flex={this.props.flexArr[j]}
      selected={this.props.selectionArr[j]}
      settings={this.props.settings}
      onFretClick={this.props.onFretClick}
    />
  )

  render() {
    let {fretFilter, activeStrings, stringNum} = this.props
    return (
      <Row dial={5} >
        <Switch
          onValueChange={(val)=>{
            console.log({val})
            let newActive = [...activeStrings]
            newActive[stringNum] = val
            fretFilter({activeStrings: newActive})
          }}
          value={activeStrings[stringNum]}/>
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
