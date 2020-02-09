import { Template } from 'meteor/templating'
import { Messages } from '../imports/api/messages'
import { Accounts } from 'meteor/accounts-base'

import './main.html'

Accounts.ui.config({
	passwordSignupFields: 'EMAIL_ONLY',
})

Template.loginButtons.rendered = function()
{
	Accounts._loginButtonsSession.set('dropdownVisible', true);
}

Template.main.helpers({
	loadingFinished: function() {
	  return !Meteor.loggingIn()
	}
})

Template.chat.helpers({
	messages() {
		if(Messages)
			return Messages.find({}, {sort: {createdAt: -1}})
	},
	formatDate(date){
		return date.toLocaleString('default',{dateStyle: 'medium', timeStyle: 'medium'})
	}	
})

Template.logout.events({
	'click .logout-button'(event, instance) {
		Meteor.logout()
	}
})

Template.chat.events({
	'submit #chat-form'(event, instance) {
		event.preventDefault()
		const text = event.target.text.value
		Meteor.call('messages.insert', text, err => {
			if(err) 
				alert(err.message)
			else 
				event.target.reset()
		})
	},
})
