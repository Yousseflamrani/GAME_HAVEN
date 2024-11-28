export interface Jeux {
  id: number;
  nom: string;
  reference: number;
  category: {
    id: number;
    name: string;
  };
  image: string;
  description: string;
  prix: number;
  note: number;
  quantite: number;
  "etat": string
  dateAjout: Date;
}
