const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
    headers: {
        authorization: '15184d6e-c892-47df-b333-ddc708502e5f',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const fetchResponse = (url) => {
    return fetch(url, {
        headers: { authorization: '15184d6e-c892-47df-b333-ddc708502e5f' }
    })
}

const profileEditPromise = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(res => {
        return checkResponse(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

const avatarEditPromise = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    }).then(res => {
        return checkResponse(res);
    }).catch((err) => {
        console.log(err);
    });
}

function cardAddPromise(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        return checkResponse(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

function cardDeletePromise(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        return checkResponse(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

function cardLikePromise(url, method, counter) {
    return fetch(url, {
        method: method,
        headers: config.headers
    }).then(res => {
        return checkResponse(res);
    }).then(data => {
       counter.textContent = data.likes.length;
    }).catch((err) => {
        console.log(err);
    });
}

export {fetchResponse, profileEditPromise, cardAddPromise, cardDeletePromise, cardLikePromise, avatarEditPromise, config};
