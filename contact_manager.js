newContact = new Mongo.Collection('newcontact');
var getdata = false;
if (Meteor.isClient) {
Router.route('/', function(){
  this.render('home');
})
Router.route('/addContact', function(){
  this.render('addContact');
   Meteor.startup(function(){
    var selectContact = localStorage.getItem('selectContact');
    if(localStorage.getItem('selectContact') != null){
     // document.querySelector('#name').value = "Hi"
    } 
   })
})
Router.route('/editContact', function(){
  this.render('editContact');
})


Template.home.helpers({
  foo: function () {
    return Meteor.user().profile.name
  }
  , bar: function(){
    return newContact.find({username: Meteor.user().username}).count();
  }
});

Template.editContact.helpers({
  a: function () {
    var selectContact = localStorage.getItem('selectContact');
  return newContact.find(selectContact);
  }
});
Template.addContact.events({
  'click .submit': function (event) {
    event.preventDefault();
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newPhone = document.getElementById('phone').value;
    var newAddr = document.getElementById('address').value;

    if(!newName.trim() || !newEmail.trim() || !newPhone.trim() || !newAddr.trim()){
      alert("Blank input");
    }
    else{
    console.log(newName, newEmail, newPhone, newAddr);
if(! Meteor.userId()){
      throw Meteor.Error("not-authorized");
    }
    //console.log(newContact.find({username: Meteor.user().username}, {phone : {$ne: newPhone} } ).fetch() )
  
  newContact.insert({
        name: newName,
        email_id: newEmail,
        phone: newPhone,
        address: newAddr,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      }, function(error){
        if(!error)
        console.log("Success");
        // window.location.replace('/')}
      });  

}
  }
});
Template.editContact.events({
  'click .submit': function (event) {
    event.preventDefault();
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newPhone = document.getElementById('phone').value;
    var newAddr = document.getElementById('address').value;

    if(!newName.trim() || !newEmail.trim() || !newPhone.trim() || !newAddr.trim()){
      alert("Blank input");
    }
    else{
    console.log(newName, newEmail, newPhone, newAddr);
if(! Meteor.userId()){
      throw Meteor.Error("not-authorized");
    }
    //console.log(newContact.find({username: Meteor.user().username}, {phone : {$ne: newPhone} } ).fetch() )
    if(localStorage.getItem('selectContact') != null){
      var selectContact = localStorage.getItem('selectContact')
      newContact.update(selectContact,
        {
        name: newName,
        email_id: newEmail,
        phone: newPhone,
        address: newAddr,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      }, function(){
        console.log("Updated");
        localStorage.removeItem('selectContact');
      }
        );
      }
       

}
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
    console.log(contactId, newContact.findOne(contactId).name, newContact.findOne(contactId).username);
  },
  'click .remove.user.icon': function(){
    var contactId = this._id;
    Session.set('selectContact', contactId);
    setTimeout(function(){

    var c = confirm(newContact.findOne(contactId).name + " will be deleted");
    if(c)
      newContact.remove(contactId);
    }, 300)
  },
  'click .edit': function(event){
    var contactId = this._id;
    Session.set('selectContact', contactId);
    var selectContact = Session.get('selectContact');
    localStorage.setItem('selectContact', selectContact);
    // console.log(selectContact)
    window.open("/editContact", '_self');
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
