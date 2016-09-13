/**
  History of Bets with a user
**/
var React = require('react');
var FeedPost = require('./FeedPost.js');

var BetHistory = React.createClass({

  propTypes: {
    personA: React.PropTypes.string.isRequired,
    personB: React.PropTypes.string.isRequired,
    nextStep: React.PropTypes.func.isRequired,
    prevStep: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      bets: [
        { userA: this.props.personA, userB: this.props.personB },
        { userA: this.props.personA, userB: this.props.personB },
        { userA: this.props.personA, userB: this.props.personB },
        { userA: this.props.personA, userB: this.props.personB }
      ]
    };
  },

  render: function() {
    var betList = [];
    for (let i = 0; i < this.state.bets.length; i++) {
      betList.push(<FeedPost userA={this.state.bets[i].userA} userB={this.state.bets[i].userB} key={i} noPic />);
    }
    var imageA = 'images/users/' + this.props.personA + '.jpg';
    var imageB = 'images/users/' + this.props.personB + '.jpg';
    return (
      <div id="history-overview" className="row">
        <div className="col-xs-12">
          <p>Start a StatChallenge against {this.props.personB}?</p>
        </div>
        <div onClick={this.props.nextStep} className="button">
          <p>Let's Go</p>
        </div>
        <div className="button">
          <p onClick={this.props.prevStep}>No</p>
        </div>
      </div>
    );
  }
});

module.exports = BetHistory;
