// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
// models/geotag-store.js
const GeoTag = require('./geotag');

class GeoTagStore {
    constructor() {
        this.geoTags = [];
    }

    addGeoTag(name, hashtag,latitude, longitude) {
        const tag = new GeoTag(name, hashtag, latitude, longitude);
        this.geoTags.push(tag);
        return tag;
    }

    getTags() {
        return this.geoTags;
    }

    findTagsByCoordinates(latitude, longitude, radius = 1) {
        return this.geoTags.filter(tag => {
            const distance = Math.sqrt(
                Math.pow(tag.latitude - latitude, 2) +
                Math.pow(tag.longitude - longitude, 2)
            );
            return distance <= radius;
        });
    }
}

module.exports = GeoTagStore;