const request = require( 'supertest'               );
const db      = require( '../../../data/db-config' );
const server  = require( '../../server'            );
//===============================================================>
// Tests
//=====================>
module.exports = userTests = () => {
  describe( 'users-router.js', () => {
    const user = { username: 'test-user', password: 'pass', phone: '1234567890', email: 'no@mail.com' };
    let token  = null;
    //=====================>
    // Setup
    //=====================>
    // register and login a test user (register and login tests performed separately)
    describe( 'user register/login', () => {
      it( 'should register a test user', async() => {
        await request( server         )
          .post( '/api/auth/register' )
          .send( user                 )
          .then( res => { console.log( 'test user created' ) } );
      } );
      it( 'should login the test user and set token', async() => {
        await request( server      )
          .post( '/api/auth/login' )
          .send( user              )
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
      describe( 'GET /users', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server   )
            .get ( '/api/users'   )
            .set ( 'token', token )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================> update the user
      describe( 'PUT /users', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server            )
            .put ( '/api/users'            )
            .send( { password: 'newpass' } )
            .set ( 'token', token          )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 201     );
            } );
        } );
      } );
      //=====================> update the user's details
      describe( 'PUT /users/details', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server               )
            .put ( '/api/users/details'       )
            .send( { email: 'some@mail.com' } )
            .set ( 'token', token             )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 201     );
            } );
        } );
      } );
      //=====================>
      // User Plants
      //=====================> get the user's plants
      describe( 'GET /users/plants', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server        )
            .get ( '/api/users/plants' )
            .set ( 'token', token      )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================> add plant to user
      describe( 'POST /users/plants', () => {
        it( 'should return a JSON object and status 201', async() => {
          await request(  server     )
          .post( '/api/users/plants' )
          .send( { plant_id: 1 }     )
          .set ( 'token', token      )
          .then( res => {
            console.log( res.status );
            expect( res.type   ).toMatch( /json/i );
            expect( res.status ).toBe   ( 201     );    // will not work until plants table/endpoints setup
          } )
        } )
      } )
      //=====================> delete plant from user
      describe( 'DELETE /users/plants/:id', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request(  server       )
          .post( '/api/users/plants/1' )
          .set ( 'token', token        )
          .then( res => {
            console.log( res.status );
            expect( res.type   ).toMatch( /json/i );
            expect( res.status ).toBe   ( 200     );
          } )
        } )
      } )
      //=====================> delete the user
      describe( 'DELETE /users', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server     )
            .delete( '/api/users'   )
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