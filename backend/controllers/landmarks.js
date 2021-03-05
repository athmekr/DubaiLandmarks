//const express = require('express');
//const sharp = require('sharp');
const Parse = require('parse/node');
//const crypto = require('crypto');
const axios = require('axios');
//const { title } = require('process');

exports.getLandmarks =  async (req, res) => {
  try {
    const landmarks = Parse.Object.extend("DubaiLandmarks");
    const query = new Parse.Query(landmarks);

    // Get selected attributes with ascending order, based on the `order` field in the class
    query.select("_id", "title", "shortInfo", "location", "photo", "photo_thumb");
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
  console.log('mpike getObject');
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
    const sessionToken = req.headers['x-parse-session-token'];
    if (sessionToken !== '') {
      console.log('bbb1');
      const landmarks = Parse.Object.extend('DubaiLandmarks');
      const query = new Parse.Query(landmarks);
      const landmark = await query.get(req.params.id, sessionToken);
      console.log(query);
      console.log(landmark);
      console.log(landmark.title);
      console.log(sessionToken);

      const hasWriteAccess = await getObjectACL(landmark, sessionToken);
      console.log(hasWriteAccess);
      if (hasWriteAccess) {
        console.log('bbb2');
        //console.log(req.body.landmark.title);
        landmark.set('title', req.body.title);
        //console.log(title);
        landmark.set('description', req.body.description);
        landmark.set('shortInfo', req.body.shortInfo);
        landmark.set('url', req.body.url);

        await landmark.save(null, { sessionToken: sessionToken });

        return res.status(200).json(landmark);
      } else {
        console.log('bbb3');
        return res.status(500).json({ ok: false, message: 'Write access denied!' });
      }
    } else {
      return res.status(500).json({ ok: false, message: 'Empty session token' });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
