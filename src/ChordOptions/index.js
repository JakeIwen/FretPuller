import React, {Component} from 'react'
import { TouchableOpacity, Text} from 'react-native'
import { Row, Col, Br } from '../styled'
import {Container, RightOptions, NavText, OptionSection} from '../styled/options'
import Selections from './Selections'
import Slider from '@ptomasroos/react-native-multi-slider'
import { range } from 'lodash/fp'
import Dimensions from 'Dimensions'
import { CheckBoxOptions } from './CheckBoxOptions'

const widthCalc = (pos, fbWidth) =>
  ((Math.pow(2,(1/fbWidth)) - 1) / Math.pow(2,((pos+1)/fbWidth))) * 100 * 2

const numFrets = 13

const closest = (arr, val) => arr.reduce((prev, curr) =>
  Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev)

export default class ChordOptions extends Component {

  constructor(props) {
    super(props)//the +2 below is a deterministic offset. Can't figute out why its
    const sliderStops = [0, widthCalc(numFrets, numFrets)+2]
    let sum = sliderStops[1]
    sliderStops.push(...range(0, numFrets-1).map( n => {
      sum += widthCalc(n, numFrets)
      return sum
    } ))
    this.sliderStops = sliderStops
    this.state = {
      sliderValue: this.props.fretRange.map(fretNum => Math.floor(closest(sliderStops, 100*fretNum/numFrets))),
    }
    console.log('constructor props', props);

  }

  sliderValuesChange = (vals) => {
    const snappedVals = vals.map(val => closest(this.sliderStops, val))
    this.props.updateFilter({
      fretRange: snappedVals.map( (val) => this.sliderStops.indexOf(val))
    })
    this.setState({
      sliderValue: vals.map(val=>Math.floor(closest(this.sliderStops, val))),
    });
  }

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
      <Row>
        <Col spaceBetween>
          <Text>Max Fret Span</Text>
        </Col>
      </Row>
    </OptionSection>

  render() {
    const containerHeight = Dimensions.get('window').height - this.props.fbHeight;
    return (
      <Container height={containerHeight}>
        <Slider
          sliderLength={Dimensions.get('window').width-30}
          values={this.state.sliderValue}
          min={0}
          max={100}
          step={1}
          onValuesChangeFinish={this.sliderValuesChange}
          containerStyle={{ height: 15, paddingLeft: 30 }}
        />
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
