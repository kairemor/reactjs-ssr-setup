export const ActionTypes = {
    SETLOCALE: 'app/set-locale',
};

export const setLocale = (locale) => ({
    type: ActionTypes.SETLOCALE,
    payload: locale,
});
