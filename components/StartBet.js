/**
  Flow to handle a bet creation
**/
var React = require('react');
var FriendList = require('./FriendList.js');
var BetStepIndicator = require('./BetStepIndicator.js');
var BetHistory = require('./BetHistory.js');
var BetForm = require('./BetForm.js');
var LiveGameListing = require('./LiveGameListing.js');

var StartBet = React.createClass({

  /*
    Step 1: Select Friend
    Step 2: pick game
    Step 3: wizard
    Step 4: Confirm
  */

  getInitialState() {
    return { step: 1 };
  },

  // go back a step
  prevStep(currStep) {
    window.scrollTo(0, 0);
    if (currStep === 2) {
      // picked a friend to initate bet
      return () => {
        this.setState({ step: 1 });
      }
    } else if (currStep === 3) {
      return () => {
        this.setState({ step: 2, friend: this.state.friend })
      }
    } else {
      return () => {
        this.setState({ step: currStep - 1 });
      }
    }
  },

  // callback to pass to child components to move to next step
  nextStep(currStep) {
    window.scrollTo(0, 0);
    if (currStep === 1) {
      // picked a friend to initate bet
      return (data) => {
        this.setState({ step: 2, friend: data.friend });
      }
    } else {
      return (gameId) => {
        this.setState({ step: currStep + 1, game: gameId, friend: this.state.friend });
      }
    }
  },

  render: function() {
    var activeComponent = null;
    console.log(this.state);
    switch(this.state.step) {
      case 1:
        activeComponent = <FriendList nextStep={this.nextStep(1)} />;
        break;
      case 2:
        activeComponent = <LiveGameListing friend={this.state.friend.name} nextStep={this.nextStep(2)} />;
        break;
      case 3:
        activeComponent = <BetForm gameId={this.state.game} enemyUser={this.state.friend.name} />;
        break;
      case 4:
        activeComponent = <BetHistory />;
        break;
      default:
        activeComponent = <h1>Bets Step 1</h1>;
    }

    return (
      <div>
        <BetStepIndicator currStep={this.state.step} prevStep={this.prevStep(this.state.step)} />
        {activeComponent}
      </div>
    );
  }
});

module.exports = StartBet;
