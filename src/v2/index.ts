import { Router } from 'express';

import * as Video from './controllers/video';

const router = Router();

router.get('/video/get/:id', Video.search);
router.post('/video/add', Video.add);

export default router;
