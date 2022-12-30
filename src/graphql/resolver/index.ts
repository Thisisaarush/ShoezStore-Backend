import { heroSliderController } from "../../mongodb/controllers/heroSlider.js";
import { recommendedController } from "../../mongodb/controllers/recommended.js";
import { trendingController } from "../../mongodb/controllers/trending.js";

let heroSliderData: {}[] = [];
let recommendedData: {}[] = [];
let trendingData: {}[] = [];

// resolving promises to access data from mongodb
// #1 heroSliders
heroSliderController()
  .then((res) => (heroSliderData = res))
  .catch((e) => console.log(`Cannot find heroSliders ${e}`));

// #2 recommended
recommendedController()
  .then((res) => (recommendedData = res))
  .catch((e) => console.log(`Cannot find recommended shoes data ${e}`));

// #3 trending
trendingController()
  .then((res) => (trendingData = res))
  .catch((e) => console.log(`Cannot find trending shoes data ${e}`));

export const resolvers = {
  Query: {
    heroSlider: () => heroSliderData,
    recommended: () => recommendedData,
    trending: () => trendingData,
  },
};
