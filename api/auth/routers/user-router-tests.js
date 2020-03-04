const request = require( 'supertest'            );
const db      = require( '../../data/db-config' );
const server  = require( '../server'            );
//===============================================================>
// Tests
//=====================>
module.exports = userTests = () => {
  describe( 'users-router.js', () => {
    const user = { username: 'test-user', password: 'pass' };
    let token  = null;
    //=====================>
    // Setup
    //=====================>
    // register and login a test user (register and login tests performed separately)
    describe( 'user register/login', () => {
      it( 'should register a test user', async() => {
        await request( server )
          .post( '/api/auth/register' )
          .send( user )
          .then( res => { console.log( 'test user created' ) } );
      } );
      it( 'should login the test user and set token', async() => {
        await request( server )
          .post( '/api/auth/login' )
          .send( user )
          .then( res => {
            console.log( 'test token created' );
            token = res.body.token;
          } );
      } );
    } );
    //=====================>
    // User
    //=====================>
    describe( 'user functionality', () => {
      //=====================> get the user
      describe( 'GET /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .get ( '/api/user'    )
            .set ( 'token', token )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================> update the user
      describe( 'PUT /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .put ( '/api/user'              )
            .send( { password: 'testpass' } )
            .set ( 'token', token           )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================>
      // User Plants
      //=====================>
      

      // TODO user plants


      //=====================> delete the user
      describe( 'DELETE /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .delete( '/api/user'    )
            .set   ( 'token', token )
            .then  ( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
    } );
  } );
};
//===============================================================> EOF