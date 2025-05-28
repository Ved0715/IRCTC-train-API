const experess = require('express');
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();


const addTrain = async ( req, res, next ) => {

    const { name, source, destination, totalSeats } = req.body;

    if (!name || !source || !destination || !totalSeats) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        })
    };

    try {
        const train = await prisma.train.create({
            data: {
                name,
                source,
                destination,
                totalSeats,
            }
        })
        return res.status(201).json({
            success: true,
            data: train,
            message: 'Train Added Successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    addTrain
};