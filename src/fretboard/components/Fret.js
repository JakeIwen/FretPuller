import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View} from 'react-native'
import styled from 'styled-components/native'
import {hexToRGBGray} from '../../../src/utils/bgFade'
import {accFormat} from '../../../src/utils/format'

const Outer = styled(TouchableOpacity)`
  flex: ${props => props.flex};
  border: 1px solid gray;
  borderRightWidth: ${props => props.isNut ? '10px' : '1px'};
  margin: -1px;
`
const Content = styled.Text`
  text-align: center;
  overflow: hidden;
`
export default class Fret extends Component {

  render() {
    const { fret, text, onFretClick, flex, bgColor, highlighted, selected } = this.props
    const color = highlighted ? bgColor : hexToRGBGray(bgColor)

    return (
      <Outer
        flex={flex}
        onPress={()=>onFretClick(fret)}
        isNut={fret.loc.pos===0}
        >
        <View
          style={{backgroundColor: (selected && color) || `transparent`}} >
          <Content>{accFormat(text)}</Content>
        </View>
      </Outer>
    )
  }
}

Fret.propTypes = {
  fret: PropTypes.shape({}).isRequired,
  flex: PropTypes.number.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
