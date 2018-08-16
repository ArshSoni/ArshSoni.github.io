import React from 'react';
import { Paper, Button } from '@material-ui/core';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper square={true}>
        <div className="profile">
          <div className="profile--detailsWrapper">
            <div className="profile--imageWrapper">
              <img className="profile--image" src={process.env.PUBLIC_URL + 'me.jpg'} />
            </div>
            <h1 className="profile--name">Arshdeep Soni</h1>
            <p>Front End Developer</p>

            <div className="profile--social">
              <i className="fa fa-instagram"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-facebook"></i>
              <i className="fa fa-youtube"></i>
            </div>
          </div>

          <div className="profile--cv">
            <Button variant="contained" color="primary" size="medium">
              Download CV
            </Button>
          </div>
        </div>
      </Paper>
    )
  }
}

export default Profile;