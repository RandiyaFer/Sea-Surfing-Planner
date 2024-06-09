
import express, { Request, Response, Router } from 'express';
import { updateAccount } from '../repositories/mysql/account.repository';
import { getAccount } from '../repositories/mysql/account.repository';
import { createAccount } from '../repositories/mysql/account.repository';

// Create an instance of the Express Router
const router: Router = Router();

// Define a route to handle GET requests for fetching categories
router.get('/get', (req: Request, res: Response) => {
    getAccount((err: any, result: any) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.json({ status: 200, message: 'getAccount fetched', pet: result });
    });
});

router.put('/put', (req: Request, res: Response) => {
    const accountData = req.body;

    updateAccount(accountData, (err: any, result: any) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }

        res.json({ status: 200, message: `Pet updated with id ${accountData.accNo}`, result });
    });
});

router.post('/create', (req: Request, res: Response) => {
    const accountData = req.body;

    createAccount(accountData, (err: any, result: any) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(201).json({ status: 201, message: 'createAccount created', result });
    });
});

// Export the router for use in other parts of the application
export default router;
