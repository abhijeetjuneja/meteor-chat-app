import {Mongo} from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Messages = new Mongo.Collection('messages')

Meteor.methods({
    'messages.insert'(text) {
        check(text,String)

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.insert({
            text,
            email: Meteor.user().emails[0].address,
            createdAt: new Date()
        })
    }
})
