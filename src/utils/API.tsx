import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSatellite: function (query: string) {
    return axios.get(
      `https://celestrak.com/NORAD/elements/gp.php?FORMAT=json&CATNR=${query}`
    );
  },
};