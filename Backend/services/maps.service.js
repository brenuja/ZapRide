const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {

     // Replace with your Google Maps API key
     const API_KEY = process.env.GOOGLE_MAPS_API;

     // Construct the API URL
     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
 

  try {
   
    // Make a GET request using Axios
    const response = await axios.get(url);

    // Check if the response has results
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error('No results found for the given address');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
}

module.exports.getDistanceTime = async (origin, destination) => {
  if(!origin || !destination) {
    throw new Error('Origin and destination are required')
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try{

    const response = await axios.get(url);
    if(response.data.status === 'OK') {

      if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS' ){
        throw new Error('No routes found')
      }

      return response.data.rows[ 0 ].elements[ 0 ];
    } else {
      throw new Error('Unable to fetch distance and time')
    } 

  } catch(err) {
    console.error(err)
    throw err
  }

}

module.exports.getAutoCompleteSuggestions = async(input) =>{
  if(!input){
    throw new Error('query is required')
  }

  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try{
    const response = await axios.get(url)
    if(response.data.status === 'OK'){
      return response.data.predictions
    }else {
      throw new Error('Unable to fetch suggestions')
    }
  } catch (err){
    console.error(err)
    throw err
  }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {

  try{
    // radius in km

    const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], 10 / 6378]
          }
        }
    });
    console.log(captains)
    return captains;
  } catch(err){
    console.error(err)
  }
}  

