import bcrypt from "bcryptjs";
import { HasherInterface } from "../types";

export default class BcryptHasher implements HasherInterface {
  private salt = 10;

  async hash(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, this.salt);
    return hash;
  }

  async verify(data: string, hash: string): Promise<boolean> {
    const success = await bcrypt.compare(data, hash);
    return success;
  }
}
