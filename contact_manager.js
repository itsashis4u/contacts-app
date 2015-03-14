newContact = new Mongo.Collection('newcontact');
if (Meteor.isClient) {
Router.route('/', function(){
  this.render('home');
})
Router.route('/addContact', function(){
  this.render('addContact');
})


Template.home.helpers({
  foo: function () {
    return Meteor.user().profile.name
  }
  , bar: function(){
    return newContact.find({username: Meteor.user().username}).count();
  }
});

Template.addContact.events({
  'click .submit': function (event) {
    event.preventDefault();
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newPhone = document.getElementById('phone').value;
    var newAddr = document.getElementById('address').value;

    console.log(newName, newEmail, newPhone, newAddr);
if(! Meteor.userId()){
      throw Meteor.Error("not-authorized");
    }
    newContact.insert({
      name: newName,
      email_id: newEmail,
      phone: newPhone,
      address: newAddr,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    }, function(error){
      if(!error){
      console.log("Success");
      window.location.replace('/')}
    }).distinct('phone',true);
  }
});

Template.contactList.helpers({
  contactname: function () {
    return newContact.find({username: Meteor.user().username}, {sort:{name:1}});
  },
  foo: function(){
    var contactId = this._id;
    var selectContact = Session.get('selectContact');
    if(contactId == selectContact)
    return "selected";
  }
});

Template.contactList.events({
  'click .card': function () {
    var contactId = this._id;
    Session.set('selectContact', contactId);
  },
  'click .remove.user.icon': function(){
    var contactId = this._id;
    Session.set('selectContact', contactId);
    var selectContact = Session.get('selectContact');
    var c = confirm(newContact.findOne(selectContact).name + " will be deleted");
    if(c)
      newContact.remove(selectContact);
  }
});

  Accounts.ui.config({
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Full Name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }],
    passwordSignupFields: 'USERNAME_ONLY', 
     requestPermissions: {}
  });
}

if (Meteor.isServer) {

}
