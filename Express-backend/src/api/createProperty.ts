require("dotenv").config();
import express, { Request, Response } from "express";
import { XataClient } from "../xata";

// Interfaces
import responsePayloadProps from "../interfaces/responsePayloadProps";
import createPropertyProps from "../interfaces/createPropertyProps";

// Enums
import * as propertyEnums from "../enums/propertyEnums";

const router = express.Router();

router.post(
  "/",
  async (
    req: Request<createPropertyProps>,
    res: Response<responsePayloadProps>
  ) => {
    const xata = new XataClient({
      apiKey: process.env.XATA_API_KEY,
      branch: process.env.XATA_BRANCH,
    });

    // Request Payload
    const requestPayload = req.body as createPropertyProps;

    try {
      // Check if the property is already present
      const propertyExists = await xata.db.properties
        .filter({ address: requestPayload.address })
        .getFirst();
      if (propertyExists) {
        res.status(500).json({
          status: "error",
          message: "property already present",
          data: {},
        });
        return;
      }

      // create property
      const property = await xata.db.properties.create({
        seller_id: requestPayload.seller_id,
        property_name: requestPayload.property_name,
        property_description: requestPayload.property_description,
        address: requestPayload.address,
        property_type: requestPayload.property_type,
        build_date: requestPayload.build_date,
        kitchen_type: requestPayload.kitchen_type,
        bathroom_type: requestPayload.bathroom_type,
        livingroom_type: requestPayload.livingroom_type,
        exterior_type: requestPayload.exterior_type,
        selling_timeline: requestPayload.selling_timeline,
        reason_to_sell: requestPayload.reason_to_sell,
        bathrooms: requestPayload.bathrooms,
        bedrooms: requestPayload.bedrooms,
        current_occupancy: requestPayload.current_occupancy,
        gated_community: true,
        pool: false,
        parking: true,
        image_url: requestPayload.image_url,
        price: requestPayload.price,
        status: propertyEnums.Status.UnderReview, // property set as "Under Review" for FHS
      });

      res.status(201).json({
        status: "success",
        message: "Property created successfully!",
        data: property,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error creating property",
        data: error as Error,
      });
      return;
    }
  }
);

export default router;
