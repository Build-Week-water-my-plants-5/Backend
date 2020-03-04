const apiRouterTest   = require( './api/auth/routers/router-tests'       );
const authRouterTests = require( './api/auth/routers/auth-router-tests'  );
const userTests       = require( './api/auth/routers/user-router-tests'  );
const db              = require( './data/db-config'                      );
//===============================================================>
// Tests
//=====================>
describe( 'clear test DB then run all tests', () => {
  beforeAll( async() => {
    await db( 'users'  ).truncate();
    await db( 'plants' ).truncate();
  } );

  describe( 'api-test',   apiRouterTest   );
  describe( 'auth-tests', authRouterTests );
  describe( 'user-tests', userTests       );
} );
//===============================================================> EOF