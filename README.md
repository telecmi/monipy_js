# MONIPY Client JS SDK for Voice

MONIPY Supervisor JS SDK allows you to barge into an ongoing call.  

# Get Started

## Installation

You can install MONIPY using npm:

```sh
npm i monipy
```

## Initializing the MONIPY SDK Object

The MONIPY SDK object needs to be initialized.

```js
var monipy = new MONIPY( {
        name: 'Kiara',
        debug: false,
        autoplay: true,
        autoReboot: false,
        ringTime: 60
    } );
```

#### Configuration Parameters

Below are the configuration parameters:

| Attribute  | Description                                 | Allowed Values | Default Value |
| ---        | ---                                         | ---            | ---           |
| name       | Your Display Name in App                    | string         | null          |
| debug      | Enable debug message in JS log              | true, false    | false         |
| autoplay   | Enable speaker access to your device        | true, false    | true          |
| autoReboot | Auto restart in case of failure             | true, false    | false         |
| ringTime   | Your incoming call ringing time in seconds  | number         | 60            |

## Login

Validate your login ID and password.

```js
monipy.login('YOUR_LOGIN_ID','YOUR_PASSWORD');
```

#### Event Listeners

```js
monipy.on( 'login', function ( object ) {
    console.log( object );
} );

monipy.on( 'logout', function ( object ) {
    console.log( object );
} );

monipy.on( 'loginFailed', function ( object ) {
    console.log( object );
} );

monipy.on( 'error', function ( object ) {
    console.log( object );
} );

monipy.on( 'ended', function ( object ) {
    console.log( object );
} );

monipy.on( 'rejected', function ( object ) {
    console.log( object );
} );

monipy.on( 'answered', function ( object ) {
    console.log( object );
} );

monipy.on( 'hangup', function ( object ) {
    console.log( object );
} );

monipy.on( 'mediaFailed', function ( object ) {
    console.log( object );
} );

monipy.on( 'inComingCall', function ( object ) {
    console.log( object );
    monipy.answer();
} );

monipy.on( 'ringing', ( e ) => {
    console.log( e );
} );

monipy.on( 'dtmf', ( e ) => {
    console.log( e );
} );

monipy.on( 'hold', ( e ) => {
    console.log( e );
} );

monipy.on( 'unhold', ( e ) => {
    console.log( e );
} );

monipy.on( 'missed', ( e ) => {
    console.log( e );
} );

monipy.on( 'trying', ( e ) => {
    console.log( e );
} );

monipy.on( 'callStream', ( e ) => {
    console.log( e );
} );
```

#### HTTP status codes

MONIPY platform represents the following status codes to identify errors.

| Status code | Description                                        |
| ---         | ---                                                |
| 200         | You have logged in successfully                    |
| 401         | Your Login ID or Password is invalid, authentication failed |
| 1001        | You have already logged in                         |

## Answer Call

Answer an incoming call.

```js
monipy.answer();
```

#### HTTP status codes

| Status code | Description                                        |
| ---         | ---                                                |
| 183         | Your incoming call status, __status: ringing__     |
| 200         | Your incoming call status, __status: answered, canceled, call ended__ |
| 1002        | You are already in a call                         |

## Reject Call

Reject an incoming call.

```js
monipy.reject();
```

#### HTTP status codes

| Status code | Description                                        |
| ---         | ---                                                |
| 200         | Your incoming call status, __status: hangup__      |
| 1002        | Currently, there are no ongoing calls              |

## Terminate Call

Hang up the ongoing call.

```js
monipy.terminate();
```

#### HTTP status codes

| Status code | Description                                        |
| ---         | ---                                                |
| 200         | Your ongoing call status, __status: hangup__       |
| 1002        | Currently, there are no ongoing calls              |

## Logout 

Logout from the MONIPY SDK.

```js
monipy.logout();
```

#### HTTP status codes

| Status code | Description                                        |
| ---         | ---                                                |
| 200         | You have logged out successfully                   |
| 1002        | To log out, you need to log in first               |

