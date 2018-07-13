import React, {Component} from 'react'
import { TouchableOpacity} from 'react-native'
import { Row, Br, Txt} from '../styled'
import {Container, RightOptions, NavText} from '../styled/options'
import Selections from './Selections'
import Dimensions from 'Dimensions'
import { CheckBoxOptions } from './CheckBoxOptions'

export default class ChordOptions extends Component {

  variationNums = () => this.props.chordShapes.length
    ? (<Txt  size={14} center>
        Variation <Br/>
        {this.props.variationIndex+1} of {this.props.chordShapes.length}
      </Txt>)
    : (<Txt size={14} center> No Chord <Br/> Shapes! </Txt>)

  // openStringCheckbox = () =>
  variations = () =>
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

    maxSpan = () =>
      <Row spaceAround>
        <TouchableOpacity onPress={()=>this.props.updateFilter({
          maxFretSpan: this.props.maxFretSpan - 1
        })} >
          <NavText>&larr;</NavText>
        </TouchableOpacity>
        <Txt size={14} center>{'Max Fret Span'}<Br/>
        {this.props.maxFretSpan}</Txt>
        <TouchableOpacity onPress={()=>this.props.updateFilter({
          maxFretSpan: this.props.maxFretSpan + 1
        })} >
          <NavText>&rarr;</NavText>
        </TouchableOpacity>
      </Row>

  render() {
    const containerHeight = Dimensions.get('window').height - this.props.fbHeight;
    return (
      <Container height={containerHeight}>
        <Row flex>
          <Selections {...this.props}
            setChord={this.props.changeFretboard}
            containerHeight={containerHeight}
            tonic={this.props.tonic}
            highlightNotes={this.props.highlightNotes}
          />
          <RightOptions>
            <Row>
              {this.variations()}
              {this.maxSpan()}
            </Row>
            <CheckBoxOptions {...this.props} />
          </RightOptions>
        </Row>
        {this.props.children}
      </Container>
    )
  }
}
