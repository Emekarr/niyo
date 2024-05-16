import mongo from "./mongo";

export const initiateDBConnection = async () => {
  await mongo.connect();
};

export const closeDBConnection = async () => {
  await mongo.disconnect();
};
