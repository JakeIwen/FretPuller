import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row } from '/src/styled'
import Fret from './Fret'
import { Switch } from 'react-native-switch'
import {ivlColors} from '/src/theme/colors'
// import Swiper from 'react-native-swiper';
import {createResponder} from 'react-native-gesture-responder';
import { Text} from 'react-native'
import { reverse, merge, range } from 'lodash/fp'

export default class String extends Component {

  render() {
    let {fretFilter, activeStrings, stringNum, selectionArr} = this.props
    const makeFrets = (active) => this.props.frets.map( (fret, j) =>
        <Fret
          fret={fret}
          text={(selectionArr[j] && fret.state.selectionText) || '\u00A0'}
          bgColor={this.props.colorArr[fret.midi % 12]}
          key={`fret-${j}`}
          flex={this.props.flexArr[j]}
          selected={selectionArr[j]}
          showAsDefault={this.props.defaultMatrix[j]}
          onFretClick={this.props.onFretClick}
        />
      )
    return (
      <Row dial={5}>
        <Switch
          circleSize={15}
          activeText={''}
          inActiveText={''}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          onValueChange={(val)=>{
            let newActive = [...activeStrings]
            newActive[stringNum] = val
            fretFilter({activeStrings: newActive})
          }}
          value={activeStrings[stringNum]}
        />
        {makeFrets(activeStrings[stringNum])}
      </Row>

    )
  }
}

{/* <Switch
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
