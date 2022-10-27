import { Request, Response } from 'express';
import { getApeSheet } from '../services/googleSpreadSheetApe';
import {
  getMonthlySheet,
  getPagesFromSheet,
} from '../services/googleSpreadSheetMonthly';

export default class SheetController {
  expensesApe = async (req: Request, res: Response) => {
    try {
      const response = await getApeSheet();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };

  expensesMonthly = async (req: Request, res: Response) => {
    try {
      const { period } = req.params;
      const response = await getMonthlySheet(period);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };

  pagesSheet = async (req: Request, res: Response) => {
    try {
      const response = await getPagesFromSheet();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };
}
