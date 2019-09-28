const express = require('express')
const consola = require('consola')
const passport = require('passport')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')


const api = require('./api/index.js')

const surveys = require('../server/queries/surveys.js');

const app = express()

var _ = require('underscore');

// Import and Set Nuxt.js options

const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser())
  app.use(session({
    secret: '9dj48bhkldhr48fj3890drkgb6739&#HF(&5j5&*^%',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))

  // Setup passport
  app.use(passport.initialize())
  app.use(passport.session())
  require('./auth_config')(passport)
  app.use('/api', api)

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use('/api', api)

  // Give nuxt middleware to express
  app.use(nuxt.render)


  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

// TODO - move Form editing endpoints to seperate file
app.get('/update-field', (req, res) => {
  surveys.updateField(req, res)
})

app.get('/update-choice', (req, res) => {
  surveys.updateSurveyChoice(req, res)
})

app.get('/update-dropdown-choice', (req, res) => {
  surveys.updateDropdownChoice(req, res)
})

app.get('/surveyjson/:id', (req, res) => {
  const id = req.params.id;
  surveys.getSurveyJSON(id, res)
})

app.get('/formjson/:id', (req, res) => {
  surveys.getFormJSON(req.params.id, res)
})

start()
