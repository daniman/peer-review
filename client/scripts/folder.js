Template.folder.helpers({
  username: function() {
    return Meteor.user().username;
  },
  'foldername': function() {
    return Template.instance().data.folder.name;
  },
  'groups': function() {
    return Groups.find().fetch();
  },
  'nameForm': function(form) {
    console.log(form);
    return Forms.findOne({
      _id: form
    }).name;
  },
  'status': function(group, form_index, email) {
    var responses = Groups.findOne({
      _id: group
    }).forms[form_index].responses;

    var status = responses.filter(function(resp) {
      return resp.email == email;
    })[0].progress;

    if (status == 2) {
      return "finished";
    } else if (status == 1) {
      return "in progress";
    } else {
      return "not started";
    }
  }
});

Template.folder.events({
  'click .new-group': function() {
    Blaze.render(Template.newGroup, document.getElementById('new-group'));
  },

  'click .send-form-to-group': function(event, template) {
    var i = $('.send-form-to-group').index(event.target);
    Blaze.renderWithData(
      Template.sendForm,
      Groups.find().fetch()[i],
      document.getElementById('modals'));
    $('#sendForm').modal('show');
  }
});

$(document).ready(function() {
  $(document).on('hidden.bs.modal', '#sendForm', function() {
    Blaze.remove(Blaze.getView(document.getElementById('sendForm')));
  });
});
