import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from 'tonal'
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
// import { permute } from './utils'
import {TouchableOpacity, Text} from 'react-native'
import ChordInfo from './ChordInfo'
import {TuningActivate} from './TuningActivate'

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  background-color: #FDF3E7;
`

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const SelectChord = styled.View`
  display: flex;
  flex-direction: row;
  width: 25%;
`
const NavText = styled.Text`
  font-size: 26;
`
const Nav = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`
const tonics = ["C", "D", "E", "F", "G", "A", "B"]
const typeList = ['#','b','M','m','7', '9', '11']
const typeListV = ['\u266D','\u266F','Maj','min', '7', '9', '11']
const extensionList = ['add2', 'add4', 'add9', 'sus2', 'sus4']

export default class Options extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      types: ['M'],
      extensions: [],
      chord: 'CM',
    }
  }

  setChord = ({tonic, types, extensions}) => {
    let typeArr = types ? types : this.state.types
    let extArr = extensions ? extensions : this.state.extensions
    tonic = tonic || this.state.tonic
    let found = this.findChord({tonic, typeArr, extArr})
    this.setState({
      tonic,
      chord: found,
      types: typeArr,
      extensions: extArr,
    })
    console.log('st', this.state);
    found!=='unknown' && this.props.setChord(found)
  }

  findChord = ({tonic, typeArr, extArr }) => {
    let usedChars = []
    let permArr = []
    let permuteInput = typeArr.concat(extArr)
    console.log({permuteInput});
    let perMutes = permute(permuteInput)
    console.log({perMutes});
    for (var i = 0; i < perMutes.length; i++) {
      let searchableName = tonic + perMutes[i]
      if (Chord.exists(searchableName))
        return searchableName
    }
    return 'unknown'

    function permute(input) {

      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length === 0) {
          permArr.push(usedChars.slice().join(''));
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr
    }
  }

  render() {
    let {types, extensions, chord, tonic } = this.state
    let supersets = Chord.supersets(chord).map( superset => {
      types.forEach( type => {superset = superset.replace(type, '')})
      return superset
    }).concat(extensions).reverse()


    return (
      <Container>
        <SelectChord>
          <RadioSelect
            options={tonics}
            selectedOption={tonic}
            onValueChange={tonic => this.setChord({tonic})}
          />
          <MultiSelect
            options={typeList}
            selectedOptions={types}
            onValueChange={newTypes => this.setChord({types: newTypes})}
          />
          <MultiSelect
            options={supersets}
            selectedOptions={extensions}
            onValueChange={extensions => this.setChord({extensions})}
            flex={2}
          />

        </SelectChord>
        <ChordInfo chord={chord} />
        <Wrapper>
          <Text>{this.props.variationIndex+1} of {this.props.numVariations}</Text>
          <Nav>
            <TouchableOpacity
              onPress={()=>this.props.newVariation()}
            ><NavText>Next</NavText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.showAll}
            ><NavText>Show All</NavText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.props.newVariation(true)}
            ><NavText>Prev</NavText>
            </TouchableOpacity>
          </Nav>
          <TuningActivate
            activate={()=>this.props.editTuning()}
            tuning={this.props.tuning} />
        </Wrapper>
      </Container>
    )
  }
}

// function combinations(str) {
//     var fn = function(active, rest, a) {
//         if (!active && !rest)
//             return;
//         if (!rest) {
//             a.push(active);
//         } else {
//             fn(active + rest[0], rest.slice(1), a);
//             fn(active, rest.slice(1), a);
//         }
//         return a;
//     }
//     return fn("", str, []);
// }

// const typeList = Chord.typeList()
// const rotate = (array, val) => {
//   let result = [...array].reverse
//   console.log("before:", result);
//   let i = 0
//   while(result.indexOf(val)!==5 && i<100) {
//     result.unshift(result.pop())
//     i++
//   }
//   console.log("after:", result);
//
//   return result
// }
