import * as React from 'react'
import * as styled from 'styled-components'

const Header = styled.h1`
  color: 'blue';
`

export class Hero extends React.PureComponent {
  render() {
    return <Header>Hello</Header>
  }
}
