export type User = {
  name: string;
  email: string;
  role: "user" | "admin";
};

interface Price {
  size: string;
  price: string;
}
