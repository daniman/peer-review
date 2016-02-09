Meteor.methods({

  'new-folder-create': function(name, description, admin_id) {
    var folderId = Folders.insert({
      'name': name,
      'description': description,
      'createdAt': new Date().toISOString(),
      'owners': [admin_id],
      'groups': []
    });

    Meteor.users.update({
      _id: admin_id
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
    })
  }

});
