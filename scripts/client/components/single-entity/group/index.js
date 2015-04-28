import React from 'react';

export default class GroupEntity extends React.Component {
  render() {
    let item = this.props.data;

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={item.artwork_url} alt={item.description}/>

            <div className="caption">
              <h3>{item.title}</h3>

              <p>{item.name}</p>

              <p>Number of contributors – {item.contributors_count}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
