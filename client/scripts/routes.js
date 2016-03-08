Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe('user-data');
  },
  action: function() {
    if (Meteor.user()) {
      this.redirect('/' + Meteor.user().username);
    } else {
      this.render('login');
    }
  }
});

Router.route('/forms/new', {
  action: function() {
    this.render('newForm');
  }
});

Router.route('/:username', {
    waitOn: function() {
      return [Meteor.subscribe('user-data'), Meteor.subscribe('folders')];
    },
    action: function() {
      console.log(Meteor.user());
      console.log(this.params.query);
      
      if (Meteor.user() && Meteor.user().username == this.params.username && this.params.query['tab'] == 'forms') {
        this.render('formList', {
          data: function() {
            return Folders.find().fetch().sort(function(a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        });
      } else if (Meteor.user() && Meteor.user().username == this.params.username) {
        this.render('folderList', {
          data: function() {
            return Folders.find().fetch().sort(function(a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        });
      } else if (Meteor.user() && Meteor.user().username != this.params.username) {
        this.render('splash')
      } else {
        this.render('login');
      }
    }
  });

Router.route('/:username/:foldername', {
  waitOn: function() {
    return [
      Meteor.subscribe('user-data'),
      Meteor.subscribe('folders', this.params.foldername),
      Meteor.subscribe('groups', this.params.foldername)
    ];
  },
  action: function() {
    var folder = Folders.findOne({name: this.params.foldername});
    if (folder) {
      this.render('folder', {
        data: function() {
          return folder;
        }
      });
    } else {
      this.render('splash');
    }
  }
});
