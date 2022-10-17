import { gql } from "@apollo/client";

const GET_CARD = gql`
  query card($slug: String!) {
    card(slug: $slug) {
      age
      position
      rarity
      serialNumber
      season {
        name
      }
      player {
        displayName
        shirtNumber
        pictureUrl
        country {
          code
          flagUrl
        }
        activeClub {
          name
          pictureUrl
        }
      }
    }
  }
`;

export { GET_CARD };
