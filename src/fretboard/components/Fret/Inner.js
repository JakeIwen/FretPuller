import styled from 'styled-components/native'


export const backgroundColor = ({ status, showOctaves, oct, theme }) => {
  return (
    status === 'unselected' && showOctaves
      ? theme.octaveMap[oct]
      : theme.statusMap[status]
  )
}

export default styled.View`
  background-color: ${props => (props.selected && props.bgColor) ? props.bgColor : 'transparent'};
  ${'' /* border-radius: 3px; */}
  border: 1px solid gray;
`
