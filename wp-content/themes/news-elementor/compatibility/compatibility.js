/**
 * Handles compatibility scripts
 * 
 */
jQuery(document).ready(function($){
    "use strict"
    let { ajaxUrl, _wpnonce, progressText, redirectingText, newsElementorKitAdminUrl } = newsElementorCompatibilityThemeInfoObject

    var container = $(".news-elementor-admin-notice")
    // install plugins
    container.on( "click", ".install-plugins", function() {
        var _this = $(this), plugins = ['elementor','news-kit-elementor-addons','news-kit-elementor-addons-pro'];
        for( let i = 0; i < plugins.length; i++ ) {
            if( plugins.length == i + 1 ) { 
                call_ajax_for_plugin_installation(plugins[i], false)
            } else {
                call_ajax_for_plugin_installation(plugins[i])
            }
        }
    })

    function call_ajax_for_plugin_installation(plugin, nextStep = true ) {
        var container = $(".news-elementor-admin-notice")
        $.ajax({
            url: ajaxUrl,
            type: 'post',
            async: false,
            data: {
                "action": "news_elementor_plugin_action",
                "_wpnonce": _wpnonce,
                "plugin": plugin
            },
            beforeSend: function () {
                container.find(".install-plugins").html('<span class="button-text">' + progressText + '</span>')
                container.find(".install-plugins").attr("disabled", true)
            },
            success: function(res) {
                var parsedRes = JSON.parse(res)
                if(parsedRes) {
                    container.find(".install-plugins").attr("disabled", false)
                    console.log(parsedRes)
                }
            },
            complete: function() {
                container.find(".install-plugins").html('<span class="button-text">' + redirectingText + '</span>')
                if( ! nextStep ) window.location.replace(newsElementorKitAdminUrl);
            }
        })
    }

    // dismiss notice
    container.on( "click", ".dismiss-notice", function(e) {
        e.preventDefault()
        var _this = $(this)
        $.ajax({
            url: ajaxUrl,
            method: "POST",
            data: {
                "action": 'news_elementor_admin_notice_ajax_call',
                "_wpnonce": _wpnonce
            },
            beforeSend: function(){
                _this.text( 'Dismissing...' )
            },
            success: function( result ) {
                var parsedResult = JSON.parse( result )
                if( parsedResult.status ) _this.parents( '.news-elementor-admin-notice' ).fadeOut()
            },
            complete: function() {
                _this.text( 'Dismissed' )
            }
        })
    })
})