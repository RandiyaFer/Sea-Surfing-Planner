import express, { Router } from 'express';
import account_Controller from '../controller/account.controller';
import  user_Contoller  from '../controller/user-controller';

// import trip_Cotroller from '../controller/trip.controller';

// Create an instance of the Express Router
const router: Router = express.Router();

// Use the Controllers
router.use('/account', account_Controller).
       use('/user', user_Contoller)

// Export the router 
export default router;
