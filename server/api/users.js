const express = require('express');
const passport = require('passport')

const router = express.Router()

const userQueries = require('../queries/users.js')
const responseQueries = require('../queries/responses.js')

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

// TODO - BIG - integrate user into user API 


router.get('/', (req, res) => {
  userQueries.getUsers(res)
})

router.get('/organisation/:id/users', (req, res) => {
    userQueries.getOrgUsers(res, req.params.id)
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
        {
          reportID: "QWERTY",
          access: true
        }
      ]
    }
    res.json(r)
  })

  router.get('/organisation/:id/user/:uid/forms', (req, res) => {
    var r = {
      forms: [{
        id: 45,
        name: "testFormName",
        testURL: "testURL",
        publishedURL: "pubURL"
      }
    ]}
    res.json(r)
  })


  router.get('/user/:uid/admin-orgs-access', (req, res) => {
    var r = {
      organisations: [
        {
          orgName: "orgName", id: "ERTYU", role: "admin"
        }
      ]}
      res.json(r)
      })


    router.get('/user/:uid/form/:fid', (req, res) => {
      var r = {
        reports: [
          {reportId: 987}
        ]}
        res.json(r)
      })

      router.get('/report/:id', (req, res) => {
        var r = {
          reports: [
            {
              id: 4567,
              fields: []
            }
          ]
        }
        res.json(r)
      })

      router.get('/organisation/:id/reports', (req, res) => {
        responseQueries.getResponse(res, 'nYkngh')
      })




      module.exports = router
