import Handlebars from 'handlebars';
import express from 'express';
import {productsModel} from '../dao/models/products.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const indexRouter  = express.Router();


const secret = process.env.PRIVATE_KEY;
const cookieName = process.env.JWT_COOKIE_NAME;

indexRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productsModel.find().lean();
        const userToken = req.cookies[cookieName];

        if (!userToken) {
            res.status(200).render('index', { products, productLength: products.length, user: null });
            return;
        }

        const user = jwt.verify(userToken, secret) ;
        

        if (!user) {
            res.status(200).render('index', { products, productLength: products.length, user: null });
            return;
        }

        if (isNaN(limit)) {
            res.status(200).render('index', { products: products.slice(0, 4), productLength: products.length, user });
        } else {
            res.status(200).render('index', { products: products.slice(0, limit), productLength: products.length, user });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

Handlebars.registerHelper('ifEqual', function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
