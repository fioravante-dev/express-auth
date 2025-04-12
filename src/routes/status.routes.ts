import { Router } from "express";

import { getStatus } from "../controllers/status.controller";

const statusRoutes = Router();

statusRoutes.get("/", getStatus);

export default statusRoutes;
