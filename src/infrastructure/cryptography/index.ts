import BcryptHasher from "./hasher/bcrypt";
import JWTGenerator from "./tokenGenerator/jwt";

const defaultTokenGenerator = JWTGenerator;
const defaultHasher = BcryptHasher;

export default { defaultHasher, defaultTokenGenerator };
