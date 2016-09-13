/**
  nav bar
**/
var React = require('react');

var Navigation = React.createClass({

  // feed | bet | leader | profile

  propTypes: {
    navCallback: React.PropTypes.func.isRequired,
    currPage: React.PropTypes.string.isRequired
  },

  getClassName: function(linkTo) {
    if (linkTo === this.props.currPage) {
      return 'col-xs-4 activeNav';
    } else {
      return 'col-xs-4';
    }
  },

  render: function() {
    return (
      <div id="navigation" className="row">
        <div className={this.getClassName('bet')} onClick={this.props.navCallback('bet')}>Start A Bet</div>
        <div className={this.getClassName('feed')} onClick={this.props.navCallback('feed')}>Live Feed</div>
        <div className={this.getClassName('profile')} onClick={this.props.navCallback('profile')}>Profile</div>
      </div>
    );
  }
});

module.exports = Navigation;
