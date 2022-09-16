import * as actionTypes from "./actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const showMenu = (show = true) => ({
    type: actionTypes.APP_SHOW_MENU,
    payload: show,
});
