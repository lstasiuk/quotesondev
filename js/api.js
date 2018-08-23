(function($) {
    'use strict';

    /**
     * Ajax-based random post fetching & History API
     */
    $('#new-quote-button').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'get',
            url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'


        }).done(function(data) {

            var quote = data.shift();

            $('.entry-content').html(quote.content.rendered);
            $('.entry-title').html("&mdash; " + quote.title.rendered);

            if (quote._qod_quote_source_url.length) {



                $('.entry-meta .source').html(
                    '<a href="' + quote._qod_quote_source_url + '">' + quote._qod_quote_source

                    +
                    '</a>'

                )
            } else {
                $('.entry-meta .source').html(quote._qod_quote_source)

            };
        });
    });


    /**
     * Ajax-based front-end post submissions.
     */

})(jQuery)