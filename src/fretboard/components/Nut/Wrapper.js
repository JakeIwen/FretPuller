import styled from 'styled-components/native'

export default styled.View`
  background-color: ${props => (props.visible ? 'gray' : 'transparent')};
  border: 1px solid ${props => (props.visible ? 'gray' : 'transparent')};
  border-radius: 3px;`
