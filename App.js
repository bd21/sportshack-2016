/**
  Top-level component which has a state that can be changed to determine the page to show
**/
var React = require('react');
var Navigation = require('./components/Navigation.js');
var Feed = require('./components/Feed.js');
var StartBet = require('./components/StartBet.js');
var Profile = require('./components/Profile.js');

var App = React.createClass({

  /**
    page: feed | bet | profile
  */
  getInitialState() {
    return { page: 'feed' };
  },

  // callback function for nav bar to change page
  changePage(pageName) {
    return () => this.setState({page: pageName});
  },

  render: function() {
    var activeComponent = null;

    switch(this.state.page) {
      case 'feed':
        activeComponent = <Feed />;
        break;
      case 'bet':
        activeComponent = <StartBet navCallback={this.changePage} />;
        break;
      case 'profile':
        activeComponent = <Profile />;
        break;
      default:
        activeComponent = <Feed />;
    }

    return (
      <div>
        <h1 id="header">TallyUp</h1>
        <Navigation navCallback={this.changePage} currPage={this.state.page} />
        {activeComponent}
      </div>
    );
  }
});

module.exports = App;
