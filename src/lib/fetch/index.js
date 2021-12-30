import axiosFetch from "./axiosFetch";

export default async (config) => {
  try {
    const res = await axiosFetch(config);
    return res;
  } catch (e) {
    throw e;
  }
};
