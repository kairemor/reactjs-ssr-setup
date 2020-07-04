import * as express from 'express';
import {
    configureStore
} from '../../shared/store';

const addStore = (
    _req,
    res,
    next
) => {
    res.locals.store = configureStore({});
    next();
};

export default addStore;
