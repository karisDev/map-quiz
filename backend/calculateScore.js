function calculateScore(correctPoint, selectedPoint) {
  // Distance between the two points in kilometers
  const distance = getDistanceFromLatLonInKm(
    correctPoint.lat,
    correctPoint.lng,
    selectedPoint.lat,
    selectedPoint.lng
  );

  // Maximum possible score (for an exact match)
  const maxScore = 500;

  // Minimum possible score (for points that are very far away)
  const minScore = 0;

  // Distance scale for the continental United States (in kilometers)
  const usScale = {
    minDistance: 0,
    minScore: 500,
    maxDistance: 4000,
    maxScore: 0,
  };

  // Calculate the score based on the distance
  let score;

  const accuracy = 2.5;

  if (distance < accuracy) {
    // Exact match
    score = maxScore;
  } else if (distance < usScale.minDistance) {
    // Closer than the US scale minimum distance
    score = maxScore;
  } else if (distance > usScale.maxDistance) {
    // Farther than the US scale maximum distance
    score = minScore;
  } else {
    // Between the US scale minimum and maximum distances
    score =
      ((distance - usScale.maxDistance) /
        (usScale.minDistance - usScale.maxDistance)) *
        (usScale.minScore - minScore) +
      minScore;
  }

  return score;
}

// Helper function to calculate the distance between two points in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default calculateScore;

// const correctPoint = { lat: 37.773972, lng: -122.431297 }; // SF
// const selectedPoint = { lat: 47.36, lng: -122.2 }; // Seattle

// const score = calculateScore(correctPoint, selectedPoint); // score 366.73

// console.log("score:", score);
