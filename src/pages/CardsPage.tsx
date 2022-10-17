import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "components/Card";

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 50px;
  padding: 25px;
`;

const CardsPage = () => {
  const { slugs }: { slugs?: string } = useParams();

  const slugsArray: Array<string> = useMemo(
    () => slugs?.split(",") ?? [],
    [slugs]
  );

  return (
    <CardsContainer>
      {slugsArray?.map((slug) => (
        <Card key={slug} slug={slug} />
      ))}
      {!slugsArray.length && <p>No slugs are specified in the URL</p>}
    </CardsContainer>
  );
};

export default CardsPage;
