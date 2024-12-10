export default interface registerUserProps {
  email_address: string;
  password: string;
  role: "seller" | "buyer" | "fsh";
}
