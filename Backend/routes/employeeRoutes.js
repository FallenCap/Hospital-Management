import { Router } from 'express';
import { signIn, logIn } from '../controller/employeeController.js';

const router = Router();

router.post('/signin', signIn);
router.post('/login', logIn);

export { router as employeeRouter };
