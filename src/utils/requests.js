import fetch from 'node-fetch'

import { getApiToken } from './apiToken'

const apiURL = 'http://apiadvisor.climatempo.com.br/api/v1'

async function getCityID(cityName) {

    try {
        const appToken = await getApiToken()
        const responseCity = await fetch('${apiUrl}/locale/city?name=${encodeURI(cityName)}&token=${appToken}')
        const cityJson = await responseCity.json()

        if (!cityJson.length) {
            if (cityJson.detail) {
                throw new Error(cityJson.detail)
            }

            throw new Error('Cidade ${cityName} não encontrada!')
        }

        return cityJson[0].id

    } catch (error) {
        throw new Error(error)
    }
}

async function getCityForecastById(cityId) {
    try {
        const appToken = await getApiToken()
        const responseWeather = await fetch('${apiURL}/weather/locale/${cityId}/current?token=${appToken}')
        const responseWeather = await responseWeather.json()

        return {
            name: weatherjson.name,
            state: weatherjson.state,
            country: weatherjson.country,
            ...weatherjson.data
        }
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getCityID,
    getCityForecastById
}