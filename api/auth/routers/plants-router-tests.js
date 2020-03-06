const request = require( 'supertest'               );
const db      = require( '../../../data/db-config' );
const server  = require( '../../server'            );
//===============================================================>
// Tests
//=====================>
module.exports = plantsTests = () => {
  describe( 'plants-router.js', () => {
    const user = { username: 'plant-tester', password: 'pass', phone: '1234567890', email: 'no@mail.com' };
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
    // Plants
    //=====================>
    describe( 'plant functionality', () => {
      //=====================> get all the plants
      describe( 'GET /plants', () => {
        it( 'should return a status 200', async() => {
          await request( server   )
            .get ( '/api/plants'  )
            .set ( 'token', token )
            .then( res => {
              expect( res.status ).toBe( 200 );
            } );
        } );
      } );
      //=====================> get plant by id
      describe( 'GET /plants/:id', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server    )
            .get ( '/api/plants/1' )
            .set ( 'token', token  )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================> add a plant to the DB
      describe( 'POST /plants', () => {
        it( 'should return a JSON object and status 201', async() => {
          await request( server   )
            .post( '/api/plants'  )
            .send( { name: "test plant", frequency: "whenever" } )
            .set ( 'token', token )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 201     );
            } )
        } );
      } );
      //=====================> edit a plant
      describe( 'PUT /plants/:id', () => {
        it( 'should return a JSON object and status 201', async() => {
          await request( server             )
            .put( '/api/plants/1'           )
            .send( { name: "edited plant" } )
            .set ( 'token', token           )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 201     );
            } )
        } );
      } );
    } );
  } );
};
//===============================================================> EOF