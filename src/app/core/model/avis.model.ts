import { Jeux } from "./jeux.model";
import { User } from "./user.model";

export interface Avis {
  id: number;
  contenu: string;
  user: User;
  jeux: Jeux;
}
