import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

export class IndexController {
  public index = async (req: Request, res: Response) => {
    try {
      // ...
      res.status(200).json({ success: true });
    } catch {
      res.status(500).send({ error: 'An error occured.' });
    }
  };
}
