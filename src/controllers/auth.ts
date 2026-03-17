import { Auth } from "../db/model";
import { addMinutes } from "date-fns/addMinutes";
import { getRandomNumber } from "../lib/getRandomNumber";
import { MailType, sendMail } from "../lib/sendMail";

type FindOrCreateAuthOptions = {
  email: string,
  userId: number,
  code: number,
  expires: Date
}

export async function findOrCreateAuth({ email, userId, code, expires }: FindOrCreateAuthOptions) { 
  const [newAuth,] = await Auth.findOrCreate({
    where: {
      email,
      isValid: true
    },
    defaults: {
      email,
      userId,
      code,
      expires
    }
  });

  return newAuth
}

export async function sendAuthToMail({ email, userId }: { email: string, userId: number }) { 
  const now = new Date();
  const expires = addMinutes(now, 10);
  const code = getRandomNumber(0, 9999)
  const auth = await findOrCreateAuth({
    email,
    code,
    expires,
    userId
  });
  sendMail({
    type: MailType.code,
    to: [email],
    code,
  });
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

