import JWTPayload from "../../entities/interfaces/JWTPayload";

export interface JWTGeneratorInterface {
  generate(payload: JWTPayload): string;
  verify(token: string): JWTPayload;
}

export interface HasherInterface {
  hash(data: string): Promise<string>;
  verify(data: string, hash: string): Promise<boolean>;
}
