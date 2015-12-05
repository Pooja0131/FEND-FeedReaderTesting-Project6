/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*This suite is all about the RSS feeds definitions,
     the allFeeds variable in our application.*/
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable have been
        defined and that it is not empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object
         and ensures it has a URL defined and that the URL is
         not empty.*/
        it('urls(feed urls) are defined and not empty', function() {
            /* Loop throguh allFeeds, check each feedItem for valid URL
            (that it is defined, is of type string and has some content)*/
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toEqual('string');
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed in the allFeeds
         object and ensures it has a name defined
         and that the name is not empty.*/
        it('names(feed names) are defined and not empty', function() {
            /* Loop throguh allFeeds, check each feedItem for valid name
            (that it is defined, is of type string and has some content)*/
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    // Test suite named "The menu" 
    describe('The menu', function() {
        // Test that ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            var menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });

        /* Test that ensures the menu changes visibility when
         the menu icon is clicked. This test has two
         expectations: does the menu display when
         clicked and does it hide when clicked again.*/
        it('should show/hide when menu icon is clicked', function() {
            // Test the first click
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Test the first click
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // Test suite named "Initial Entries".
    describe('Initial Entries', function() {
        // Call the loadFeeds before each test
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /*Test that ensures when the loadFeed function is called
         and completes its work, there is at least a single .entry
         element within the .feed container.*/
        it('should have at least one entry in feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var previousTitle, previousContent, nextTitle, nextContent;
        // Call the loadFeeds before each test
        beforeEach(function(done) {
            loadFeed(0, function() {
                // Store the default values for comparison
                previousTitle = $('.header-title').html();
                previousContent = $('.feed').html();
                // Load feed 1 for comparison
                loadFeed(1, done);
            });
        });
        /* Test that ensures when a new feed is loaded by the
         loadFeed function that the content actually changes.*/
        it('should change the feed content', function() {
            // Store the new content for comparison
            nextTitle = $('.header-title').html();
            nextContent = $('.feed').html();
            /* Test that feed items(feed's title and its content)
            are different. */
            expect(nextTitle).not.toEqual(previousTitle);
            expect(nextContent).not.toEqual(previousContent);
        });
    });
}());