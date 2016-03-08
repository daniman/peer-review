Template.newGroup.onCreated(function() {
  this.name = new ReactiveVar('');
  this.description = new ReactiveVar('');
  this.members = new ReactiveVar([{
    'name': '',
    'email': ''
  }]);
});

Template.newGroup.helpers({
  name: function() {
    return Template.instance().name.get();
  },
  description: function() {
    return Template.instance().description.get();
  },
  members: function() {
    return Template.instance().members.get();
  },
  inc: function(num) {
    return parseInt(num) + 1;
  }
});

Template.newGroup.events({
  'click .new-row': function(event, template) {
    var members = template.members.get();
    members.push({
      'name': '',
      'email': ''
    });
    template.members.set(members);
  },

  'click .new-group-create': function(event, template) {
    var data = {
      'name': template.name.get(),
      'description': template.description.get(),
      'members': template.members.get()
    };
    Meteor.call('new-group-create', data, Folders.findOne({})._id);
    Blaze.remove(Blaze.getView($(event.currentTarget).parent('.new-group-container')[0]));
  },

  'click .new-group-cancel': function(event, template) {
    Blaze.remove(Blaze.getView($(event.currentTarget).parent('.new-group-container')[0]));
  },

  'keyup .new-group-name': function(event, template) {
    template.name.set(event.currentTarget.value);
  },

  'keyup .new-group-description': function(event, template) {
    template.description.set(event.currentTarget.value);
  },

  'keyup .member-name': function(event, template) {
    var index = $(event.currentTarget).closest('tr')[0].rowIndex - 1;
    var members = template.members.get();
    members[index]['name'] = event.currentTarget.value;
    template.members.set(members)
  },

  'keyup .member-email': function(event, template) {
    var index = $(event.currentTarget).closest('tr')[0].rowIndex - 1;
    var members = template.members.get();
    members[index]['email'] = event.currentTarget.value;
    template.members.set(members)
  },
});