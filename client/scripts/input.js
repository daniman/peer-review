Template.input.helpers({
  'questions': function() {
    return Template.instance().questions;
  },

  'peers': function() {
    return Template.instance().peers;
  },

  'name': function() {
    return Template.instance().name;
  },

  'response': function(question, peer) {
    var q_resps = Template.instance().responses[question];
    if (q_resps) {
      return q_resps[peer];
    } else {
      return null;
    }
  }
});

Template.input.onCreated(function() {
  var email = Responses.findOne().email;
  var me = this;
  this.members = this.data.map(function(member) {
    return member.name;
  });
  this.name = this.data.filter(function(member) {
    return member.email == email;
  })[0].name;
  this.peers = this.members.filter(function(member) {
    return member != me.name;
  });
  this.questions = Forms.findOne().questions;
  this.responses = Responses.findOne().responses;
});

Template.input.events({
  'keyup .input-cell': function(event, template) {
    var key = event.target.getAttribute('key');
    var peer = event.target.parentNode.getAttribute('peer');
    var value = event.target.innerHTML
    Meteor.call('set-response', Responses.findOne()._id, key, peer, value);
  }
});
