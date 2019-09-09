const express = require('express');
const passport = require('passport')

const router = express.Router()

const usr = {
  id: 1,
  name: "name",
  email: "email"
}

const form = {
  formId: "ASDFG",
  formName: "Test From",
	userAccess: "All",
	editAccess: true

}

router.get('/', (req, res) => {
  const user = {id: 1, name: 'BOB', email: "test@tst.com", org: "TestOrg"}
  res.json(user)
})


router.get('/organisation/:id/users', (req, res) => {
  var userList = {
    users: [usr]}
    res.json(userList)
  })

  router.get('/organisation/:id/user/:uid', (req, res) => {
    var r = {
      user: usr,
      forms: [form]
    }
      res.json(r)
    })


    router.get('/organisation/:id/user/:uid/form/:fid', (req, res) => {
      var r = {
        allReports: true,
        allowedReports : [
          {reportID: "QWERTY",
          access: true}]
      }
      res.json(r)
      }
    })






  module.exports = router
