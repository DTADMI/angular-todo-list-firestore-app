import {SignInUser} from "./sign-in";

export interface User extends SignInUser{
  id?: string;
  name: string;
}
