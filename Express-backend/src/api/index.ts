import express from "express";

// Interfaces
import responsePayloadProps from "../interfaces/responsePayloadProps";

// Routes
import registerUser from "./registerUser";
import login from "./login";
import listProperties from "./listProperties";
import createProperty from "./createProperty";

const router = express.Router();

router.get<{}, responsePayloadProps>("/", (req, res) => {
  res.json({
    status: "success",
    message: "homekey-backend",
    data: {},
  });
});

router.use<{}, responsePayloadProps>("/registerUser", registerUser);
router.use<{}, responsePayloadProps>("/login", login);
router.use<{}, responsePayloadProps>("/listProperties", listProperties);
router.use<{}, responsePayloadProps>("/createProperty", createProperty);

export default router;
