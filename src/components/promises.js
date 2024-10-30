const token = '15184d6e-c892-47df-b333-ddc708502e5f';

const fetchResponse = (url) => {
    return fetch(url, {
        headers: { authorization: token }
    })
}

const profileEditPromise = (url, name, about) => {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

const avatarEditPromise = (url, avatar) => {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
        console.log(err);
    });
}

function cardAddPromise(url, name, link) {
    return fetch(url, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

function cardDeletePromise(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

function cardLikePromise(url, method, counter) {
    return fetch(url, {
        method: method,
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
       counter.textContent = data.likes.length;
    }).catch((err) => {
        console.log(err);
    });
}

export {fetchResponse, profileEditPromise, cardAddPromise, cardDeletePromise, cardLikePromise, avatarEditPromise};
