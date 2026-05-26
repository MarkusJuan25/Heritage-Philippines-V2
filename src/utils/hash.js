import argon2 from "argon2";

const ARGON_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
};

export function hashPassword(plain) {
  return argon2.hash(plain, ARGON_OPTIONS);
}

export function verifyPassword(hash, plain) {
  return argon2.verify(hash, plain);
}
