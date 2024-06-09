const express = require('express');
const router = express.Router();
const GeoTag = require('../models/geotag');
const GeoTagStore = require('../models/geotag-store');

router.get('/', (req, res) => {
  res.render('index', { taglist: [] });
});

router.post('/tagging', (req, res) => {
  const { name, hashtag, latitude, longitude } = req.body;
  const newGeoTag = new GeoTag(name, hashtag, parseFloat(latitude), parseFloat(longitude));
  GeoTagStore.addGeoTag(newGeoTag);
  const nearbyTags = GeoTagStore.searchByProximity(newGeoTag.latitude, newGeoTag.longitude);
  res.render('index', { taglist: nearbyTags });
});

router.post('/discovery', (req, res) => {
  const { latitude, longitude, searchterm } = req.body;
  let tags = GeoTagStore.searchByProximity(parseFloat(latitude), parseFloat(longitude));
  if (searchterm) {
    tags = tags.filter(tag => 
      tag.name.includes(searchterm) || tag.hashtag.includes(searchterm)
    );
  }
  res.render('index', { taglist: tags });
});

module.exports = router;