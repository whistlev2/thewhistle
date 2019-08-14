const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

var _ = require('underscore');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
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

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.get('/store', (req, res) => {
  var query = req.query;
  // var query = {
  //   ebwu6u2Vl2ei_Location: 'gdsgdf',
  //   'VWQ6GhGLJsOW_What happened?': 'gfgfdgf',
  //    wNsKGlMaufZe_Gender: 'on',
  //    'dVQ0VY9scXI1_When?': '2019-07-16',
  //    v3Q81stRELhB_Happy: 'on',
  //    v3Q81stRELhB_Sad: 'on'
  //  };
   var response = {}
   _.each(query, function(val ,key) {
     var keys = key.split("_");
     var id = keys[0];
     var title = keys[1];
     if(response.hasOwnProperty(id)) {
       response['' + id].push(get_value(title, val))
     } else {
       response['' + id] = [get_value(title, val)]
     }
   })
   console.log(response)
  res.status(200).json(query)
})

function get_value(key, value) {
  if(value == 'on') {
    return key
  } else {
    return value
  }
}

start()
