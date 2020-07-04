// TODO: Add proper security checks instead of simply disabling ESLint warnings
/*
eslint-disable
security/detect-object-injection,
security/detect-non-literal-require,
security/detect-non-literal-fs-filename
*/
import fs from 'fs';
import path from 'path';
import * as express from 'express';


const translationCache = {};

const localesDir = `${__dirname}/locales`;

const isCached = (locale, ns) =>
    translationCache[locale] && translationCache[locale][ns] ? true : false;

const isOutdated = (locale, ns) =>
    translationCache[locale] &&
    translationCache[locale][ns] &&
    translationCache[locale][ns].updatedAt <
    new Date(fs.statSync(path.resolve(`${localesDir}/${locale}/${ns}.json`)).mtime).getTime() ?
    true :
    false;

const loadAndCache = (locale, ns) => {
    translationCache[locale] = {
        [ns]: {
            values: fs.readFileSync(`${localesDir}/${locale}/${ns}.json`, {
                encoding: 'utf-8'
            }),
            updatedAt: new Date(
                fs.statSync(path.resolve(`${localesDir}/${locale}/${ns}.json`)).mtime
            ).getTime(),
        },
    };
};

const getTranslation = (locale, ns) => translationCache[locale][ns];

// This middleware serves translation files requested via /locales/:locale/:ns
export const i18nextXhr = (req, res) => {
    const {
        locale,
        ns
    } = req.params;

    try {
        if (isCached(locale, ns) === false || isOutdated(locale, ns) === true) {
            loadAndCache(locale, ns);
        }

        const {
            values,
            updatedAt
        } = getTranslation(locale, ns);

        return res.header('Last-Modified', new Date(updatedAt).toUTCString()).send(values);
    } catch (error) {
        console.log(error.message);
        return res.send(null);
    }
};

// Middleware to download updated translation files either manually or via webhook
export const refreshTranslations = async (_req, res) => {
    const {
        download,
        writeFiles,
        cleanup
    } = require('../lib/i18n/lokalise');

    const data = await download();
    await writeFiles(data, `${__dirname}/locales`);
    cleanup();
    res.sendStatus(200);
};

export default i18nextXhr;
