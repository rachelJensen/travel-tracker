import { expect } from 'chai';
import Trip from '../src/Trip';
import Destinations from '../src/Destinations';
import { trips, destinations } from '../src/data/data';

describe('Trip', () => {
  let trip;
  let placesToVisit;

  beforeEach(() => {
    trip = new Trip(trips[0]);
    placesToVisit = new Destinations(destinations);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.instanceOf(Trip);
  });

  it('should have an id', () => {
    expect(trip.id).to.equal(1);
  });

  it('should have a userID', () => {
    expect(trip.userID).to.equal(1);
  });

  it('should have a desintation id', () => {
    expect(trip.destinationID).to.equal(1);
  });

  it('should have a number of travelers', () => {
    expect(trip.travelers).to.equal(1);
  });

  it('should have a starting date and duration', () => {
    expect(trip.date).to.be.a('string');
    expect(trip.duration).to.be.a('number');
  });

  it('should have a status', () => {
    expect(trip.status).to.equal('approved');
  });

  it('should have an empty array for suggested activities', () => {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should be able to calculate the cost', () => {
    let cost = trip.calculateCost(placesToVisit);

    expect(cost).to.equal(960);
  });

  it('should be able to return a trip', () => {
    let tripInfo = trip.reportTripInfo(placesToVisit);

    expect(tripInfo.destination).to.equal('Lima, Peru');
    expect(tripInfo.startDate).to.equal('2019/09/16');
    expect(tripInfo.endDate).to.equal('2019/09/23');
    expect(tripInfo.image).to.equal(
      'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'
    );
    expect(tripInfo.alt).to.equal(
      'overview of city buildings with a clear sky'
    );
    expect(tripInfo.suggestedActivities).to.deep.equal([]);
  });
});
