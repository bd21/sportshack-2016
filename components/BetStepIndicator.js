/**
  Bet Step Indicator
**/
var React = require('react');

var BetStepIndicator = React.createClass({
  propTypes: {
    currStep: React.PropTypes.number
  },

  getDirections: function() {
    switch(this.props.currStep) {
      case 1:
        return "Who do you want to challenge?";
      case 2:
        return "Challenge a different friend";
      case 3:
        return "Pick a different game";
      case 4:
        return "Reconfigure stat challenge";
      default:
        return "broke"      
    }
  },

  render: function() {
    var steps = [];
    for (let i = 1; i <= 3; i++) {
      var cname = 'step';
      if (this.props.currStep >= i) {
        cname += ' active';
      }
      steps.push(<div className={cname} key={i}>{i}</div>);
    }

    var lastStep = (this.props.currStep > 1) ? <a onClick={this.props.prevStep} style={{cursor: 'pointer'}}>{this.getDirections()}</a> : null;

    return (
      <div id="bet-step-indicator">
        {steps}
        <div className="instructions">{lastStep}</div>
      </div>
    );
  }
});

module.exports = BetStepIndicator;
