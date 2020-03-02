const router     = require( 'express' ).Router();
const authRouter  = require( './auth-router' );
//===============================================================>
// Use
//=====================>
router.use( '/auth', authRouter  );
//===============================================================>
// Router working message
//=====================>
router.get( '/', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us" } );
} );
//===============================================================>

module.exports = router;
//===============================================================> EOF