class Destinations {
  constructor(destinations) {
    this.list = destinations;
  }

  getDetails(idNum) {
    let location = this.list.find((place) => place.id === idNum);

    if (!location) {
      return "We're sorry. Your destination cannot be found.";
    }
    return location;
  }
}

export default Destinations;
