import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reverse, merge, range } from 'lodash/fp'
import defaultTheme from '../themes'
import { Row } from '/src/styled'
import { ThemeProvider } from 'styled-components'
import Positions from './Positions'
import styled from 'styled-components/native'
import String from './String'

const defaultSettings = {
  showNotes: false,
  showOctaves: false,
  showPositions: true,
  showNut: true,
}

const widthCalc = (pos, fbWidth) =>
  ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2

const Board = styled.View`
  width: 100%;
`

export default class Fretboard extends Component {
  constructor(props){
    super()
    this.state = {
      stringActive: []
    }
  }

  render() {
    let {fretMatrix, ...otherProps} = this.props
    const mergedTheme = merge(defaultTheme, otherProps.theme)
    const numFrets = fretMatrix[0].length
    let flexArr = [
      widthCalc(numFrets, numFrets),
      ...range(0, numFrets-1).map( n => widthCalc(n, numFrets) )
    ]

    const cuerda = reverse(fretMatrix).map((crd,i) =>
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

    return (
      <ThemeProvider theme={mergedTheme}>
        <Board
          onLayout={ event =>
            this.props.setFretboardDims({
              fbHeight: event.nativeEvent.layout.height
            })
          }>
          <Positions flexArr={flexArr}/>
          {cuerda}
        </Board>
      </ThemeProvider>
    )
  }
}

Fretboard.propTypes = {
  fretMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  onFretClick: PropTypes.func,
  theme: PropTypes.shape({}),
}
