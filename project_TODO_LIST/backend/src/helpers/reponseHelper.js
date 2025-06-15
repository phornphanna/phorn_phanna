const responseSuccess = (msg = '', data = []) => {
    return {
        result: true,
        message: msg,
        data: data
    };
}

const responseFail = (msg = '') => {
    return {
        result: false,
        message: msg,
    };
}

module.exports = { responseSuccess, responseFail };