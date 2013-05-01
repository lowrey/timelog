# timelog
------

This is a simple backbone.js webapp that was designed to use a PHP backend with minimal setup and external libraries.
Essentially, it is just a means of recording times from a web interface.  You can create an entry and the server will
log what time it was added and store it in a list that can be viewed later. 


This was primarily designed to be a simple example of how backbone.js can be used to sync data to a web service backend 
using a overriden sync method.For simplicity, data is synced with the server by a JSON file serialized by PHP. 
No database is required to run the app.  However,this means that it is not particularly well suited for concurrent 
users as no locking is ever done of the data to prevent state issues.

Tech
-----------

All javascript library dependencies are externally linked to generic CDNs.  These include:

  - JQuery 1.9.1
  - Backbone 1.0.0
  - Bootstrap (for desktop web UI)
  - JQuery Mobile (for mobile UI)

Installation
--------------

1. Extract to a web server that has PHP <=5.4
2. Ensure write permission is given to ./server (Data is stored on a file here)

License
-

MIT
  
    

