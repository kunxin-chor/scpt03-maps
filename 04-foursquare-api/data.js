async function search(searchQuery, lat, lng, radius = 1000) {
    const response = await axios.get(FOURSQUARE_API + "/search", {
      headers: {
        Accept: "application/json",
        Authorization: "fsq3QonyooZx3YfL1B0k05Aa/JXNhxHyYmAVSwDWHWDCNcI=",
      },
      params: {
        query: searchQuery,
        ll: `${lat},${lng}`,
        radius: radius,
      },
    });
    return response.data;
  }