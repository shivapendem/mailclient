const https = require('https');

function sendemailfromelasticemail(to,subject,textcontent,htmlcontent,apikey,fromname,fromemail,replyTo)
{
	var body = '';
    console.log("email sent to "+to+" with subject "+subject);
    const data1="apikey="+apikey+"&&subject="+subject+"&fromName="+fromname+"&&from="+fromemail+"&to="+to+"&bodyHtml="+htmlcontent+"&bodyText="+textcontent+"&replyTo="+replyTo;
    const options = {
      hostname: 'api.elasticemail.com',
      port: 443,
      path: '/v2/email/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data1.length
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', (d) => {
        //process.stdout.write(d);
         body += d;
      }),
      res.on('end', function() {
            //console.log("end info");
            //console.log(body);
        	jsondata=JSON.parse(body);
            if((jsondata.success!=null ) && (jsondata.success==false))
            {
                console.error("New response in send mail to "+to+" with subject "+subject+" Received "+body);
            } 
        })
    })
    req.on('error', (error) => {
      console.error(error);
    })
    req.write(data1)
    req.end()
}
function sendemailfromAWSSES()
{
  var ses = require('node-ses')
    , client = ses.createClient({key: 'key', secret: 'secret'});
  client.sendEmail({
     to: 'aaron.heckmann+github@gmail.com'
   , from: 'somewhereOverTheR@inbow.com'
   , cc: 'theWickedWitch@nerds.net'
   , bcc: ['canAlsoBe@nArray.com', 'forrealz@.org']
   , subject: 'greetings'
   , message: 'your <b>message</b> goes here'
   , altText: 'plain text'
  }, function (err, data, res) {
   // ...
  });
}

function sendemailfromSendGrid()
{
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'test@example.com',
    from: 'test@example.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    });
}


module.exports = {
	sendemailfromelasticemail
	};