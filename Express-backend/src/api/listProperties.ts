require("dotenv").config();
import express, { Request, Response } from "express";
import { XataClient } from "../xata";
import bcrypt from "bcrypt";

// Interfaces
import responsePayloadProps from "../interfaces/responsePayloadProps";
const router = express.Router();

router.get("/", async (req: Request, res: Response<responsePayloadProps>) => {
  const xata = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });

  // Fetch all properties

  try {
    const properties = await xata.db.properties.select(["*"]).getAll();

    if (!properties) {
      throw new Error("properties not found or incorrect credentials");
    }

    res.status(201).json({
      status: "success",
      message: "properties fetched!",
      data: properties,
    });

    console.log(properties);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching properties",
      data: error as Error,
    });
  }
});

export default router;
