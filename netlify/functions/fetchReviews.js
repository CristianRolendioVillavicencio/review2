const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ"; // Reemplaza con el Place ID

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
        const data = await response.json();

        if (!data.result || !data.result.reviews) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No se encontraron reseñas." })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.toString() })
        };
    }
}
