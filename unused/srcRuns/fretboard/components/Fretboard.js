import React from 'react'
import PropTypes from 'prop-types'
import { reverse, range } from 'lodash/fp'
import Positions from './Positions'
import styled from 'styled-components/native'
import String from './String'

const widthCalc = (pos, fbWidth) =>{
  return ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2
}

const Board = styled.View`
  width: 100%;
`
const cuerda = (fretMatrix, flexArr, otherProps) =>
  reverse(fretMatrix).map((crd,i) =>
    <String
      key={`string-${i}`}
      stringNum={i}
      frets={crd}
      flexArr={flexArr}
      selectionArr={reverse(otherProps.selectionMatrix)[i]}
      colorArr={otherProps.colorArr}
      onFretClick={otherProps.onFretClick}
      activeStrings={reverse(otherProps.activeStrings)}
      defaultMatrix={reverse(otherProps.defaultMatrix)[i] || []}
      fretFilter={otherProps.fretFilter}
    />
  )

export const Fretboard = (props) => {
  let {fretMatrix, ...otherProps} =  props
  const numFrets = fretMatrix[0].length
  let flexArr = [
    widthCalc(numFrets, numFrets),
    ...range(0, numFrets-1).map( n => widthCalc(n, numFrets) )
  ]

  return (
    <Board
      onLayout={ event => props.setFretboardDims({fbHeight: event.nativeEvent.layout.height})}>
      <Positions flexArr={[widthCalc(numFrets, numFrets), ...flexArr]}/>
      {cuerda(fretMatrix, flexArr, otherProps)}
    </Board>
  )
}

Fretboard.propTypes = {
  fretMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  onFretClick: PropTypes.func,
  theme: PropTypes.shape({}),
}
