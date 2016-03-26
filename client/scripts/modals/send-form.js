Template.sendForm.onCreated(function() {
  this.name = new ReactiveVar('');
  this.members = this.data.members;
  this.forms = Forms.find().fetch().sort(function(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});

Template.sendForm.helpers({
  'disabled': function() {
    return Template.instance().name.get().length < 1;
  },

  'forms': function() {
    return Template.instance().forms;
  }
});

Template.sendForm.events({
  'click #send-form': function(event, template) {
    var emails = template.members.map(function(member) {
      return member.email;
    });
    var i = document.getElementById('form-select').selectedIndex;
    var form_id = template.forms[i]._id;
    var group_id = template.data._id;

    Meteor.call('send-form', emails, form_id, group_id, function(err) {
      if (err) console.log(err);
      if (!err) {
        console.log('should have sent an email');
      }
    });
  }
});