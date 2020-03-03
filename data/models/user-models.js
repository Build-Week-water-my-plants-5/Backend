const db = require( '../db-config' );
//===============================================================>
// Exports
//=====================>
module.exports = {
  addUser,
  addPlant,
  addDetails,
  findBy,
  findByID,
  findDetails,
  findPlants,
  updateUser,
  updateContact,
  updateDetails,
  removeUser,
  removePlant,
  removeDetails,
};
//===============================================================>
// Adds
//=====================> Add User
async function addUser( user ) {
  const [ id ] = await db( 'users' )
    .insert( user, 'id' );
  return findByID( id );
}
//=====================> Add Plant to User
async function addPlant( plant ) {
  const [ user_id ] = await db( 'user_plants' )
    .insert( plant, 'id' );
  return findPlants( user_id );
}
//=====================> Add Contact
async function addContact( contact ) {
  const [ contact_id ] = await db( 'contacts' )
    .insert( contact, 'id' );
  return db( 'contacts' )
    .select( 'user_id'
      , 'id as contact_id'
      , 'name as contact_name'
      , 'phone as contact_phone')
    .where( 'id', contact_id )
    .first();
}
//=====================> Add Details
async function addDetails( details ) {
  const [ details_id ] = await db( 'user_details' )
    .insert( details, 'id' );
  return db( 'user_details' )
    .select( 'user_id'
      , 'id as details_id'
      , 'username as user_name'
      , 'phone as user_phone'
      , 'email as user_email')
    .where( 'id', details_id )
    .first();
}
//===============================================================>
// Finds
//=====================> Find By
function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}
//=====================> Find By Id
function findByID( id ) {
  return db( 'users' )
    .select( 'id', 'username' )
    .where ( { id }  )
    .first();
}
//=====================> Find Details
function findDetails( id ) {
  return db( 'user_details as ud' )
    .select( 'ud.user_id as user_id'
      , 'ud.username as user_name'
      , 'ud.phone as user_phone'
      , 'ud.email as user_email' )
    .where( 'ud.user_id', id )
    .first();
}
//=====================> Find Plants
function findPlants( id ) {
  return db( 'user_plants as up' )
    .innerJoin( 'plants as p', 'up.plant_id', 'p.id' )
    .select( 'up.user_id as user_id'
      ,'p.id as plant_id'
      , 'p.name as plant_name'
      , 'p.frequency as watering_frequency' )
    .where( 'up.user_id', id )
}
//=====================> Find Contacts
function findContacts( id ){
  return db( 'contacts as c' )
    .select( 'c.user_id as user_id'
      , 'c.id as contact_id'
      , 'c.name as contact_name'
      , 'c.phone as contact_phone' )
    .where( 'c.user_id', id );
}
//===============================================================>
// Updates
//=====================> Update User
function updateUser( id, changes ) {
  return db( 'users' )
    .where ( { id }  )
    .update( changes )
    .then( () => findByID( id ) );
}
//=====================> Update Contact
function updateContact( id, changes, contact_id ) {
  return db( 'contacts' )
    .join  ( 'users'    )
    .where ( { id: contact_id, user_id: id } )
    .update( changes )
    .then( () => 
      db( 'contacts' )
        .select( 'user_id'
          , 'id as contact_id'
          , 'name as contact_name'
          , 'phone as contact_phone')
        .where( 'id', contact_id )
        .first()
    );
}
//=====================> Update Details
function updateDetails( id, changes ) {
  return db( 'user_details' )
    .where ( 'user_id', id  )
    .update( changes )
    .then( () => 
      db( 'user_details as ud' )
        .select( 'ud.user_id'
          , 'ud.id as details_id'
          , 'ud.username as user_name'
          , 'ud.phone as user_phone'
          , 'ud.email as user_email')
        .where( 'ud.user_id', id )
        .first()
    );
}
//===============================================================>
// Removes
//=====================> Remove User
function removeUser( id ) {
  return db( 'users' )
    .where( 'id', id )
    .first()
    .then( user => {
      return user ?
        db( 'users' )
          .where( { id } )
          .del()
          .then( () => user )
        : null;
    } );
}
//=====================> Remove Plant
function removePlant( id ) {
  return db( 'user_plants' )
    .where( 'id', id )
    .first()
    .then( plant => {
      return plant ?
        db( 'user_plants' )
          .where( { id } )
          .del()
          .then( () => plant )
        : null;
    } );
}
//=====================> Remove Details
function removeDetails( id ) {
  return db( 'user_details' )
    .where( 'user_id', id )
    .first()
    .then( details => {
      return details ?
        db( 'user_details' )
          .where( 'user_id', id )
          .del()
          .then( () => details )
        : null;
    } );
}
//===============================================================> EOF