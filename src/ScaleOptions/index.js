import React, {Component} from 'react'
import { Row } from '../styled'
import { Container, RightOptions } from '../styled/options'
import Selections from './Selections'
import Dimensions from 'Dimensions'


export default class ScaleOptions extends Component {
  render() {
    const containerHeight = Dimensions.get('window').height - this.props.fbHeight;
    return (
      <Container height={containerHeight}>
        <Row flex>
          <Selections
            {...this.props}
            containerHeight={containerHeight}
          />
          <RightOptions>
            {this.props.children}
          </RightOptions>
        </Row>
      </Container>
    )
  }
}
