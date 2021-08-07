import { expect } from 'chai';
import Traveler from '../src/Traveler';
import Destinations from '../src/Destinations';
import Trip from '../src/Trip';
import { travelers, destinations } from '../src/data/data';

describe('Traveler', () => {
  let visitor;
  let placesToVisit;

  beforeEach(() => {
    visitor = new Traveler(travelers[1]);
    placesToVisit = new Destinations(destinations);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(visitor).to.be.instanceOf(Traveler);
  });

  it('should have a numeric id', () => {
    expect(visitor.id).to.equal(1);
  });

  it('should have a traveler type', () => {
    expect(visitor.travelerType).to.equal('relaxer');
  });

  it('should start with an empty array of trips', () => {
    expect(visitor.trips).to.deep.equal([]);
  });

  it('should be able to get all trips for the user', () => {
    visitor.getTrips();

    expect(visitor.trips.length).to.equal(6);
    expect(visitor.trips[0]).to.be.instanceOf(Trip);
  });

  it('should be able to return pending trips', () => {
    visitor.getTrips();

    let pendingTrips = visitor.getPending();

    expect(pendingTrips[0]).to.deep.equal({
      id: 7,
      userID: 1,
      destinationID: 4,
      travelers: 5,
      date: '2022/5/28',
      duration: 20,
      status: 'pending',
      suggestedActivities: [],
    });
  });

  it('should be able to return a current trip', () => {
    visitor.getTrips();

    let firstDayCheck = visitor.getCurrent('2021/08/06');
    let middleDayCheck = visitor.getCurrent('2021/08/10');
    let lastDayCheck = visitor.getCurrent('2021/08/22');

    let currentTrip = {
      id: 3,
      userID: 1,
      destinationID: 7,
      travelers: 4,
      date: '2021/08/06',
      duration: 17,
      status: 'approved',
      suggestedActivities: [],
    };

    expect(firstDayCheck).to.deep.equal(currentTrip);
    expect(middleDayCheck).to.deep.equal(currentTrip);
    expect(lastDayCheck).to.deep.equal(currentTrip);
  });

  it('should be able to return "none" if traveler is not currently traveling', () => {
    visitor.getTrips();

    let notTraveling = visitor.getCurrent('2021/08/30');

    expect(notTraveling).to.equal('none');
  });

  it('should be able to return future trips', () => {
    visitor.getTrips();

    let futureTrips = visitor.getFuture('2021/08/06');

    expect(futureTrips.length).to.equal(2);
    expect(futureTrips[0]).to.be.instanceOf(Trip);
  });

  it('should be able to return past trips', () => {
    visitor.getTrips();

    let pastTrips = visitor.getFuture('2021/08/06');

    expect(pastTrips.length).to.equal(2);
    expect(pastTrips[0]).to.be.instanceOf(Trip);
  });

  it('should be able to calculate the cost of all trips this year', () => {
    visitor.getTrips();

    let annualCost = visitor.calculateAnnualCosts('2021/08/07');

    expect(annualCost).to.equal(3608); //spent in 2021
  });

  it('should return a cost of 0 if no trips happened this year', () => {
    visitor.getTrips();

    let annualCost = visitor.calculateAnnualCosts('2018/08/07');

    expect(annualCost).to.equal(0); //spent in 2018
  });
});
