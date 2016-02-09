Folders = new Mongo.Collection('folders');
Groups = new Mongo.Collection('groups');
ReviewForms = new Mongo.Collection('review-forms');

if (Meteor.isServer) {
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

  Meteor.publish("review-forms", function () {
    return ReviewForms.find();
  });

  Meteor.publish("user-data", function() {
    if (this.userId) {
      return Meteor.users.find(this.userId)
    } else {
      this.ready()
    }
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('review-forms');
}