/**
  History of Bets with a user
**/
var React = require('react');
var patriotsID = "97354895-8c77-4fd4-a860-32e62ea7382a";
var cardinalsID = "de760528-1dc0-416a-a978-b510d20692ff";

var BetForm = React.createClass({

  propTypes: {
    gameId: React.PropTypes.string.isRequired,
    enemyUser: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return { team1Players: [], team2Players: [] };
  },

  componentDidMount() {
    this.populateDropdowns();
  },

  populateDropdowns: function() {
    var r = this;
    var pats = $.ajax({
      url: "http://localhost:8000/nfl-ot1/teams/" + patriotsID + "/profile.json?api_key=bnuwzm9vktq7n3pkg5trpnb8", 
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        var playerRaw = response;
        var pats = [];
        for (var i = 0; i < playerRaw.players.length; i++) {
            if (playerRaw.players[i].position== "RB" || playerRaw.players[i].position == "TE" || playerRaw.players[i].position == "QB" || playerRaw.players[i].position == "WR") {
                pats.push(playerRaw.players[i].name);
            }
        }
        console.log(pats);

        setTimeout(() => {
          var cards = $.ajax({
            url: "http://localhost:8000/nfl-ot1/teams/" + cardinalsID + "/profile.json?api_key=bnuwzm9vktq7n3pkg5trpnb8", 
            type: 'GET',
            dataType: 'json',
            success: function(response) {
              var playerRaw = response;
              var cards = [];
              for (var i = 0; i < playerRaw.players.length; i++) {
                  if (playerRaw.players[i].position== "RB" || playerRaw.players[i].position == "TE" || playerRaw.players[i].position == "QB" || playerRaw.players[i].position == "WR") {
                      cards.push(playerRaw.players[i].name);
                  }
              }
              console.log(cards);

              r.setState({
                team1Players: pats, team2Players: cards
              });
            }
          });
        }, 1000);
      }
    });
  },

  renderPlayers(team) {
    var data = this.state[team];
    var options = [];
    for (let i = 0; i < data.length; i++) {
      options.push(<option value={data[i]} key={i}>{data[i]}</option>);
    }
    return options;
  },

  createBet(betValue, comp, cond1, cond2, opponentName, stat) {
    var userId = firebase.auth().currentUser.uid

    var betData = {
      BetValue: betValue
      , Comparator: comp
      , UserID: userId
      , GameID: 'dsafdasfsfd'
      , Condition1: cond1
      , Condition2: cond2
      , GameTime: 4
      , IsAccepted: true
      , Opponent: 'sdjas'
      , OpponentName: opponentName
      , Outcome: false
      , Statistic: stat
      , IsCompleted: false
    };

    console.log(betData);

    var newBetKey = firebase.database().ref().child('Bets').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/Bets/' + newBetKey] = betData;
    updates['/User-Bets/' + userId + '/' + newBetKey] = betData;

    console.log("Attempting to update the firebase database...");

    firebase.database().ref().update(updates);
    this.setState({isSubmitted: true});
  },

  submitAndGoToFeed() {
    var Condition1 = $('#subjectA').val();
    var Condition2 = $('#subjectB').val();
    var Comparator = $('#comparator').val();
    var Statistic = $('#statLine').val();
    var OpponentName = this.props.enemyUser;
    var IsCompleted = false;
    this.createBet(50, Comparator, Condition1, Condition2, OpponentName, Statistic);
  },

  render: function() {
    if (this.state.team1Players.length === 0) {
      return (
        <div id="bet-form" className="row">
          <img id="loader" src="./images/loader.gif" key="loader" />
        </div>
      );
    }

    var button = (this.state.isSubmitted) ? <div id="submitcomplete" style={{color: 'green'}}>Submitted!</div> : <div id="submitbutton" onClick={this.submitAndGoToFeed}>Submit Bet!</div>;

    return (
      <div id="bet-form" className="row">
        I bet that <select id="subjectA">{this.renderPlayers('team1Players')}</select> will have <select id="comparator"><option value="More">more</option><option value="Less">less</option></select> <select id="statLine"><option value="Rushing Yards">rushing yards</option><option value="Passing Yards">passing yards</option><option value="Touchdowns">touchdowns</option><option value="Points">points</option><option value="Receiving Yards">receiving yards</option></select> than <select id="subjectB">{this.renderPlayers('team2Players')}</select>.
        {button}
      </div>
    );
  }
});

module.exports = BetForm;
