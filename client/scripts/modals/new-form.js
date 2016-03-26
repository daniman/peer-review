Template.newForm.onCreated(function() {
  this.name = new ReactiveVar('');
});

Template.newForm.helpers({
  'disabled': function() {
    return Template.instance().name.get().length < 1;
  }
});

Template.newForm.events({
  'keyup #new-form-name': function(event, template) {
    template.name.set(event.currentTarget.value);
  },

  'click #new-form-create': function(event, template) {
    Meteor.call('new-form-create', template.name.get(), 'dummy description', function(err, formId) {
      if (err) console.log(err);
      if (!err) {
        Session.set('form-id', formId);
      }
    });
  }
});