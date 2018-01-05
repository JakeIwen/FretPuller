/* eslint-disable import/no-unresolved */
import React from 'react'
import PropTypes from 'prop-types'
import { reverse, merge } from 'lodash/fp'
import defaultTheme from '../themes'
import  Row  from 'react-native-row'
import { ThemeProvider } from 'styled-components'
import Positions from './Positions'
import styled from 'styled-components/native'
import Fret from './Fret'

const defaultSettings = {
  showNotes: false,
  showOctaves: false,
  showPositions: true,
  showNut: true,
}

export const widthCalc = (pos, fbWidth) =>
  ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2

const Board =  styled.View`
  width: 100%;
`

const Fretboard = ({fretMatrix, ...otherProps}) => {
  const mergedTheme = merge(defaultTheme, otherProps.theme)
  const mergedSettings = merge(defaultSettings, otherProps.settings)
  const width = fretMatrix[0].length

  let flexArr = fretMatrix[0].map((item,i)=>widthCalc(i,width))
  flexArr.pop()
  flexArr.unshift(flexArr[0]/4)

  const cuerda = reverse(fretMatrix).map((crd,i) =>
    <Row dial={5} key={i}>{crd.map((fret, j) =>
      <Fret
        key={`fret-${j}`}
        flex={flexArr[j]}
        fret={fret}
        {...otherProps}
      />
    )}</Row>
  )

  return (
    <ThemeProvider theme={mergedTheme}>
      <Board>
        {cuerda}
        {mergedSettings.showPositions ? <Positions flexArr={flexArr}/> : null }
      </Board>
    </ThemeProvider>
  )
}

Fretboard.propTypes = {
  fretMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  settings: PropTypes.shape({}),
  isClickable: PropTypes.bool,
  onFretClick: PropTypes.func,
  theme: PropTypes.shape({}),
}

export default Fretboard
