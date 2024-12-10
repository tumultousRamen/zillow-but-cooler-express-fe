// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "email_address", type: "text" },
      { name: "password", type: "text" },
      { name: "role", type: "text" },
    ],
  },
  {
    name: "properties",
    columns: [
      { name: "price", type: "int" },
      { name: "address", type: "text" },
      { name: "property_description", type: "text" },
      { name: "property_image", type: "file[]" },
      { name: "seller_id", type: "text" },
      { name: "status", type: "text" },
      { name: "property_name", type: "text" },
      { name: "property_type", type: "text" },
      { name: "build_date", type: "text" },
      { name: "kitchen_type", type: "text" },
      { name: "bathroom_type", type: "text" },
      { name: "livingroom_type", type: "text" },
      { name: "exterior_type", type: "text" },
      { name: "selling_timeline", type: "text" },
      { name: "reason_to_sell", type: "text" },
      { name: "bathrooms", type: "int" },
      { name: "bedrooms", type: "int" },
      { name: "current_occupancy", type: "text" },
      { name: "gated_community", type: "bool" },
      { name: "pool", type: "bool" },
      { name: "parking", type: "bool" },
      { name: "image_url", type: "text" },
    ],
  },
  {
    name: "escrow",
    columns: [
      { name: "seller_id", type: "text" },
      { name: "property_id", type: "text" },
      { name: "buyer_id", type: "text" },
      { name: "property_price", type: "int" },
      { name: "payment_on_hold", type: "int" },
      { name: "payment_to_seller", type: "int" },
      { name: "status", type: "text" },
    ],
  },
  {
    name: "documents",
    columns: [
      { name: "status", type: "text" },
      { name: "file", type: "file", file: { defaultPublicAccess: true } },
      { name: "property_id", type: "text" },
      { name: "review_comments", type: "text" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Properties = InferredTypes["properties"];
export type PropertiesRecord = Properties & XataRecord;

export type Escrow = InferredTypes["escrow"];
export type EscrowRecord = Escrow & XataRecord;

export type Documents = InferredTypes["documents"];
export type DocumentsRecord = Documents & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  properties: PropertiesRecord;
  escrow: EscrowRecord;
  documents: DocumentsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Sushant-Kamble-s-workspace-7m8rvb.us-west-2.xata.sh/db/homekey",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
