import { heroSliderController } from "../../mongodb/controllers/heroSlider.js";

let heroSliderData: {}[] = [];

// resolving promises to access data from mongodb
heroSliderController()
  .then((res) => (heroSliderData = res))
  .catch((e) => console.log(`Cannot find heroSliders ${e}`));

export const resolvers = {
  Query: {
    heroSlider: () => heroSliderData,
  },
};
