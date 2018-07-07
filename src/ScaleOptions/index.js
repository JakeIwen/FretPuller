import React, {Component} from 'react'
import { Row } from '../styled'
import { Container, RightOptions } from '../styled/options'
import Selections from './Selections'
import Dimensions from 'Dimensions'


export default class ScaleOptions extends Component {
  render() {
    return (
      <Container height={Dimensions.get('window').height - this.props.fbHeight}>
        <Row flex>
          <Selections {...this.props} />
          <RightOptions>
            {this.props.children}
          </RightOptions>
        </Row>
      </Container>
    )
  }
}
