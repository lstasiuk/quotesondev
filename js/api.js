(function($) {
    'use strict';
    var lastPage = '';
    $(window).on('popstate', function() {
        window.location.replace(lastPage);
    });

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
            lastPage = document.URL;

            history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);

            $('.entry-content').html(quote.content.rendered);
            $('.entry-title').html("&mdash; " + quote.title.rendered);

            if (quote._qod_quote_source_url.length) {

                $('.entry-meta .source').html('<a href="' + quote._qod_quote_source_url + '">' + quote._qod_quote_source + '</a>');

            } else {
                $('.entry-meta .source').html(quote._qod_quote_source)

            };
        });
    });

    $('#quote-submission-form input[type="submit"]').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            method: 'post',
            url: qod_vars.rest_url +
                'wp/v2/posts',
            data: {
                title: $("#quote-author").val(),
                content: $("#quote-content").val(),
                _qod_quote_source: $("#quote-source").val(),
                _qod_quote_source_url: $("#quote-source-url").val(),
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', qod_vars.wpapi_nonce);
            }
        }).done(function() {
            $('.quote-submission-wrapper').slideUp();
            $('.entry-title').append('<p> Thanks for the Quote !! </p>');
        }).fail(function() {
            alert('<p> Oops, something went terribly wrong !!</p>');
        });

    });


})(jQuery)