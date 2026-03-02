import { User } from "../db/model";

enum UserRole {
  Buyer,
  Seller
}
type UserParams = {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

export async function findOrCreateNewUser(params: UserParams) {
  const username = params.firstName ?? params.email.split("@")[0];
  const [user, created] = await User.findOrCreate({
    where: { email: params.email },
    defaults: {
      email: params.email,
      firstName: username,
      role: params.role,
    },
  });

  return user.get("id") as number;
}
export async function findUserById(userId: number):Promise<User> {
  const user = await User.findByPk(userId);
  if (!user) {
    return null  
  }
  return user;
}
export async function findUserByEmail(email:string):Promise<User> {
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) { 
    return null;
  }
  return user;
}