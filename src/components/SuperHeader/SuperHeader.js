import React from 'react'
import styled from 'styled-components'

import { COLORS } from '../../constants'

import SearchInput from '../SearchInput'
import UnstyledButton from '../UnstyledButton'
import Icon from '../Icon'

const SuperHeader = () => {
  return (
    <Wrapper>
      <MarketingMessage>
        Free shipping on domestic orders over $75!
      </MarketingMessage>
      <MenuWrapper>
        <SearchInput />
        <HelpLink href="/help">Help</HelpLink>
        <UnstyledButton>
          <Icon id="shopping-bag" strokeWidth={1} />
        </UnstyledButton>
      </MenuWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${COLORS.gray[300]};
  background-color: ${COLORS.gray[900]};
`

const MarketingMessage = styled.span`
  margin: 0.75rem auto 0.75rem 2rem;
  color: ${COLORS.white};
`

const HelpLink = styled.a`
  color: inherit;
  text-decoration: none;
  outline-offset: 2px;

  &:not(:focus-visible) {
    outline: none;
  }
`

const MenuWrapper = styled.div`
  display: flex;
  margin-right: 2rem;
  gap: 1.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`

export default SuperHeader
