class Destinations {
  constructor(destinations) {
    this.destinations = destinations;
  }

  getDetails(idNum) {
    let location = this.destinations.find((place) => place.id === idNum);

    if (!location) {
      return "We're sorry. Your destination cannot be found.";
    }
    return location;
  }
}

export default Destinations;
