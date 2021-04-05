# Pseudo code


##
// Makes a single API request to retrieve
const fetchMyApi = function (API) {
    request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const {  } = JSON.parse(body);
    callback(null, {  });
}

const findCategory = function (string)  {
 check APIs in order
  call Restraunts API function
    if (api pings) return restraunt category number4
  call Read API function
     if (api pings) return Read category number
  call Watch API function
     if (api pings) return Watch category number
  call Buy API function
     if (api pings) return Buy category number
  return (misc category number)
}



