import { Request, Response, Router } from 'express';
import SheetController from '../controllers/SheetController';

const sheetRoutes = Router();

const sheetController = new SheetController();

sheetRoutes.get('/expenses-ape', (req: Request, res: Response) => {
  sheetController.expensesApe(req, res);
});

sheetRoutes.get(
  '/expenses-monthly/period/:period',
  (req: Request, res: Response) => {
    sheetController.expensesMonthly(req, res);
  }
);

sheetRoutes.get('/expenses-monthly/pages', (req: Request, res: Response) => {
  sheetController.pagesSheet(req, res);
});

export default sheetRoutes;
