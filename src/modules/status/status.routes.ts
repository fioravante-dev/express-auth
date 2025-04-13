import { Router } from "express";

import { getStatus } from "./status.controller";

const statusRoutes = Router();

statusRoutes.get("/", getStatus);

export default statusRoutes;
