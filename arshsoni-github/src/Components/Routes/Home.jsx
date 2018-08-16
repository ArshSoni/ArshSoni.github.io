import React from 'react';
import Experience from './Experience'
import Skills from './Skills'
import Hobbies from './Hobbies'

const Home = () => {
  return (
    <React.Fragment>
      <div className="">
        <h2>About</h2>
        <p>
          Enthusiastic Front-End Developer with 3+ years of commercial and freelance experience with a strong technological background. Fast Learner and Team Player seeking a permanent Front End Developer position.
        </p>
      </div>

      <Experience />
      <Skills />
      <Hobbies />
    </React.Fragment>
  )
}

export default Home;