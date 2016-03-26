Folders = new Mongo.Collection('folders');
Groups = new Mongo.Collection('groups');
Forms = new Mongo.Collection('forms');
Responses = new Mongo.Collection('responses');

if (Meteor.isServer) {
  Meteor.publish('responses', function(hash_string) {
    return Responses.find({
      hash: hash_string
    });
  });

  Meteor.publish('input-form', function(form) {
    return Forms.find({
      _id: form
    });
  });

  Meteor.publish("folders", function (folder_name) {
    if (folder_name) {
      return Folders.find({
        owners: {$in: [this.userId]},
        name: folder_name
      })
    } else {
      return Folders.find({
        owners: {$in: [this.userId]}
      });
    }
  });

  Meteor.publish("groups", function (folder_name) {
    var folder = Folders.findOne({
      owners: {$in: [this.userId]},
      name: folder_name
    });

    if (folder) {
      return Groups.find({
        owners: {$in: [this.userId]},
        folders: {$in: [folder._id]}
      });   
    } else {
      this.ready();
    }

  });

  Meteor.publish("members", function () {
    return Members.find();
  });

  Meteor.publish("forms", function (form_name) {
    if (form_name) {
      return Forms.find({
        owners: {$in: [this.userId]},
        name: form_name
      })
    } else {
      return Forms.find({
        owners: {$in: [this.userId]}
      });
    }
  });

  Meteor.publish("user-data", function() {
    if (this.userId) {
      return Meteor.users.find(this.userId)
    } else {
      this.ready()
    }
  });
}
