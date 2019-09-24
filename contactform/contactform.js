jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else
      var userMail = document.getElementById('email').value
    var userName = document.getElementById('name').value
    var subject = document.getElementById('subject').value
    var message = document.getElementById('message').value
    var body = {
      "personalizations": [
        {
          "to": [
            {
              "email": "info@istinvestmentsgroup.com"
            }
          ],
          "subject": subject
        }
      ],
      "from": {
        "name": userName,
        "email": userMail
      },
      "content": [
        {
          "type": "text/html",
          "value": message
        }]
    }
    var headers = new Headers();
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://api.sendgrid.com/v3/mail/send';
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer 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`);
    headers.append('Origin', 'https://api.sendgrid.com/v3/mail/send');

    fetch(proxyurl + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    }).then((response) => {
      $("#sendmessage").addClass("show");
      $("#errormessage").removeClass("show");
      $('.contactForm').find("input, textarea").val("");
    });
    return false;
  });

});
