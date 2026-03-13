/**
 * Customizer Section navigation to particular website section.
 */
( function( api ) {

    api.sectionConstructor['pro-section'] = api.Section.extend( {

        attachEvents: function () {},

        isContextuallyActive: function () {
            return true;
        }
    } );

} )( wp.customize );
jQuery(document).ready(function($) {
    //Scroll to front page section
    $('body').on('click', '#sub-accordion-panel-frontpage_settings_panel .control-subsection .accordion-section-title', function(event) {
        var section_id = $(this).parent('.control-subsection').attr('id');
        scrollToSection( section_id );
    });

    function scrollToSection( section_id ){

        var preview_section_id = "banner-section";
    
        var $contents = jQuery('#customize-preview iframe').contents();
    
        switch ( section_id ) {
            case 'accordion-section-counter_section':
                preview_section_id = "front-counter";
            break;
            
            case 'accordion-section-about_section':
                preview_section_id = "front-about";
            break;

            case 'accordion-section-cta_section':
                preview_section_id = "front-cta";
            break;

            case 'accordion-section-testimonial_section':
                preview_section_id = "front-testimonial";
            break;

            case 'accordion-section-service_section':
            preview_section_id = "front-service";
            break;

            case 'accordion-section-workingstep_section':
                preview_section_id = "front-workingstep";
            break;
                        
            case 'accordion-section-contact_section':
                preview_section_id = "front-contact";
            break;

            case 'accordion-section-blog_section':
                preview_section_id = "front-blog";
            break;            
            
            case 'accordion-section-front_partner':
                preview_section_id = "front-partner";
            break;    
        }
    
        if( $contents.find('#'+preview_section_id).length > 0 && $contents.find('.home').length > 0 ){
            $contents.find("html, body").animate({
            scrollTop: $contents.find( "#" + preview_section_id ).offset().top
            }, 1000);
        }
    }

});