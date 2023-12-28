import {User} from "./user";

export interface SignUpUser extends User {
  confirmPassword: string;
}
