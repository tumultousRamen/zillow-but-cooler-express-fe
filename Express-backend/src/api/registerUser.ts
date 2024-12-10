require("dotenv").config();
import express, { Request, Response } from "express";
import { XataClient } from "../xata";
import bcrypt from "bcrypt";

// Interfaces
import responsePayloadProps from "../interfaces/responsePayloadProps";
import registerUserProps from "../interfaces/registerUserProps";

const router = express.Router();

router.post(
  "/",
  async (
    req: Request<registerUserProps>,
    res: Response<responsePayloadProps>
  ) => {
    const xata = new XataClient({
      apiKey: process.env.XATA_API_KEY,
      branch: process.env.XATA_BRANCH,
    });

    // Request Payload
    const { email_address, password, role } = req.body as registerUserProps;

    // Check if the user is already present
    try {
      const user = await xata.db.users.filter({ email_address }).getFirst();
      if (user) {
        res.status(500).json({
          status: "error",
          message: "User already present, try logging in",
          data: {},
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error verifying user details",
        data: error as Error,
      });
      return;
    }

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in DB
    try {
      const newUser = await xata.db.users.create({
        email_address,
        password: hashedPassword,
        role,
      });

      console.log("New user created", newUser);
      res.status(201).json({
        status: "success",
        message: "User created successfully!",
        data: {},
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        status: "error",
        message: "Error adding user to DB",
        data: error as Error,
      });
    }
  }
);

export default router;
