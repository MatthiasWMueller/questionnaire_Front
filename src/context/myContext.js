import React from 'react';

export default React.createContext({
    loggedIn: false,
    isAdmin: false,
    token: null,
    userID: null,
    answered: 0,
    unanswered: 0 
});