async function search(searchQuery, lat, lng, radius = 2500) {
    const response = await axios.get(FOURSQUARE_API + "/search", {
      headers: {
        Accept: "application/json",
        Authorization: "fsq3QonyooZx3YfL1B0k05Aa/JXNhxHyYmAVSwDWHWDCNcI=",
      },
      params: {
        query: searchQuery,
        ll: `${lat},${lng}`,
        radius: radius,
        limit: 50
      },
    });
    return response.data;
  }