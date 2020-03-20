/* globals localStorage */
import axios from 'axios'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if(new Date() > localStorage.tokendateexpiration){
        logout();
        return
      } else {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.tokendateexpiration = res.tokendateexpiration
        localStorage.user = res.user
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.tokendateexpiration
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

function pretendRequest(email, pass, cb) {
  var days = 21;
  var qs = require('qs');
  axios.post('http://www.skear.fr/server/web/login_check', qs.stringify({
      '_username': email,
      '_password': pass
    }))
    .then(function(response) {
      axios.get('http://www.skear.fr/server/web/api/users', {
          headers: {
            Authorization : "Bearer "+response.data.token
          },
          params: {
            username: email
          }
        })
        .then(function(response2) {
          localStorage.accountidimdb = response2.data["hydra:member"][0].accountidimdb
          localStorage.description = response2.data["hydra:member"][0].description
          localStorage.email = response2.data["hydra:member"][0].email
          localStorage.fullname = response2.data["hydra:member"][0].fullname
          localStorage.occupation = response2.data["hydra:member"][0].occupation
          localStorage.pathavatar = response2.data["hydra:member"][0].pathavatar
          localStorage.sessionidimdb = response2.data["hydra:member"][0].sessionidimdb
          localStorage.tokenimdb = response2.data["hydra:member"][0].tokenimdb
          localStorage.userid = response2.data["hydra:member"][0].id
          localStorage.useridpost = response2.data["hydra:member"][0]["@id"]
          localStorage.skearidpost = "/server/web/api/users/4"
          localStorage.responsiveVoiceState = 1
          localStorage.responsiveVoiceVolume = 1
          localStorage.responsiveStartVoice = 1
          localStorage.skearid = 4
          cb({
            authenticated: true,
            user: email,
            token: response.data.token,
            tokendateexpiration: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(function(error) {
      cb({
        authenticated: false
      })
    });
}
