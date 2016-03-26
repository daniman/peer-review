Router.configure({
  layoutTemplate: 'app'
});

// Router.route('/', {
//   waitOn: function() {
//     return Meteor.subscribe('user-data');
//   },
//   action: function() {
//     if (Meteor.user()) {
//       this.redirect('/' + Meteor.user().username);
//     } else {
//       this.render('login');
//     }
//   }
// });

// Router.route('/forms/new', {
//   waitOn: function() {
//       return [Meteor.subscribe('user-data'), Meteor.subscribe('forms')];
//     },
//   action: function() {
//     this.render('newForm');
//   }
// });

if (Meteor.isClient) {
  Meteor.subscribe('responses');
}

Router.route('/', {
    waitOn: function() {
      return [
        Meteor.subscribe('user-data'),
        Meteor.subscribe('folders'),
        Meteor.subscribe('forms')
      ];
    },
    action: function() {      
      if (Meteor.user() && Meteor.user().username == this.params.username && this.params.query['tab'] == 'forms') {
        this.render('formList', {
          data: function() {
            return Forms.find().fetch();
          }
        });
      } else if (Meteor.user()) {
        this.render('main', {
          data: function() {
            return {
              'folders': Folders.find().fetch().sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }),
              'forms': Forms.find().fetch().sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            }
          }
        });
      } else {
        this.render('login');
      }
    }
  });

Router.route('/folder/:foldername', {
  waitOn: function() {
    return [
      Meteor.subscribe('user-data'),
      Meteor.subscribe('folders', this.params.foldername),
      Meteor.subscribe('groups', this.params.foldername),
      Meteor.subscribe('forms')
    ];
  },
  action: function() {
    var folder = Folders.findOne({name: this.params.foldername});
    if (folder) {
      this.render('folder', {
        data: function() {
          return {
            'folder': folder,
            'forms': Forms.find().fetch().sort(function(a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
          };
        }
      });
    } else {
      this.render('splash');
    }
  }
});

Router.route('/form/:formname', {
  waitOn: function() {
    return [
      Meteor.subscribe('user-data'),
      Meteor.subscribe('forms', this.params.formname)
    ];
  },
  action: function() {
    var form = Forms.findOne({name: this.params.formname});
    if (form) {
      this.render('form', {
        data: function() {
          return form;
        }
      });
    } else {
      this.render('splash');
    }
  }
});

Router.route('/input/:hashstr', {
  waitOn: function() {
    return Meteor.subscribe('responses', this.params.hashstr);
  },
  action: function() {
    var me = this;
    response = Responses.findOne();
    Meteor.subscribe('input-form', response.form);
    Meteor.call('get-group-members', response.group, function(err, data) {
      if (err) console.log(err);
      if (!err) {
        me.render('input', {
          data: function() {
            return data;
          }
        });
      }
    });
  }
})
