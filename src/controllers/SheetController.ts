import { Request, Response } from 'express';
import { getApeSheet } from '../services/googleSpreadSheetApe';

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
}
