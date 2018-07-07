import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, Text, View} from 'react-native'
import styled from 'styled-components/native'
import {animateLoop, interpolateFade, hexToRGBGray} from '../../../src/utils/bgFade'

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
    let { fret, text, onFretClick, flex, bgColor, highlighted, selected } = this.props
    let color = highlighted ? bgColor : hexToRGBGray(bgColor)

    return (
      <Outer
        flex={flex}
        onPress={()=>onFretClick(fret)}
        isNut={fret.loc.pos===0}
        >
        <View
          style={{backgroundColor: (selected && color) || `transparent`}} >
          <Content>{text}</Content>
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
