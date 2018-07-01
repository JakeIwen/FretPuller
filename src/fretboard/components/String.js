import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row } from '../../../src/styled'
import { Note } from '../../../src/lib/tonal.min.js'
import Fret from './Fret'
import { Switch } from 'react-native-switch'
import {ivlColors} from '../../../src/theme/colors'
// import Swiper from 'react-native-swiper';
import { Text} from 'react-native'
import { reverse, merge, range } from 'lodash/fp'

export default class String extends Component {

  render() {
    let {fretFilter, activeStrings, stringNum, selectionArr, frets} = this.props

    let openNote = Note.fromMidi(frets[0].midi).slice(0,-1)
    const makeFrets = (active) => frets.map( (fret, j) =>
      <Fret
        fret={fret}
        text={(selectionArr[j] && fret.state.selectionText) || '\u00A0'}
        bgColor={activeStrings[stringNum]
          ? this.props.colorArr[fret.midi % 12]
          : '#dddddd'
        }
        key={`fret-${j}`}
        flex={this.props.flexArr[j]}
        selected={selectionArr[j] || this.props.defaultMatrix[j]}
        highlighted={selectionArr[j] && this.props.defaultMatrix[j]}
        onFretClick={this.props.onFretClick}
      />
    )
    return (
      <Row dial={5} >
        <Switch
          barHeight={18}
          circleSize={20}
          activeTextStyle={{fontSize: 10, fontWeight: "600"}}
          inactiveTextStyle={{fontSize: 10, fontWeight: "600"}}
          activeText={openNote}
          inActiveText={openNote}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          onValueChange={(val)=>{
            let newActive = [...activeStrings]
            newActive[stringNum] = val
            fretFilter({activeStrings: reverse(newActive)})
          }}
          value={activeStrings[stringNum]}
        />
        {makeFrets()}
      </Row>

    )
  }
}

{/*
  onValueChange={(val)=>{
    let newActive = [...activeStrings]
    newActive[stringNum] = val
    fretFilter({activeStrings: newActive})
  }}

  <Switch
  circleSize={15}
  onValueChange={(val)=>{
    let newActive = [...activeStrings]
    newActive[stringNum] = val
    fretFilter({activeStrings: newActive})
  }}
  value={activeStrings[stringNum]}
/> */}

// {this.props.chooseStrings
//   ? <Fret
//       fret={this.props.frets[0]}
//       bgColor={activeStrings[stringNum] ? '#DDDDDD' : '#AAAAAA'}
//       key={`fret-${stringNum}`}
//       flex={1}
//       selected={true}
//       settings={this.props.settings}
//       onFretClick={()=>{
//         let newActive = [...activeStrings]
//         newActive[stringNum] = !newActive[stringNum]
//         fretFilter({activeStrings: newActive})
//       }}
//     />
//   : this.makeFrets(activeStrings[stringNum])
// }

// componentWillMount() {
//   this.gestureResponder = createResponder({
//     onStartShouldSetResponder: (evt, gestureState) => true,
//     onStartShouldSetResponderCapture: (evt, gestureState) => true,
//     onMoveShouldSetResponder: (evt, gestureState) => true,
//     onMoveShouldSetResponderCapture: (evt, gestureState) => true,
//     onResponderGrant: (evt, gestureState) => {},
//     onResponderMove: (evt, gestureState) => {},
//     onResponderTerminationRequest: (evt, gestureState) => true,
//     onResponderRelease: (evt, gestureState) => {console.log('release', gestureState)},
//     onResponderTerminate: (evt, gestureState) => {},
//
//     onResponderSingleTapConfirmed: (evt, gestureState) => {console.log(gestureState.singleTapUp, gestureState.doubleTapUp)},
//
//     moveThreshold: 2,
//     debug: false
//   });
// }

String.propTypes = {
  frets: PropTypes.array.isRequired,
  flexArr: PropTypes.array.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
