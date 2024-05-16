import dotenv from "dotenv";
dotenv.config();

const getPort = (): string => {
  return (process.env.PORT as string) ?? "3000";
};

const getJSONLimit = (): string => {
  return process.env.JSON_LIMIT as string;
};

const getAllowedHeaders = (): string[] => {
  return (process.env.ALLOWED_HEADERS as string).split(",");
};

const getOrigins = (): string[] => {
  return (process.env.ORIGINS as string).split(",");
};

const getNodeEnv = (): string => {
  return process.env.NODE_ENV as string;
};

const getMongoURL = (): string => {
  return process.env.MONGODB_URL as string;
};

const getDatabaseName = (): string => {
  return process.env.DB_NAME as string;
};

const getJWTKey = (): string => {
  return process.env.JWT_KEY as string;
};

const getJWTISS = (): string => {
  return process.env.JWT_ISS as string;
};

const getJWTAud = (): string => {
  return process.env.JWT_AUD as string;
};

const getClientURL = (): string => {
  return process.env.CLIENT_URL as string;
};

const getMinAppVersion = (): number => {
  return Number(process.env.MIN_APP_VERSION);
};

export default {
  getAllowedHeaders,
  getJSONLimit,
  getJWTKey,
  getOrigins,
  getClientURL,
  getPort,
  getJWTAud,
  getJWTISS,
  getMongoURL,
  getDatabaseName,
  getNodeEnv,
  getMinAppVersion,
};
