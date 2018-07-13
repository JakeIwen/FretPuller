import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row } from '../../styled'
import { Note } from '../../lib/tonal.min.js'
import Fret from './Fret'
import { Switch } from 'react-native-switch'
import {tonicColors} from '../../theme/colors'
import {accFormat} from '../../utils/format'

export default class String extends Component {

  render() {
    const {updateFilter, activeStrings, stringNum, frets, tonic, selectionMatrix, defaultMatrix} = this.props
    const selectionArr = selectionMatrix[stringNum]
    const defMatrix = defaultMatrix[stringNum] || []
    const colorArr = tonicColors(tonic)
    const openNote = Note.fromMidi(frets[0].midi).slice(0,-1)
    const makeFrets = () => frets.map( (fret, j) =>
      <Fret
        fret={fret}
        text={(selectionArr[j] && fret.state.selectionText) || '\u00A0'}
        bgColor={activeStrings[stringNum] ? colorArr[fret.midi % 12] : '#dddddd'}
        key={`fret-${j}`}
        flex={this.props.flexArr[j]}
        selected={selectionArr[j] || defMatrix[j]}
        highlighted={selectionArr[j] && defMatrix[j]}
        onFretClick={this.props.onFretClick}
      />
    )
    return (
      <Row dial={5} >
        <Switch
          disabled={this.props.appMode==='scale'}
          barHeight={18}
          activeText={accFormat(openNote)}
          inActiveText={accFormat(openNote)}
          circleSize={20}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          onValueChange={()=>{
            const newActive = activeStrings
            newActive[stringNum] = !activeStrings[stringNum]
            const updateObj = {activeStrings: newActive, allStrings: false}

            if (!newActive.every(stg=>stg))
              updateObj.noGaps = false

            updateFilter(updateObj)
          }}
          value={activeStrings[stringNum]}
        />
        {makeFrets()}
      </Row>
    )
  }
}

String.propTypes = {
  frets: PropTypes.array.isRequired,
  flexArr: PropTypes.array.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
