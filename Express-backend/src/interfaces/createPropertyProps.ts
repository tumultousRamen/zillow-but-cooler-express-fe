import {
  PropertyType,
  BuildDate,
  KitchenType,
  BathroomType,
  LivingRoomType,
  ExteriorType,
  SellingTimeline,
  ReasonToSell,
  CurrentOccupancy,
  Status,
} from "../enums/propertyEnums";

export default interface createPropertyProps {
  seller_id: string;
  property_name: string;
  property_description: string;
  address: string;
  property_type: PropertyType;
  build_date: BuildDate;
  kitchen_type: KitchenType;
  bathroom_type: BathroomType;
  livingroom_type: LivingRoomType;
  exterior_type: ExteriorType;
  selling_timeline: SellingTimeline;
  reason_to_sell: ReasonToSell;
  bathrooms: number;
  bedrooms: number;
  current_occupancy: CurrentOccupancy;
  gated_community: boolean;
  pool: boolean;
  parking: boolean;
  image_url: string;
  price: string;
  status: Status;
}
