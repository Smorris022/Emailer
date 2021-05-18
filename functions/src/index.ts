import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();


import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

export const welcomeEmail = functions.auth.user().onCreate(user => {

  const msg = {
    to: user.email,
    from: 'test@gmail.com',
    template_id: TEMPLATE_ID,
    dynamic_template_data: {
      subject: 'Welcome Email from Emailer App',
      name: user.displayName
    },
  };

  return sgMail.send(msg);
  
});