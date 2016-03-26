Meteor.methods({

  'new-folder-create': function(name, description) {
    var folderId = Folders.insert({
      'name': name,
      'description': description,
      'createdAt': new Date().toISOString(),
      'owners': [this.userId],
      'groups': []
    });

    Meteor.users.update({
      _id: this.userId
    }, {
      $push: {'profile.folders': folderId}
    });

    return folderId;
  },

  'new-group-create': function(data, folderId) {
    console.log(data);
    console.log(folderId);

    var groupId = Groups.insert({
      'name': data.name,
      'description': data.description,
      'members': data.members,
      'forms': [],
      'folders': [folderId],
      'owners': [this.userId]
    });

    Folders.update({
      _id: folderId
    }, {
      $push: {groups: groupId}
    });
  },

  'new-form-create': function(name, description) {
    var formId = Forms.insert({
      'name': name,
      'description': description,
      'createdAt': new Date().toISOString(),
      'owners': [this.userId],
      'questions': []
    });

    Meteor.users.update({
      _id: admin_id
    }, {
      $push: {'profile.forms': formId}
    });
  },

  'new-question-create': function(data, formId) {
    if (data.type == 'text') {
      Forms.update({
        _id: formId
      }, {
        $push: {'questions': {
          'type': 'text',
          'question': data.question,
          'key': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        }}
      });
    } else if (data.type == 'dropdown') {
      Forms.update({
        _id: formId
      }, {
        $push: {'questions': {
          'type': 'text',
          'question': data.question,
          'options': data.options,
          'key': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        }}
      });
    }
  },

  'get-group-members': function(group_id) {
    return Groups.findOne({
      _id: group_id
    }).members;
  },

  'send-form': function(emails, form_id, group_id) {
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var responses = [];

    emails.forEach(function(email) {
      console.log(email);
      var hash = _.sample(possible, 75).join('');
      var respId = Responses.insert({
        'hash': hash,
        'email': email,
        'form': form_id,
        'group': group_id,
        'responses': {}
      });

      responses.push({
        'email': email,
        'response': respId,
        'progress': 0
      });

      Email.send({
        to: email,
        from: "daniman0808@gmail.com",
        subject: "GEL Peer Review System Responses Requested",
        html: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat eleifend nisi non bibendum. Etiam id velit dapibus, consequat urna at, finibus urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ullamcorper rutrum leo, id porta enim euismod et. In nunc velit, pretium ac odio quis, suscipit ornare ex. Phasellus sed tellus quam. Aenean urna purus, varius nec tincidunt et, condimentum et eros. Maecenas scelerisque mauris nec dui consequat, et tristique libero viverra. Pellentesque molestie urna ac dapibus pretium. Curabitur semper porttitor nulla.</p><p>Here is your special link: <a href='http://localhost:3000/input/" + hash + "'>click me!</a></p>"
      });
    });

    Groups.update({
      _id: group_id
    }, {
      $push: {forms: {
        'form': form_id,
        responses: responses
      }}
    });
  },

  'set-response': function(resp_id, form_key, peer_name, value) {
    var response = {}
    response['responses.' + form_key + '.' + peer_name] = value;

    Responses.update({
      _id: resp_id
    }, {
      $set: response
    });
  }

});










