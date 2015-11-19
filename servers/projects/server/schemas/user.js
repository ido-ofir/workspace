var user = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    //username  : { type: 'string', unique: true },
    name: { type: 'string' },
    email     : { type: 'email',  unique: true },
    image: { type: 'object' },
    mobile     : { type: 'string' },
    firstName     : { type: 'string' },
    lastName     : { type: 'string' },
    status     : { type: 'string' },
    extension: { type: 'string' }
  },
  beforeCreate: function(user, next){
    user.name = user.firstName + ' ' + user.lastName;
    next();
  },
  beforeUpdate: function(user, next){
    user.name = user.firstName + ' ' + user.lastName;
    next();
  }
};

module.exports = user;
