import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash/fp'
import styled from 'styled-components/native'
import Nut from './Nut'
import  Row  from 'react-native-row'

const PosText = styled.Text`
  text-align: center;
  font-family: Menlo;
  flex: ${props => props.flex}
`

const positions = ['', '', '', 'III', '', 'V', '', 'VII', '', '', 'X', '',
  'XII', '', '', 'XV', '', 'XVII', '', 'IXX']

// <Nut visible={false} />

const Positions = ({ flexArr }) =>
  <Row dial={5} >
    {flexArr.map((pos, i) =>
      <PosText flex={flexArr[i]} key={`pos-${i}`}>
        {positions[i]}
      </PosText>
    )}
  </Row>

Positions.propTypes = {
  flexArr: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Positions
