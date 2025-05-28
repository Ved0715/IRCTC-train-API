const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const getTrain = async (req, res, next) => {
    const { source, destination } = req.query;
    console.log(source, destination);

    const trains = await prisma.train.findMany({
        where: {
            source: {
                equals: source,
                mode: 'insensitive'
            },
            destination: {
                equals: destination,
                mode: 'insensitive'
            }
        }
    });

    const result = await Promise.all(trains.map(async (train) => {
        const booked = await prisma.booking.count({
            where: { source, destination}
        });
        return {
            ...train,
            availableSeats: train.totalSeats - booked
        };
    }))

    res.status(200).json({
        success: true,
        data: trains,
        message: 'Trains Fetched Successfully'
    });
}

const bookSeat = async (req, res, next) => {
    const userId = req.user.id;
    const { trainId } = req.body;

    try {
        const bookings = await prisma.$transaction(async (tx) => {
            const train = await tx.train.findUnique({
                where: {
                    id: trainId
                },
                include: {
                    bookings: true
                }
            });

            if (!train) {
                throw new Error('Train not found');
            }
            const bookedSeats = train.bookings.length;
            if (bookedSeats >= train.totalSeats) {
                throw new Error('Train is full');
            }
            const booking = await tx.booking.create({
                data: {
                    trainId,
                    userId
                }
            });
            return res.status(201).json({
                success: true,
                data: booking,
                message: 'Seat Booked Successfully'
            });
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getBookings = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                userId
            }
        });
        return res.status(200).json({
            success: true,
            data: bookings,
            message: 'Bookings Fetched Successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    getTrain,
    bookSeat,
    getBookings
  };