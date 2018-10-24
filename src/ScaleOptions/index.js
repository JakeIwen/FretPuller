import React, {Component} from 'react'
import { Row, FpCheckBox } from '../styled'
import { Scale } from '../lib/tonal.min.js'
import { Container, RightOptions } from '../styled/options'
import Selections from './Selections'
import Dimensions from 'Dimensions'


export default class ScaleOptions extends Component {
  isThisExt = (propName) => this.props.scale.includes(' ' + propName)
  newExt = (propName) => this.isThisExt(propName)
    ? this.props.scale.replace(' ' + propName, '')
    : this.props.scale + ' ' + propName

  isThisPre = (propName) => this.props.scale.includes(propName + ' ')
  newPre = (propName) => this.isThisPre(propName)
    ? this.props.scale.replace(propName + ' ', '')
    : propName + ' ' + this.props.scale


  render() {
    const containerHeight = Dimensions.get('window').height - this.props.fbHeight;
    return (
      <Container height={containerHeight}>
        <Row flex>
          <Selections
            {...this.props}
            containerHeight={containerHeight}
          />
          <RightOptions style={{paddingTop: 10}}>
            <FpCheckBox
              label='Pentatonic'
              disabled={!Scale.exists(this.newExt('pentatonic'))}
              onChange={() => this.props.setScale({scale: this.newExt('pentatonic')})}
              checked={this.isThisExt('pentatonic')}
            />
            <FpCheckBox
              label='Blues'
              disabled={!Scale.exists(this.newExt('blues'))}
              onChange={() => this.props.setScale({scale: this.newExt('blues')})}
              checked={this.isThisExt('blues')}
            />
            <FpCheckBox
              label='Harmonic'
              disabled={!Scale.exists(this.newPre('harmonic'))}
              onChange={() => this.props.setScale({scale: this.newPre('harmonic')})}
              checked={this.isThisPre('harmonic')}
            />
            <FpCheckBox
              label='Melodic'
              disabled={!Scale.exists(this.newPre('melodic'))}
              onChange={() => this.props.setScale({scale: this.newPre('melodic')})}
              checked={this.isThisPre('melodic')}
            />

            {this.props.children}
          </RightOptions>
        </Row>
      </Container>
    )
  }
}

const getQBConfig = ({realm, appToken}) => ({realm, ...appToken && {appToken}})
