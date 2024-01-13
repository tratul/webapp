export const floorOrCeil = (number, threshold = 0.5) => {
  if (typeof number === 'number') {
    const differenceToFloor = number - Math.floor(number);
    const differenceToCeil = Math.ceil(number) - number;

    if (Math.abs(differenceToFloor) < threshold) {
      return Math.floor(number);
    } else if (Math.abs(differenceToCeil) < threshold) {
      return Math.ceil(number);
    } else {
      // If neither floor nor ceiling is close, you can choose one based on your logic
      return Math.round(number);
    }
  }
  else{
    return 0;
  }
    
};

export const weatherDescription = (weatherCode) => {
    switch (weatherCode) {
        case 0:
          return 'Clear sky';
        case 1:
        case 2:
        case 3:
          return 'Mainly clear, partly cloudy, and overcast';
        case 45:
        case 48:
          return 'Fog and depositing rime fog';
        case 51:
        case 53:
        case 55:
          return 'Drizzle: Light, moderate, and dense intensity';
        case 56:
        case 57:
          return 'Freezing Drizzle: Light and dense intensity';
        case 61:
        case 63:
        case 65:
          return 'Rain: Slight, moderate, and heavy intensity';
        case 66:
        case 67:
          return 'Freezing Rain: Light and heavy intensity';
        case 71:
        case 73:
        case 75:
          return 'Snow fall: Slight, moderate, and heavy intensity';
        case 77:
          return 'Snow grains';
        case 80:
        case 81:
        case 82:
          return 'Rain showers: Slight, moderate, and violent';
        case 85:
        case 86:
          return 'Snow showers: Slight and heavy';
        case 95:
          return 'Thunderstorm: Slight or moderate';
        case 96:
        case 99:
          return 'Thunderstorm with slight and heavy hail';
        default:
          return 'Unknown weather code';
    }
};
  