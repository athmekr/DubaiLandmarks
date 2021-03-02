//const express = require('express');
//const sharp = require('sharp');
const Parse = require('parse/node');

exports.getLandmarks =  async (req, res) => {
  try {
    const landmarks = Parse.Object.extend("DubaiLandmarks");
    const query = new Parse.Query(landmarks);
    query.select("objectId", "title", "shortInfo", "location", "photo", "photo_thumb");
    query.ascending("order");
    const landmarksList = await query.find();
    return res.status(200).json(landmarksList);
  }
  catch (error) {
    return res.status(500).json({ message: 'Landsmarks not found' });
  }
}

exports.getLandmark = async (req, res) => {
  try {
    const landmarks = Parse.Object.extend("DubaiLandmarks");
    const query = new Parse.Query(landmarks);
    const landmark = await query.get(req.params.id);
    return res.status(200).json(landmark);
  }
  catch (error) {
    return res.status(500).json({ message: 'Landsmark not found' });
  }
}
