import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash/fp'
import styled from 'styled-components/native'
import Nut from './Nut'
import { Row } from 'react-native-table-component'

const Position = styled.Text`
  text-align: center;
`

const positions = ['open', '', '', 'III', '', 'V', '', 'VII', '', '', 'X', '',
  'XII', '', '', 'XV', '', 'XVII', '', 'IXX']

// <Nut visible={false} />

const Positions = ({ flexArr }) =>
    <Row
    flexArr={flexArr}
    data={flexArr.map((pos, i) =>
      <Position key={`pos-${i}`}>{positions[i]}</Position>
    )}
  />

Positions.propTypes = {
  flexArr: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Positions
