import React from 'react';
import bank from './images/bank.png';

const Home = () => {
    return (
        <div className="card-home" style={{width: "36rem"}}>
        <img src={bank} className="card-img-top" alt="home" />
        <div className="card-body">
          <h5 className="card-title">Welcome to Secure Bank!</h5>
          <p className="card-text">My Bank is a front-end development project for MIT xPro: Professional Certificate in Coding created by Makayla Colonello.  This is the second portfolio project showcasing the skills acquired in this course.  The code will be available on GitHub. This application is built in React and features a home, create account, balance, withdraw, deposit, and all data pages. These pages can be acessed via the navigation bar.  All styling is done via the Bootstrap Library. I hope you enjoy My Bank!</p>
        </div>
        <div className="card-body">
        </div>
      </div>
    )

}

export default Home;