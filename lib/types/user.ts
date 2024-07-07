import Role from "./role";

export default interface User {
  id: string;
  name: string;
  role: Role;
}
