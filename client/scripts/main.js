Template.main.helpers({
  folders: function() {
    return Template.instance().data.folders;
  },

  username: function() {
    return Meteor.user().username;
  },

  date: function(time) {
    return moment(time).format('dddd ll');
  },

  forms: function() {
    return Template.instance().data.forms;
  }
});

// Template.main.events({
//   'click .new-form': function() {
//     // Router.go('/forms/new');
//   }
// });

$(document).ready(function() {
  $(document).on('click', '.new-folder', function() {
    Blaze.render(Template.newFolder, document.getElementById('modals'));
    $('#newFolder').modal('show');
  });

  $(document).on('hidden.bs.modal', '#newFolder', function() {
    Blaze.remove(Blaze.getView(document.getElementById('newFolder')));
  });

  $(document).on('click', '.new-form', function() {
    Blaze.render(Template.newForm, document.getElementById('modals'));
    $('#newForm').modal('show');
  });

  $(document).on('hidden.bs.modal', '#newform', function() {
    Blaze.remove(Blaze.getView(document.getElementById('newForm')));
  });
});

Template.main.onRendered(function() {

  $('.new-folder').hover(function(event) {
    $('.glyphicon-folder-close').addClass('glyphicon-folder-open');
    $('.glyphicon-folder-close').removeClass('glyphicon-folder-close');
  }, function(event) {
    $('.glyphicon-folder-open').addClass('glyphicon-folder-close');
    $('.glyphicon-folder-open').removeClass('glyphicon-folder-open');
  });

});