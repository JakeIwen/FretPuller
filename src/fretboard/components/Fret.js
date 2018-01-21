import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Note } from '/src/lib/tonal.min.js'
import {Animated, Easing, TouchableOpacity, Text, View} from 'react-native'
import styled from 'styled-components/native'
import {keyframes} from 'styled-components'
// import { fadeIn } from 'react-animations'
console.log({styled, keyframes, fadeIn});

let fadeObj = {
  from: {
    backgroundColor: 'red'
  },

  to: {
    backgroundColor: 'green'
  }
}
const fadeIn = keyframes`
  ${fadeObj}
`;

const Outer = styled(TouchableOpacity)`
  flex: ${props => props.flex};

`
const Inner = styled.View`
  ${'' /* background-color: ${props => props.bgColor || 'transparent'}; */}
  background-color: ${props => props.bgColor || 'green'};
  ${'' /* border: ${props => props.highlight ? '3px solid black'
                                     : '1px solid gray' };
  // margin: ${props => props.highlight ? '-3px' : '-1px'}; */}
  ${'' /* animation: 5s ${fadeIn} linear; */}

`
const Content = styled.Text`
  text-align: center;
  overflow: hidden;
`




export default class Fret extends Component {

  constructor(props) {
    super();
    this.state = {
      x: props.selected && props.showAsDefault && new Animated.Value(0),
      onRight: false,
    };
  }
  componentDidMount() {
    this.state.x && Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.x, {
          toValue: 100,
          duration: 500,
          delay: 1000
        }),
        Animated.timing(this.state.x, {
          toValue: 0,
          duration: 500
        })
      ]),
      {
        iterations: 4
      }
    ).start()
  }

  render() {
    let { fret, text, onFretClick, flex, bgColor, showAsDefault, selected } = this.props
    let {crd, pos} = fret.loc
    let displayText = pos===0
      ? Note.fromMidi(fret.midi).slice(0,-1)
      : text

      var color = this.state.x
        ? this.state.x.interpolate({
          inputRange: [0, 100],
          outputRange: ['rgba(255,255,255, 1)', 'rgba(51,16,177, 1)'],
        })
        : 'transparent'

    return (
      <Outer flex={flex} onPress={()=>onFretClick(fret)} >
        {/* <Inner
          bgColor={showAsDefault && this.state.x}
          highlight={selected}
        > */}
          <Animated.View style={{backgroundColor: color}} >
          <Content>{displayText}</Content>
        </Animated.View>
      </Outer>
    )
  }
}

Fret.propTypes = {
  fret: PropTypes.shape({}).isRequired,
  flex: PropTypes.number.isRequired,
  onFretClick: PropTypes.func.isRequired,
}
