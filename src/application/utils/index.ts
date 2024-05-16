import { monotonicFactory } from "ulid";

export const generateUniqueID = () => {
  return monotonicFactory()();
};
