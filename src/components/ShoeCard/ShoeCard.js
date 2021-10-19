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
          {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant === 'new-release' && <NewFlag>Just released!</NewFlag>}
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
          ) : undefined}
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
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  font-size: 0.875rem;
  color: white;
  position: absolute;
  top: 12px;
  right: -4px;
`

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`

export default ShoeCard
