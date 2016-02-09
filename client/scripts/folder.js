Template.folder.helpers({
  username: function() {
    return Meteor.user().username;
  },
  'foldername': function() {
    return Template.instance().data.name;
  },
  'groups': function() {
    return Groups.find().fetch();
  }
});

Template.folder.events({
  'click .new-group': function() {
    Blaze.render(Template.newGroup, document.getElementById('new-group'));
  }
});
