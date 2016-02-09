Template.newFolder.onCreated(function() {
  this.name = new ReactiveVar('');
});

Template.newFolder.helpers({
  'disabled': function() {
    return Template.instance().name.get().length < 1;
  }
});

Template.newFolder.events({
  'keyup #new-folder-name': function(event, template) {
    template.name.set(event.currentTarget.value);
  },

  'click #new-folder-create': function(event, template) {
    Meteor.call('new-folder-create', template.name.get(), 'dummy description', Meteor.userId(), function(err, folderId) {
      if (err) console.log(err);
      if (!err) {
        Session.set('folder-id', folderId);
      }
    });
  }
});