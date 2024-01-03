const defaultSettings = {
    // Values
    lobbyMaxPlayers: 6,
    lobbyMinPlayers: 1,

    lobbyCodeLength: 6,

    allowDuplicateNames: false,

    serverTicksPerSecond: 30,

    listenPort: 80
};

const defaultValidators = {
    checkNameError: (name) => {
        if (name.length < 1) {
            return "Name must be at least 1 character long";
        }
        if (name.length > 15) {
            return "Name must be at most 15 characters long";
        }
        if (!/^[a-zA-Z0-9_ ]+$/.test(name)) {
            return "Name can only contain alphanumeric characters, spaces, and underscores";
        }
        return null;
    }
}

module.exports = {
    defaultSettings,
    defaultValidators
};