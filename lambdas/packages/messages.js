const createIdsMsg = (ids) => {
    let idsMsg = "";

    if (ids.length > 1) {
        let lastOne = ids.pop();
        idsMsg = ids.join(', ');
        idsMsg += " and " + lastOne;
    } else {
        idsMsg = ids.join(', ');
    }

    return idsMsg
}

const getHappyBirthday = (ids) => {
    idsMsg = createIdsMsg(ids)
    if (idsMsg.length > 0) {
        return `:birthday: :birthday_party_parrot: Happy birthday ${idsMsg}! :birthday_party_parrot: :birthday:`;
    }
    return "We don't have any birthday today :pepecryhands: :pepecrydrink:"
}

module.exports = { createIdsMsg, getHappyBirthday }
