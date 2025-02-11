const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min:3}).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({ min:3 }).withMessage('Invaild destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invaild vehicle type'),
    rideController.createRide
)

router.post('/get-fare', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min:3}).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({ min:3 }).withMessage('Invaild destination address'),
    (req, res, next) => {
        console.log("Received Body for /get-fare:", req.body); // Debugging
        next();
    },
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invaild ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('invalid ride id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('invalid otp'),
    rideController.startRide
)

router.post('/end-ride', 
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invaild ride id'),
    rideController.endRide
)

module.exports = router