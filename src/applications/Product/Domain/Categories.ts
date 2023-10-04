export type Category = {
  id: string;
  image: string;
  name: string;
};

export type ProductCategory =
  | "drinks"
  | "fruits"
  | "breadncakes"
  | "condiments"
  | "spices"
  | "frozen"
  | "patries"
  | "sweets"
  | "sauces"
  | "cooking"
  | "preparedPlats"
  | "conserves"
  | "others";
