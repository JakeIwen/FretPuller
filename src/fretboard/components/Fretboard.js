import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { reverse, range } from 'lodash/fp'
import Positions from './Positions'
import styled from 'styled-components/native'
import String from './String'
import Slider from '@ptomasroos/react-native-multi-slider'
import Dimensions from 'Dimensions'
const UPPER_PADDING = 5

const widthCalc = (pos, fbWidth) =>{
  return ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2
}

const Board = styled.View`
  width: 100%;
`
const cuerda = (fretMatrix, flexArr, otherProps) =>
  //lefty mode here?
  reverse(fretMatrix.map((crd,i) =>
    <String
      {...otherProps}
      key={`string-${i}`}
      stringNum={i}
      frets={crd}
      flexArr={flexArr}
    />
  ))

const closest = (arr, val) => arr.reduce((prev, curr) =>
  Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev)

const sumArray = ary => ary.reduce((acc,cur) => acc+=cur )

export default class FretBoard extends Component {
  constructor(props) {
    super(props)
    const numFrets = props.width

    this.flexArr = [
      widthCalc(numFrets, numFrets),
      ...range(0, numFrets-1).map( n => widthCalc(n, numFrets) )
    ]
    const sliderStops = [0, ...this.flexArr.map((val,i) => sumArray(this.flexArr.slice(0,i+1)))]
    this.sliderStops = sliderStops

    this.state = {
      sliderValue: this.props.fretRange.map(fretNum =>
        Math.floor(closest(this.sliderStops, 100*fretNum/numFrets)))
    }

  }

  sliderValuesChange = (vals) => {
    const snappedVals = vals.map(val => closest(this.sliderStops, val))
    this.props.updateFilter({
      fretRange: snappedVals.map( (val) => this.sliderStops.indexOf(val))
    })
    this.setState({
      sliderValue: vals.map(val=>Math.floor(closest(this.sliderStops, val))),
    });
  }

  render() {
    const {fretMatrix, ...otherProps} = this.props
    const numFrets = fretMatrix[0].length

    return (
      <Board
        style={{paddingTop: UPPER_PADDING}}
        onLayout={ event => this.props.setFretboardDims({fbHeight: event.nativeEvent.layout.height})}>
        {cuerda(fretMatrix, this.flexArr, otherProps)}
        {this.props.appMode==='chord' && <Slider
          sliderLength={Dimensions.get('window').width-40}
          values={this.state.sliderValue}
          min={0}
          max={100}
          step={1}
          onValuesChangeFinish={this.sliderValuesChange}
          containerStyle={{ zIndex: 10, height: 15, paddingLeft: 30 , marginBottom: -13, marginLeft: 20}}
        />}
        <Positions flexArr={[widthCalc(numFrets, numFrets), ...this.flexArr]}/>
      </Board>
    )
  }
}

FretBoard.propTypes = {
  fretMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  onFretClick: PropTypes.func,
  theme: PropTypes.shape({}),
}
