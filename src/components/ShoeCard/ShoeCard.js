import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const onSale = typeof salePrice === 'number'
  const variant = onSale
    ? 'on-sale'
    : isNewShoe(releaseDate)
    ? 'new-release'
    : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'default' ? null : variant === 'new-release' ? (
            <Flag variant={variant}>Just Released!</Flag>
          ) : (
            <Flag variant={variant}>Sale</Flag>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={onSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {typeof salePrice === 'number' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 18.75rem;
`

const Wrapper = styled.article``

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 100%;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`

const Price = styled.span`
  color: ${(props) => (!props.onSale ? COLORS.gray[900] : COLORS.gray[700])};
  text-decoration: ${(props) => (!props.onSale ? 'none' : 'line-through')};
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

const Flag = styled.div`
  background-color: ${(props) =>
    props.variant === 'new-release' ? COLORS.secondary : COLORS.primary};
  width: max-content;
  padding: 0.3rem;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  font-size: 0.875rem;
  color: white;
  position: absolute;
  right: 0px;
  bottom: 88.11%;
`

export default ShoeCard
