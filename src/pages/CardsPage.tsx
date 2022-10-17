import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "components/Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 50px;
  padding: 25px;
`;

const RevealButton = styled.button`
  margin: 20px auto;
  padding: 5px 10px;
  border: 2px solid #141414;
  border-radius: 3px;
  color: #141414;
  cursor: pointer;
  transition: background-color 0.4s;
  &:hover {
    color: white;
    background-color: #141414;
  }
`;

const CardsPage = () => {
  const [revealed, setRevealed] = useState(false);
  const { slugs }: { slugs?: string } = useParams();

  const slugsArray: Array<string> = useMemo(
    () => slugs?.split(",") ?? [],
    [slugs]
  );

  return (
    <Container>
      {!!slugsArray.length && (
        <RevealButton onClick={() => setRevealed(!revealed)}>
          {!revealed ? "Reveal cards" : "Hide cards"}
        </RevealButton>
      )}
      <CardsContainer>
        {slugsArray?.map((slug) => (
          <Card key={slug} slug={slug} revealed={revealed} />
        ))}
        {!slugsArray.length && <p>No slugs are specified in the URL</p>}
      </CardsContainer>
    </Container>
  );
};

export default CardsPage;
