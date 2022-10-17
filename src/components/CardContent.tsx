import { useMemo } from "react";
import styled from "styled-components";

import CardType from "types/Card";
import { Label, InfoBlock, InfoText } from "components/styles";

const CardContentContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-areas:
    "rarity . club"
    "name name name"
    "age position country";
  grid-template-rows: 140px auto 60px;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 0;
  box-sizing: border-box;
  justify-content: space-evenly;
`;

const Flag = styled.img`
  width: 14px;
  height: 14px;
  border: 1px solid white;
  border-radius: 100%;
`;

const Rarity = styled(InfoBlock)`
  grid-area: rarity;
`;

const Club = styled(InfoBlock)`
  grid-area: club;
  padding-left: 20px;
`;

const Name = styled(InfoBlock)`
  grid-area: name;
  align-self: center;
  padding: 0 40px;
  font-size: 1.6em;
`;

const Age = styled(InfoBlock)`
  grid-area: age;
`;
const Position = styled(InfoBlock)`
  grid-area: position;
`;
const Country = styled(InfoBlock)`
  grid-area: country;
`;

type CardContentProps = {
  card: CardType;
};

const CardContent = ({ card }: CardContentProps) => {
  const rarityString: string = useMemo(() => {
    switch (card.rarity) {
      case "limited":
        return `${card.serialNumber}/1000`;
      case "rare":
        return `${card.serialNumber}/100`;
      case "super_rare":
        return `${card.serialNumber}/10`;
      default:
        return card.rarity.replace("_", " ").toUpperCase();
    }
  }, [card]);

  return (
    <CardContentContainer>
      <Rarity>
        <Label>{card.season.name}</Label>
        <InfoText style={{ fontSize: ".5rem" }}>{rarityString}</InfoText>
      </Rarity>
      <Club>
        <img
          width={14}
          src={card.player.activeClub.pictureUrl}
          alt={card.player.activeClub.name}
        />
        <p style={{ margin: 0 }}>{card.player.shirtNumber.toString()}</p>
      </Club>
      <Name>{card.player.displayName}</Name>
      <Age>
        <Label style={{ marginBottom: 5 }}>AGE</Label>
        <InfoText>{card.age.toString()}</InfoText>
      </Age>
      <Position>
        <Label style={{ marginBottom: 5 }}>POSITION</Label>
        <InfoText>{card.position}</InfoText>
      </Position>
      <Country>
        <Label style={{ marginBottom: 5 }}>COUNTRY</Label>
        <Flag
          style={{ marginTop: 2 }}
          src={card.player.country.flagUrl}
          alt={card.player.country.code}
        />
      </Country>
    </CardContentContainer>
  );
};

export default CardContent;
