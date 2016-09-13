/**
  Top-level component for the bets feed
**/
var React = require('react');
var FeedPost = require('./FeedPost.js');

var Feed = React.createClass({
  propTypes: {
    userA: React.PropTypes.string
  },

  getInitialState() {
    return {
      bets :[]
      /*
      bets: [
        { userA: 'personA', userB: 'personB', subjectA: 'Sammy Watkins', subjectB: 'Steve Smith Sr', comparator: 'more', statLine: 'passing yards', betValue: 20, ongoing: true },
        { userA: 'personA', userB: 'personC', subjectA: 'Marcus Mariota', subjectB: 'Teddy Bridgewater', comparator: 'more', statLine: 'touchdowns', betValue: 50  },
        { userA: 'personD', userB: 'personA', subjectA: 'Danny Woodhead', subjectB: 'Charcandrick West', comparator: 'more', statLine: 'rushing yards', betValue: 100  },
        { userA: 'personA', userB: 'personB', subjectA: 'Tampa Bay Buccaneers', subjectB: 'Atlanta Falcons', comparator: 'more', statLine: 'interceptions', betValue: 50  },
        { userA: 'personF', userB: 'personA', subjectA: 'Terrelle Pryor', subjectB: 'Jordan Matthews', comparator: 'more', statLine: 'passing yards', betValue: 20  }
      ]
      */
    }
  },

  componentDidMount() {
    this.getUserBets();
  },

  componentWillUnmount() {

  },

  getUserBets() {
    var r = this;
    var userBets = [];
    var betsRef = firebase.database().ref('User-Bets/');
    betsRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.key == firebase.auth().currentUser.uid) {
          childSnapshot.forEach(function(child2Snapshot) {
            var betItem = {
              userA: LOGGEDIN_USER,
              userB: child2Snapshot.child('OpponentName').val(),
              comparator: child2Snapshot.child('Comparator').val(),
              subjectA: child2Snapshot.child('Condition1').val(),
              subjectB: child2Snapshot.child('Condition2').val(),
              gameTime: child2Snapshot.child('GameTime').val(),
              ongoing: child2Snapshot.child('IsCompleted').val() !== "True",
              outcome: child2Snapshot.child('Outcome').val() === "True",
              statLine: child2Snapshot.child('Statistic').val(),
              betValue: child2Snapshot.child('BetValue').val()
            };
            console.log(betItem);
            userBets.push(betItem);
          });
        }
      });
      userBets.reverse();
      r.setState({ bets: userBets });
    });
  },

  render: function() {
    var betList = [];
    for (let i = 0; i < this.state.bets.length; i++) {
      var win = this.state.bets[i].outcome ? this.state.bets[i].userA : this.state.bets[i].userB;
      betList.push(
        <FeedPost
          userA={this.state.bets[i].userA}
          userB={this.state.bets[i].userB}
          subjectA={this.state.bets[i].subjectA}
          subjectB={this.state.bets[i].subjectB}
          comparator={this.state.bets[i].comparator}
          statLine={this.state.bets[i].statLine}
          betValue={this.state.bets[i].betValue}
          ongoing={this.state.bets[i].ongoing}
          winner={win}
          key={i} />
      );
    }
    return (
      <div id="bet-feed">
        {betList}
      </div>
    );
  }
});

module.exports = Feed;
