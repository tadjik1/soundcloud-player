import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const yearsRange = this.getYearsRange(new Date());
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">&copy; SoundCloud Replica {yearsRange}</p>
        </div>
      </footer>
    );
  };

  getYearsRange(date) {
    let yearsRange = '2015';
    const year = date.getFullYear();
    if (year !== 2015) {
      yearsRange += ` - ${year}`;
    }
    return yearsRange;
  };
}
