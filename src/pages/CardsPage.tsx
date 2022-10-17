import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "components/Card";

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 50px;
  padding: 25px;
`;

const CardsPage = () => {
  const { slug }: { slug?: string } = useParams();

  return (
    <CardsContainer>{slug && <Card key={slug} slug={slug} />}</CardsContainer>
  );
};

export default CardsPage;
