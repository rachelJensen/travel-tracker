import dayjs from 'dayjs';
import Trip from './Trip';

class Traveler {
  constructor(info) {
    this.id = info.id;
    this.name = info.name;
    this.trips = [];
    this.travelerType = info.travelerType;
  }

  getTrips(trips) {
    this.trips = trips
      .filter((trip) => trip.userID === this.id)
      .map((trip) => {
        return new Trip(trip);
      });
  }

  getPending() {
    let pending = this.trips.filter((trip) => trip.status === 'pending');

    if (!pending) {
      return 'none';
    }
    return pending;
  }

  getCurrent(today) {
    let currentTrip = 'none';

    this.trips.forEach((trip) => {
      let tripDates = [];
      let dateToAdd = trip.date;
      tripDates.push(dateToAdd);

      for (let i = 0; i < trip.duration - 1; i++) {
        dateToAdd = dayjs(dateToAdd).add(1, 'day').format('YYYY/MM/DD');
        tripDates.push(dateToAdd);
      }

      if (tripDates.includes(today)) {
        currentTrip = trip;
      }
    });
    return currentTrip;
  }

  getFuture(today) {
    return this.trips.filter((trip) => {
      return dayjs(trip.date).isAfter(dayjs(today));
    });
  }

  getPast(today) {
    let pastTrips = this.trips.filter((trip) => {
      let lastDay = dayjs(trip.date)
        .add(trip.duration - 1, 'day')
        .format('YYYY/MM/DD');
      return dayjs(lastDay).isBefore(dayjs(today));
    });
    return pastTrips;
  }

  calculateAnnualCosts(today, destinations) {
    let thisYearsTrips = this.trips.filter((trip) => {
      return (
        trip.date.split('/')[0] === today.split('/')[0] &&
        trip.status !== 'pending'
      );
    });

    let totalCost = thisYearsTrips.reduce((total, trip) => {
      total += trip.calculateCost(destinations);
      return total;
    }, 0);

    return Math.round(totalCost * 1.1);
  }
}

export default Traveler;
