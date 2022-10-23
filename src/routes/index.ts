import { Request, Response, Router } from 'express';
import SheetController from '../controllers/SheetController';

const sheetRoutes = Router();

const sheetController = new SheetController();

sheetRoutes.get('/expenses-ape', (req: Request, res: Response) => {
  sheetController.expensesApe(req, res);
});

export default sheetRoutes;