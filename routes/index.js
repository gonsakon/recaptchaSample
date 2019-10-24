const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'reCAPTCHA 測試登入功能' });
});
router.post('/', function (req, res, next) {
  const reCAPTCHAKey = "後端金鑰"; 
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();
  params.append('secret', reCAPTCHAKey);
  params.append('response', req.body.token);
  fetch(url,{
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    method: 'POST',
    body: params
  })
  .then(res => res.json())
  .then(json => {
    if (json.score > 0.5) {
      res.send('你是真人！');
    } else {
      res.send('你是機器人！');
    }
  })
});

module.exports = router;
