Template.formList.events({
  'click .test-toggle': function() {
    Router.go('/' + Meteor.user().username);
  }
});