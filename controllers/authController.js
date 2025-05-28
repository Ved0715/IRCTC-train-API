const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();

const register = async (req, res, next) => {

    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        })
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hasedPassword
            }
        });
        return res.status(201).json({
            success: true,
            data: user,
            message: 'User Created Successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email}
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        };

        const JWT_SECRET = process.env.JWT_SECRET;

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        if (!token) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json({
            success: true,
            token,
            message: 'Login Successfully'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    login,
    register
  };