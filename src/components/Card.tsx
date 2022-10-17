import { useLazyQuery } from "@apollo/client";
import { GET_CARD } from "helpers/queries";
import { useMemo, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { BarLoader } from "react-spinners";

import CardType from "types/Card";
import CardContent from "components/CardContent";

const CardContainer = styled.div`
  flex: 1 200px;
  flex-grow: 0;
  height: 323px;
  position: relative;
`;

const CardFace = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0 0 4px rgb(0 0 0 / 40%);
`;

const CardVerso = styled(CardFace)`
  background: linear-gradient(45deg, rgb(71 126 223) 0%, rgb(52 90 193) 100%);
  border: 5px solid #6487d8;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const CardVersoPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.2;
  background-image: linear-gradient(
    to right,
    #ffffff,
    #ffffff 0px,
    transparent 15px,
    transparent
  );
  background-size: 10px 100%;
`;

type CardRectoProps = {
  $rarity: string;
};

const CardRecto = styled(CardFace)<CardRectoProps>`
  overflow: hidden;
  font-family: "Inter";
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 10px;
  border: 5px solid;

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
          border-color: rgba(231, 174, 22, 1);
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
          border-color: rgba(238, 42, 37, 1);
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
          border-color: rgba(32, 105, 224, 1);
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
          border-color: rgba(48, 48, 48, 1);
          color: white;
        `;
      default:
        return `
          background: #eee;
          border-color: #ddd;
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
  revealed: Boolean;
};

const Card = ({ slug, revealed }: CardProps) => {
  const [loadCard, { error, loading, data, called }] = useLazyQuery(GET_CARD, {
    variables: { slug },
  });
  const card: CardType = useMemo(() => data?.card, [data]);

  const { transform, opacity } = useSpring({
    opacity: revealed ? 1 : 0,
    transform: `perspective(400px) rotateY(${revealed ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (revealed && !called) loadCard();
  }, [revealed, loadCard, called]);

  return (
    <CardContainer>
      <CardVerso style={{ opacity: opacity.to((o) => 1 - o), transform }}>
        <CardVersoPattern />
      </CardVerso>
      <CardRecto
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        $rarity={card?.rarity}
      >
        {data && (
          <>
            <CardImage
              src={card.player.pictureUrl}
              alt={card.player.displayName}
            />
            <CardContent card={card} />
          </>
        )}
        {loading && (
          <div style={{ width: 100, margin: "100px auto 0" }}>
            <BarLoader color="#333333" />
          </div>
        )}
        {!loading && error && (
          <div style={{ marginTop: 100, textAlign: "center" }}>
            An error occured while trying to load this card.
          </div>
        )}
      </CardRecto>
    </CardContainer>
  );
};

export default Card;
