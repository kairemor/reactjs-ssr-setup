import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Features from 'components/Features';
import { setLocale } from 'store/app/actions';
import { Locale } from 'store/app/types';

const App = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e) => {
            dispatch(setLocale(e.currentTarget.value));
        },
        [dispatch]
    );

    return (
        <React.Fragment>
            <Features />
            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
        </React.Fragment>
    );
};

export default App;
