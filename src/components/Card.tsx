import { useQuery } from "@apollo/client";
import { GET_CARD } from "helpers/queries";
import { useMemo } from "react";
import styled from "styled-components";

import CardType from "types/Card";
import CardContent from "components/CardContent";

type CardContainerProps = {
  $rarity: string;
};

const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  flex: 1 200px;
  flex-grow: 0;
  height: 323px;
  overflow: hidden;
  font-family: "Inter";
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 10px;

  ${(props) => {
    switch (props.$rarity) {
      case "limited":
        return `
          background: rgb(231, 174, 22);
          background: linear-gradient(
            0deg,
            rgba(231, 174, 22, 1) 0%,
            rgba(188, 137, 3, 1) 39%,
            rgba(241, 186, 38, 1) 100%
          );
          border: 3px solid rgba(231, 174, 22, 1);
          color: #111;
        `;
      case "rare":
        return `
          background: rgb(238, 42, 37);
          background: linear-gradient(
            0deg,
            rgba(238, 42, 37, 1) 0%,
            rgba(181, 19, 15, 1) 40%,
            rgba(252, 76, 72, 1) 100%
          );
          border: 3px solid rgba(238, 42, 37, 1);
          color: white;
        `;
      case "super_rare":
        return `
          background: rgb(32, 105, 224);
          background: linear-gradient(
            0deg,
            rgba(32, 105, 224, 1) 0%,
            rgba(12, 70, 163, 1) 40%,
            rgba(62, 131, 242, 1) 100%
          );
          border: 3px solid rgba(32, 105, 224, 1);
          color: white;
        `;
      case "unique":
        return `
          background: rgb(48, 48, 48);
          background: linear-gradient(
            0deg,
            rgba(48, 48, 48, 1) 0%,
            rgba(22, 22, 22, 1) 39%,
            rgba(75, 75, 75, 1) 100%
          );
          border: 3px solid rgba(48, 48, 48, 1);
          color: white;
        `;
      default:
        return `
          background: #eee;
          border: 3px solid #ddd;
          color: #333;
        `;
    }
  }}
`;

const CardImage = styled.img`
  position: absolute;
  top: 10%;
  z-index: 0;
  width: 100%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 80px,
    rgba(0, 0, 0, 0.4) 160px,
    transparent 175px
  );
`;

type CardProps = {
  slug: string;
};

const Card = ({ slug }: CardProps) => {
  const { error, data } = useQuery(GET_CARD, {
    variables: { slug },
  });
  const card: CardType = useMemo(() => data?.card, [data]);

  return (
    <CardContainer $rarity={card?.rarity}>
      {data && (
        <>
          <CardImage
            src={card.player.pictureUrl}
            alt={card.player.displayName}
          />
          <CardContent card={card} />
        </>
      )}
      {error && (
        <div style={{ marginTop: 100, textAlign: "center" }}>
          An error occured while trying to load this card.
        </div>
      )}
    </CardContainer>
  );
};

export default Card;
