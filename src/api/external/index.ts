import axios from 'axios'

const options = {
    method: 'GET',
    url: 'https://sportspage-feeds.p.rapidapi.com/teams',
    params: { league: 'NFL' },
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': '',
    },
}

export const getTeams = async () => {
    axios
        .request(options)
        .then(function (response) {
            console.log('res', response.data)
        })
        .catch(function (error) {
            console.error(error)
        })
}
