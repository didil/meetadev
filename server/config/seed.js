/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Skill = require('../api/skill/skill.model');

Skill.count(function (err, count) {
    if (err) throw err;
    if (count === 0) {
      var skillNames = require('./seed-data/skills').skills;
      var skills = skillNames.map(function (skillName) {
        return {name: skillName};
      });

      Skill.create(skills, function (err) {
        if (err) throw err;
      });
    }
  }
);