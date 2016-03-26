Template.form.events({
  'click .new-question': function() {
    Blaze.render(Template.newQuestion, document.getElementById('new-question'));
  }
});

Template.form.helpers({
  'typeIs': function(str1, str2) {
    return str1 == str2;
  },

  'questions': function() {
    return Forms.findOne().questions;
  },

  'inc': function(i) {
    return parseInt(i) + 1;
  }
});

Template.newQuestion.onCreated(function() {
  console.log('meow?');
  this.type = new ReactiveVar('none');
  this.question = new ReactiveVar('');
  this.options = new ReactiveVar(['']);
});

Template.newQuestion.events({
  'click .new-question-create': function(event, template) {
    var data = {
      'type': template.type.get(),
      'question': template.question.get()
    };
    Meteor.call('new-question-create', data, Forms.findOne()._id);
    Blaze.remove(Blaze.getView($(event.currentTarget).parent('.new-question-container')[0]));
  },

  'keyup .new-question-text': function(event, template) {
    template.question.set(event.currentTarget.value);
  },

  'click .new-question-cancel': function(event) {
    Blaze.remove(Blaze.getView($(event.currentTarget).parent('.new-question-container')[0]));
  },

  'change .question-type-select': function(event, template) {
    template.type.set(event.currentTarget.value);
  },

  'click .add-option': function(event, template) {
    var options = template.options.get();
    options.push('');
    template.options.set(options);
  }
});

Template.newQuestion.helpers({
  'question': function() {
    return Template.instance().question.get();
  },

  'options': function() {
    return Template.instance().options.get();
  },

  'typeIs': function(type) {
    return Template.instance().type.get() === type;
  }
});
