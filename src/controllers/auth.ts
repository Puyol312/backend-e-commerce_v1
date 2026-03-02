import { Auth } from "../db/model";
import { addMinutes } from "date-fns/addMinutes";
import { getRandomNumber } from "../lib/getRandomNumber";

type FindOrCreateAuthOptions = {
  email: string,
  userId: number,
  code: number,
  expired: Date
}

export async function findOrCreateAuth({ email, userId, code, expired }: FindOrCreateAuthOptions) { 
  const [newAuth,] = await Auth.findOrCreate({
    where: {
      email,
      isValid: true
    },
    defaults: {
      email,
      userId,
      code,
      expired
    }
  });

  return newAuth
}

export async function sendAuthToMail({ email, userId }: { email: string, userId: number }) { 
  const now = new Date();
  const expired = addMinutes(now, 20);
  const code = getRandomNumber(0, 9999)
  
  const auth = await findOrCreateAuth({
    email,
    code,
    expired,
    userId
  });

  // sendCode(email, code);
  return auth;
}

export async function validateAuthCode(
  { email, code }: { email: string; code: number }
): Promise<boolean> {

  const auth = await Auth.findOne({
    where: { email, isValid: true }
  });
  if (!auth) return false;
  const now = new Date();

  const isExpired = auth.get("expired") < now;
  const isCorrect = auth.get("code") === code;

  if (isExpired) {
    await auth.update({ isValid: false });
    return false;
  }
  if (!isCorrect) return false;

  await auth.update({ isValid: false });
  return true;
}

