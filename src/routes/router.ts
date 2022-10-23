import { Router } from 'express';

import sheetRoutes from '.';

const router = Router();

router.use('/', sheetRoutes);

export default router;