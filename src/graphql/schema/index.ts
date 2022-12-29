export const typeDefs = `#graphql
  type HeroSlider {
    uri: String
  }
  type Query {
    heroSlider: [HeroSlider]
  }
`;
