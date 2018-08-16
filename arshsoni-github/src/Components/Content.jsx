import React from 'react';
import { Paper } from '@material-ui/core';
import Nav from './Nav';
import { Route } from 'react-router-dom';
import { Home, Experience, Skills, Hobbies } from './Routes';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="col-10">
            <Paper square={true}>
              <div className="content--inner">
                <Route exact path='/' component={Home} />
                <Route exact path='/experience' component={Experience} />
                <Route exact path='/skills' component={Skills} />
                <Route exact path='/hobbies' component={Hobbies} />
              </div>
            </Paper>
          </div>

          <div className="col">
            <Nav />
          </div>

        </div>
      </div>
    )
  }
}

export default Content;