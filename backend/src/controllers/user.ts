import { Request, Response } from 'express';
import { fetchUserData } from '../services/user-service';

export const getUser = (req: Request, res: Response) => {
  try {
    const data = fetchUserData();
    res.json({ data });
  } catch (error) {
    const expect = error as Error;
    return res.status(500).json({ error: expect.message });
  }
};
