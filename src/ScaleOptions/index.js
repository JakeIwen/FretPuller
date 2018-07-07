import React, {Component} from 'react'
import styled from "styled-components/native"
import { Row } from '../styled'
import { Container, RightOptions } from '../styled/options'
import Selections from './Selections'
import { range } from 'lodash/fp'
import Dimensions from 'Dimensions'


export default class ScaleOptions extends Component {

  constructor(props) {
    super(props)

    console.log('constructor props', props);

  }
  render() {
    return (
      <Container height={Dimensions.get('window').height - this.props.fbHeight}>
        <Row flex>
          <Selections {...this.props} />
          <RightOptions>
            {/* {this.props.children} */}
          </RightOptions>
        </Row>
        {/* {this.props.children} */}
      </Container>
    )
  }
}
