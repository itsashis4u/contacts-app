newContact = new Mongo.Collection('newcontact');
if (Meteor.isClient) {
Router.route('/', function(){
  this.render('home');
})
Router.route('/addContact', function(){
  this.render('addContact');
})

Template.addContact.helpers({
  foo: function () {
    // ...
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

    newContact.insert({
      name: newName,
      email_id: newEmail,
      phone: newPhone,
      address: newAddr
    }, function(){
      console.log("Success");
    });
  }
});
}

if (Meteor.isServer) {

}
