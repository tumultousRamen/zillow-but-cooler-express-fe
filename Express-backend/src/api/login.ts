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
    const { email_address, password } = req.body as registerUserProps;

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if the user is present
    try {
      const user = await xata.db.users
        .filter({
          email_address,
        })
        .select(["*"])
        .getFirst();

      if (!user) {
        throw new Error("User not found or incorrect credentials");
      }

      // verify password
      const isPasswordVerified = await bcrypt.compare(
        password,
        user?.password ?? " "
      );

      if (isPasswordVerified) {
        res.status(201).json({
          status: "success",
          message: "User logged In!",
          data: {
            email_address: user.email_address,
            role: user.role,
            id: user.xata_id,
          },
        });
      } else {
        throw new Error("incorrect password");
      }

      console.log(user);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error fetching user details",
        data: error as Error,
      });
    }
  }
);

export default router;
