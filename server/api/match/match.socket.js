/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Match = require('./match.model');

exports.register = function(socket) {
  Match.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Match.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('match:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('match:remove', doc);
}