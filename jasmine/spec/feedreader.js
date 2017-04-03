$(function() {
    /* This is our first test suite - "RSS Feeds". This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test ensures that all feeds have a defined URL that is not empty.
         */
        it('has a defined URL that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* This test ensures that all feeds have a defined name that is not empty.
         */
        it('has a defined name that is not empty', function() {
             allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
             });
          });
    });

    /* New Test Suite - "The Menu" */
    describe('The Menu', function() {
        /* This test ensures that the menu button is hidden by default.
         */
        it('is hidden by default', function() {
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
         /* This test ensures that the menu displays when the menu button is clicked,
          * and hides when the menu button is clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
          /* Menu is visible */
          $('a.menu-icon-link').click();
          expect($(document.body).hasClass('menu-hidden')).toBe(false);
          /* Menu is hidden again */
          $('a.menu-icon-link').click();
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
    });

    /* New Test Suite - "Initial Entries" */
    describe('Initial Entires', function() {
        /* This test ensures that each feed has at least one entry.
        */
        
        /* Tests run only after loadFeed is completed */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
    
        it('has at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* New Test Suite - "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that content actually changes when a new feed is loaded,
         * and that it is not the same content as the inital feed.
         */
        var initialFeed;
        var newFeed;

        /* Tests run only after loadFeed is completed */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                    loadFeed(1, function() {
                        newFeed = $('.feed').html();
                        done();
                    });
             });
        });
    
        it('changes feed content when new feed is loaded', function() {
            expect(initialFeed).not.toEqual(newFeed);
        });
    });
}());
