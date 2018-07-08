import React, {Component} from 'react'
import { TouchableOpacity, Text} from 'react-native'
import { Row, Br } from '../styled'
import {Container, RightOptions, NavText, OptionSection} from '../styled/options'
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
    <OptionSection spaceAround>
      <Row>
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
      {/* <Row>
        <Col spaceBetween>
          <Text>Max Fret Span</Text>
        </Col>
      </Row> */}
    </OptionSection>

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
