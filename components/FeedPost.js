/**
  This component represents a single feed posting that includes bet information
**/
var React = require('react');

var FeedPost = React.createClass({

  propTypes: {
    noPic: React.PropTypes.bool,

    userA: React.PropTypes.string.isRequired,
    userB: React.PropTypes.string.isRequired,
    subjectA: React.PropTypes.string.isRequired,
    subjectB: React.PropTypes.string.isRequired,
    comparator: React.PropTypes.string.isRequired,
    statLine: React.PropTypes.string.isRequired,
    betValue: React.PropTypes.number.isRequired,
    ongoing: React.PropTypes.bool,
    winner: React.PropTypes.string
  },

  descriptionGenerator: function() {
    return this.props.subjectA + " will have " + this.props.comparator
      + " " + this.props.statLine + " than " + this.props.subjectB;
  },

  render: function() {
    var image = null;
    if (!this.props.noPic) {
      var imageA = 'images/users/' + this.props.userA + '.jpg';
      var imageB = 'images/users/' + this.props.userB + '.jpg';
      image = (
        <div className="row">
          <div className="col-xs-2 personA">
            <img src={imageA} />
            <p>{this.props.userA}</p>
          </div>
          <div className="col-xs-8">
            <p className="bet-info">{this.descriptionGenerator()}</p>
          </div>
          <div className="col-xs-2 personB">
            <img src={imageB} />
            <p>{this.props.userB}</p>
          </div>
        </div>
      );
    }

    var inprog = (this.props.ongoing) ? <p className="ongoing">LIVE</p> : <p className="finished">FINAL</p>;

    var betResult = "up for grabs";
    if (!this.props.ongoing) {
      betResult = "awarded to " + this.props.winner;
    }

    return (
      <div className="feed-post">
        {image}
        <div className="row live-preview">
          <div className="col-xs-3 betValue">
            {inprog}
          </div>
          <div className="col-xs-3">
            <p className="betValue">{this.props.subjectA}</p>
          </div>
          <div className="col-xs-3">
            <p className="betValue">{this.props.subjectB}</p>
          </div>
          <div className="col-xs-3">
            <p className="betValue">{this.props.betValue} points</p>
            <p>{betResult}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FeedPost;
