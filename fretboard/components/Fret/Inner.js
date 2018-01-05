import styled from 'styled-components/native'


export const backgroundColor = ({ status, showOctaves, chordMode, selectionText, oct, theme }) => {
  if (chordMode) {
    return theme.intervalMap(selectionText)
  }
  return (
    status === 'unselected' && showOctaves
      ? theme.octaveMap[oct]
      : theme.statusMap[status]
  )
}

export default styled.View`
  background-color: ${props => backgroundColor(props)};
  border-radius: 3px;
  border: 1px solid gray;
`
