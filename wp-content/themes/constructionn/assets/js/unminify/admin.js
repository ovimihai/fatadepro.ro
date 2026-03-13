/** 
 * Scripts for the editor and the admin dashboard
 */
ConPro = jQuery.noConflict();
ConPro(function($) {
    $(document).on('click', '.gl-custom-admin-notice .notice-dismiss', function() {
        $.ajax({
            url: constructionn_admin_data.ajax_url,
            type: 'POST',
            data: {
                action   : 'lfp_dismiss_admin_notice',
                nonce    : constructionn_admin_data.nonce
            },
            success: function(response) {
                if (response.success) {
                    $('.gl-custom-admin-notice').hide();
                }
            }
        });
    });
});