export default interface responsePayloadProps {
  status: "success" | "error";
  message: string;
  data: object;
}
