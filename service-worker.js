/* Service worker voor de Huishoudplanner PWA.
 * Cachet de app-bestanden zodat alles ook offline werkt.
 * Verhoog CACHE_NAME bij een nieuwe versie om de cache te verversen. */

var CACHE_NAME = 'huishoudplanner-v2';
var ASSETS = [
	'./',
	'./index.html',
	'./manifest.webmanifest',
	'./icons/icon-192.png',
	'./icons/icon-512.png'
];

self.addEventListener( 'install', function ( event ) {
	event.waitUntil(
		caches.open( CACHE_NAME ).then( function ( cache ) {
			return cache.addAll( ASSETS );
		} )
	);
	self.skipWaiting();
} );

self.addEventListener( 'activate', function ( event ) {
	event.waitUntil(
		caches.keys().then( function ( keys ) {
			return Promise.all(
				keys.filter( function ( k ) { return k !== CACHE_NAME; } )
					.map( function ( k ) { return caches.delete( k ); } )
			);
		} )
	);
	self.clients.claim();
} );

self.addEventListener( 'fetch', function ( event ) {
	if ( event.request.method !== 'GET' ) { return; }
	event.respondWith(
		caches.match( event.request ).then( function ( cached ) {
			if ( cached ) { return cached; }
			return fetch( event.request ).then( function ( response ) {
				return response;
			} ).catch( function () {
				// Offline en niet in cache: val terug op de hoofdpagina.
				return caches.match( './index.html' );
			} );
		} )
	);
} );

self.addEventListener( 'notificationclick', function ( event ) {
	event.notification.close();
	event.waitUntil(
		self.clients.matchAll( { type: 'window', includeUncontrolled: true } ).then( function ( list ) {
			for ( var i = 0; i < list.length; i++ ) {
				if ( 'focus' in list[ i ] ) { return list[ i ].focus(); }
			}
			if ( self.clients.openWindow ) { return self.clients.openWindow( './index.html' ); }
		} )
	);
} );
