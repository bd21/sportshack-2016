/**
  Flow to handle a bet creation
**/
var React = require('react');
var Users = require('../constants/Users.json');

var FriendList = React.createClass({

  propTypes: {
    nextStep: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      friends: Users
    };
  },

  render: function() {
    var friendsDom = [];
    var friends = this.state.friends;
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].name === LOGGEDIN_USER) { continue; }
      var cname = (friends[i].differential >= true) ? 'ahead' : 'behind';
      var clickCallback = () => this.props.nextStep({friend: friends[i]});

      var diffOrStart = (friends[i].hasChallengedBefore) ? <p className={cname}>{friends[i].differential} points</p> : <p>--</p>;

      friendsDom.push(
        <div className="row friend" onClick={clickCallback} key={i}>
          <div className="col-xs-3" style={{paddingLeft: '0px'}}>
            <img src={"images/users/" + friends[i].name + ".jpg"} />
          </div>
          <div className="col-xs-6 friendName">
            <p>{friends[i].name}</p>
          </div>
          <div className="col-xs-3 friendPoints">
            {diffOrStart}
          </div>
        </div>
      );
    }
    return <div id="friendsList">{friendsDom}</div>;
  }
});

module.exports = FriendList;
