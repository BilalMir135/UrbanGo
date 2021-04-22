import * as bcrypt from 'bcrypt';

export const hashingPass = async (pass: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(pass, salt);
  return hash as string;
};

export const verifyPass = async (pass: string, hash: string) => {
  const verified = await bcrypt.compare(pass, hash);
  return verified as boolean;
};
