import React, {Component} from 'react'
import styled from "styled-components/native"
import { Chord } from 'tonal'
import { Picker } from 'react-native-wheel-datepicker'
import RadioSelect from './RadioSelect'
import MultiSelect from './MultiSelect'
import {TouchableOpacity, Text} from 'react-native'

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  ${'' /* align-items: flex-end; */}
`

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${'' /* width: 25%; */}
`

const SelectChord = styled.View`
  display: flex;
  flex-direction: row;
  width: 25%;
`
const SelectedChord = styled.Text`
  font-size: 30;
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
const mainTypes = ['#', 'b', 'M', 'm', '7', '9', '11']
const extensions = ['add2', 'add4', 'add9', 'sus2', 'sus4']
const sf = ['\u266F', '', '\u266D']
export default class Options extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tonic: 'C',
      type: [],
      extension: [],
      // mainTypes2: [],
      chord: 'C',
      sChord: 'CM',
      sf: '',
    }
    this.props.setChord('CM')
  }


  setChord = ({tonic, sf, type, extension}) => {
    let readableChord = ''
    let typeArr = type ? type : this.state.type
    let extArr = extension ? extension : this.state.extension
    tonic = tonic || this.state.tonic
    sf = sf || this.state.sf || ''
    let found = this.findChord({tonic, sf, typeArr, extArr})
    if (typeArr.length===1 && (typeArr.includes('M') || typeArr.includes('m'))) {
      readableChord = found.replace('M', 'Maj').replace('m', 'min')
    }
    this.setState({
      tonic,
      chord: readableChord || found,
      type: typeArr,
      sChord: found,
      extension: extArr,
    })
    this.props.setChord(found)
  }

  findChord = ({tonic, sf, typeArr, extArr }) => {
    let usedChars = []
    let permArr = []
    majTypes = typeArr.length ? typeArr : ['M']
    let input = majTypes.concat(extArr)
    let perMutes = permute(input)
    for (var i = 0; i < perMutes.length; i++) {
      searchableName = tonic + sf + perMutes[i].join('')
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
          permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr
    }
  }

  render() {
    let supersets = Chord.supersets(this.state.sChord).map(superset=>superset.replace(this.state.sChord, '')).concat(this.state.extension).reverse()
    return (
      <Container>
        <SelectChord>
          <RadioSelect
            options={tonics}
            selectedOption={this.state.tonic}
            onValueChange={tonic => this.setChord({tonic})}
          />
          <MultiSelect
            options={mainTypes}
            selectedOptions={this.state.type}
            onValueChange={type => this.setChord({type})}
          />
          <MultiSelect
            options={supersets}
            selectedOptions={this.state.extension}
            onValueChange={extension => this.setChord({extension})}
            flex={2}
          />

        </SelectChord>
        <Wrapper>
          <SelectedChord>{this.state.chord}</SelectedChord>
        </Wrapper>
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

// const mainTypes = Chord.mainTypes()
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
