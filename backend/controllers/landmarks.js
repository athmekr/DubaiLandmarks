//const express = require('express');
//const sharp = require('sharp');
const Parse = require('parse/node');
//const crypto = require('crypto');
const axios = require('axios');
const imageProcessing = require('../misc/image-processing');


//const { title } = require('process');

exports.getLandmarks =  async (req, res) => {
  try {
    const landmarks = Parse.Object.extend("DubaiLandmarks");
    const query = new Parse.Query(landmarks);

    // Get selected attributes with ascending order, based on the `order` field in the class
    query.select("_id", "title", "shortInfo", "latitude", "longitude", "photo", "photo_thumb");
    query.ascending("order");

    const land = await query.find();
    return res.status(200).json(land);
  }
  catch (err) {
    return res.status(500).json({ message: 'Landmarks not found!' });
  }
}

exports.getLandmark = async (req, res) => {
  try {
    const landmarks = Parse.Object.extend("DubaiLandmarks");
    const query = new Parse.Query(landmarks);
    const land = await query.get(req.params.id);

    return res.status(200).json(land);
  }
  catch (err) {
    return res.status(500).json({ message: 'Landmark not found!' });
  }
}


async function getUserIDFromToken(sessionToken) {
  return axios({
    method: 'get',
    baseURL: process.env.SERVER_URL,
    url: '/users/me',
    headers: {
      "X-Parse-Application-Id": process.env.APP_ID,
      "X-Parse-Session-Token": sessionToken,
    }
  });
}

async function getObjectACL(landmarkObject, sessionToken) {
  const userID = await getUserIDFromToken(sessionToken)
    .then((user) => user['data']['objectId'])
    //.catch((err) => undefined);
  if (userID) {
    // Get public write permission
    const publicWrite = landmarkObject.getACL().getPublicWriteAccess();
    if (publicWrite) {
      return publicWrite;
    }
    // Get private write permission
    const userWrite = landmarkObject.getACL().getWriteAccess(userID);
    if (userWrite) {
      return userWrite;
    }
    // Get User's Role write access permission
    const userQuery = new Parse.Query(Parse.User);
    const user = await userQuery.get(userID);
    const rolesQuery = new Parse.Query(Parse.Role);
    rolesQuery.equalTo('users', user);
    const roles = await rolesQuery.find();
    const roleWrite = landmarkObject.getACL().getRoleWriteAccess(roles[0]);
    // Return write permission
    return roleWrite;
  } else  {
    return landmarkObject.getACL().getPublicWriteAccess();
  }
}

exports.updateLandmark =  async (req, res) => {
  try {
    console.log(req.body);
    const sessionToken = req.headers['x-parse-session-token'];
    if (sessionToken !== '') {
      const landmarks = Parse.Object.extend('DubaiLandmarks');
      const query = new Parse.Query(landmarks);
      const landmark = await query.get(req.params.id, { sessionToken: sessionToken });

      const hasWriteAccess = await getObjectACL(landmark, sessionToken);
      console.log("bbbbbbbbbb11111111");

      if (hasWriteAccess) {
        console.log("bbbbbbbbbb22222222");
        console.log(req.file);
        console.log(req.body);
        if (req.file) {
          console.log("bbbbbbbbbb3333333");
          const photo = await imageProcessing(req.file);
          landmark.set('photo', photo.original);
          landmark.set('photo_thumb', photo.thumbnail);
        }

        landmark.set('title', req.body.title);
        landmark.set('description', req.body.description);
        landmark.set('shortInfo', req.body.shortInfo);
        landmark.set('url', req.body.url);
        //landmark.set('location', req.body.location);

        await landmark.save(null, { sessionToken: sessionToken });

        return res.status(200).json(landmark);
      } else {
        return res.status(500).json({ ok: false, message: 'Write access denied!' });
      }
    } else {
      return res.status(500).json({ ok: false, message: 'Empty session token' });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
