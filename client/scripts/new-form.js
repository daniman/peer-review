Template.newForm.events({
  'click .new-form': function() {
    Blaze.render(Template.newQuestion, document.getElementById('new-question'));
  }
});

Template.newQuestion.onCreated(function() {
  this.type = new ReactiveVar('none');
  this.question = new ReactiveVar('');
  this.options = new ReactiveVar(['Option 1']);
  // this.data = new ReactiveDict():
});

Template.newQuestion.events({
  'click .new-question-create': function() {
    console.log('add the new question');
  },

  'click .new-question-cancel': function(event) {
    Blaze.remove(Blaze.getView($(event.currentTarget).parent('.new-question-container')[0]));
  },

  'change .question-type-select': function(event, template) {
    template.type.set(event.currentTarget.value);
  }
});

Template.newQuestion.helpers({
  'typeIs': function(type) {
    return Template.instance().type.get() === type;
  },

  'question': function() {
    return Template.instance().question.get();
  },

  'options': function() {
    return Template.instance().options.get();
  }
})
