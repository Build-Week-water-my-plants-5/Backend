const router     = require( 'express' ).Router();
const Users      = require( '../../../data/models/user-models' );

//===============================================================>
// GET requests
//=====================> Testing /users endpoint

router.get( '/test', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us from /api/users" } );
} );

//=====================> Retrieving a user with ID req.params.id

router.get( '/:id', ( req, res ) =>  {
  Users.findDetails(req.params.id) 
    .then( users => {
      res.status( 200 ).json( users );
    })
    .catch( error => res.status(500).json( { message: "Server Error" } ) );
} );

//=====================> Retrieving a user's plants with ID req.params.id

router.get( '/:id/plants', ( req, res ) =>  {
  Users.findPlants(req.params.id) 
    .then( plants => {
      res.status( 200 ).json( plants );
    })
    .catch( error => res.status(500).json( { message: "Server Error" } ) );
} );

//===============================================================>
// POST requests
//=====================> Posting a plant to a user

router.post( '/:id', ( req, res ) => {
  const plant = { user_id: req.params.id, plant_id: req.body.plant_id }

  Users.addPlant(plant)
    .then( plants => {
      res.status( 201 ).json( plants );
    })
    .catch( error => res.status(500).json( { message: "Server Error" } ) )
} )

//===============================================================>
// PUT requests
//=====================> Update User Details

router.put( '/:id', ( req, res ) => {
  Users.updateDetails(req.params.id, req.body)
    .then( details => {
      res.status( 201 ).json( details );
    })
    .catch( error => res.status(500).json( { message: "Server Error" } ) )
} )

//===============================================================>
// DELETE requests
//=====================>

router.delete( '/:id/plants/:plant_id', (req, res) => {
  Users.removePlant( req.params.plant_id )
    .then( plant => {
      res.status( 200 ).json( plant );
    } )
} )

module.exports = router;