var chat = {
  schema: true,
  attributes: {
    "from": { "type": "string" },
    "to": { "type": "string" },
    "groupId": { "type": "string" },
    "type": { "type": "string" },
    "recieved": { "type": "boolean" },
    "read": { "type": "boolean" },
    "content": { "type": "string" },
    "isGroup": { "type": "boolean" },
    "data": { "type": "object" }
  }
};

module.exports = chat;
