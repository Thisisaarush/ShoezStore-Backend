export const typeDefs = `#graphql
  type HeroSlider {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Recommended {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Trending {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Category {
    name: String
    uri: String
    price: Int
    sizes: [Int]
    category: String
    color: String
    tag: String
    brand: String
  }

  type Query {
    heroSlider: [HeroSlider]
    recommended: [Recommended]
    trending: [Trending]
    category: [Category]
  }
`;
