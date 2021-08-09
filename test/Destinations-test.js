import { expect } from 'chai';
import Destinations from '../src/Destinations';
import { destinations } from '../src/data/data';

describe('Destinations', () => {
  let placesToVisit;

  beforeEach(() => {
    placesToVisit = new Destinations(destinations);
  });

  it('should be a function', () => {
    expect(Destinations).to.be.a('function');
  });

  it('should be an instance of Destinations', () => {
    expect(placesToVisit).to.be.instanceOf(Destinations);
  });

  it('should hold an array of destinations', () => {
    expect(placesToVisit.list[0]).to.deep.equal({
      id: 1,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image:
        'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky',
    });
  });

  it('should be able to return a destination by id', () => {
    let destination = placesToVisit.getDetails(2);

    expect(destination.destination).to.equal('Stockholm, Sweden');
  });

  it('should be able to return a different destination by id', () => {
    let destination = placesToVisit.getDetails(3);

    expect(destination.destination).to.equal('Sydney, Austrailia');
  });

  it('should be able to return an error message if destination is not found', () => {
    let destination = placesToVisit.getDetails(100);

    expect(destination).to.equal(
      "We're sorry. Your destination cannot be found."
    );
  });
});
