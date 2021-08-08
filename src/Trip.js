import dayjs from 'dayjs';

class Trip {
  constructor(tripInfo) {
    this.id = tripInfo.id;
    this.userID = tripInfo.userID;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = tripInfo.status;
    this.suggestedActivities = tripInfo.suggestedActivities;
  }

  calculateCost(destinations) {
    let place = destinations.getDetails(this.destinationID);

    let total =
      this.travelers *
      (place.estimatedFlightCostPerPerson +
        this.duration * place.estimatedLodgingCostPerDay);

    return total;
  }

  reportTripInfo(destinations) {
    let place = destinations.getDetails(this.destinationID);

    return {
      destination: place.destination,
      startDate: this.date,
      endDate: dayjs(this.date)
        .add(this.duration - 1, 'day')
        .format('YYYY/MM/DD'),
      image: place.image,
      alt: place.alt,
      suggestedActivities: this.suggestedActivities,
    };
  }
}

export default Trip;
