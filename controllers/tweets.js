//const { validationResult } = require('express-validator');
const http = require('http')
const socketIo = require('socket.io');
const needle = require('needle');
const express = require('express');
const app = express();

const server = http.Server

const io = socketIo(

 //   server

)




const TOKEN = "AAAAAAAAAAAAAAAAAAAAADjjNAEAAAAAS6NGrxnuVaH%2BTQKy%2FMGZFuz80HE%3DF9kZ3jpv3IENLL7JvawRPDYJm85A7ftCyQoRFa7cjhX5atMGvR"

//let Tweet = require('../models/Tweet');

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules'
const streamURL =
  'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id'

const rules = [{ value:"travelling has:images" }]

// Get stream rules
exports.getRules = async (req, res) => {
  const response = await needle('get', rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
  console.log(response.body)
  return response.body
};

exports.setRules = async (req, res) => {
    const data = {
      add: rules,
    }
  
    const response = await needle('post', rulesURL, data, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  
    return response.body
};

exports.deleteRules = async (rules) => {
    if (!Array.isArray(rules.data)) {
      return null
    }
  
    const ids = rules.data.map((rule) => rule.id)
  
    const data = {
      delete: {
        ids: ids,
      },
    }
  
    const response = await needle('post', rulesURL, data, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  
    return response.body
};

exports.streamTweets = async(socket) => {
    const stream = needle.get(streamURL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  
    stream.on('data', (data) => {
      try {
        const json = JSON.parse(data)
        console.log(json)
        socket.emit('tweet', json)
  
        
      } catch (error) {}
    })
  
    return stream
}

io.on('connection', async () => {
    console.log('Client connected...')
  
    let currentRules
  
    try {
      //   Get all stream rules
      currentRules = await getRules()
  
      // Delete all stream rules
      await deleteRules(currentRules)
  
      // Set rules based on array above
      await setRules()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  
    const filteredStream = streamTweets(io)
  
    let timeout = 0
    filteredStream.on('timeout', () => {
      // Reconnect on error
      console.warn('A connection error occurred. Reconnecting…')
      setTimeout(() => {
        timeout++
        streamTweets(io)
      }, 2 ** timeout)
      streamTweets(io)
    })
});

