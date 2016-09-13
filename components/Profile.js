/**
  nav bar
**/
var React = require('react');

var Profile = React.createClass({

  render: function() {
    return (
      <div id="profile" className="row">
        <h2>Hello, {LOGGEDIN_USER}!</h2>
        <img src={"images/users/" + LOGGEDIN_USER + ".jpg"} />
      </div>
    );
  }
});

module.exports = Profile;
