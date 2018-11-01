import React, {Component} from 'react'
import { TouchableOpacity, Text} from 'react-native'
import { Row, Br } from '../styled'
import {Container, RightOptions, NavText} from '../styled/options'
import Selections from './Selections'
import Dimensions from 'Dimensions'
import { CheckBoxOptions } from './CheckBoxOptions'

export default class ChordOptions extends Component {

  variationNums = () => this.props.chordShapes.length
    ? (<Text>
        Variation <Br/>
        {this.props.variationIndex+1} of {this.props.chordShapes.length}
      </Text>)
    : (<Text> No Chord <Br/> Shapes! </Text>)

  // openStringCheckbox = () =>
  chordOptions = () =>
      <Row spaceAround>
        <TouchableOpacity onPress={()=>this.props.updateFilter({
          variationIndex: this.props.variationIndex - 1
        })} >
          <NavText>&larr;</NavText>
        </TouchableOpacity>
        {this.variationNums()}
        <TouchableOpacity onPress={()=>this.props.updateFilter({
          variationIndex: this.props.variationIndex + 1
        })} >
          <NavText>&rarr;</NavText>
        </TouchableOpacity>
      </Row>

  render() {
    const containerHeight = Dimensions.get('window').height - this.props.fbHeight;
    return (
      <Container height={containerHeight}>
        <Row flex>
          <Selections
            setChord={this.props.changeFretboard}
            height={containerHeight}
            tonic={this.props.tonic}
          />
          <RightOptions>
            {this.chordOptions()}
            <CheckBoxOptions {...this.props} />
          </RightOptions>
        </Row>
        {this.props.children}
      </Container>
    )
  }
}
