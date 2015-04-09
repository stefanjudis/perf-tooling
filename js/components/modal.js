( function() {
  /**
   * Cached essential elements
   * to avoid DOM queries
   *
   * @type {Object}
   */
  var elements = {
    body         : document.querySelector( 'body' ),
    modal        : document.getElementById( 'modal' ),
    modalContent : document.getElementById( 'modalContent' )
  };


  function initModal( options ) {
    if ( options.data ) {
      if ( options.elements.list ) {
        elements.list = document.querySelector( options.elements.list );

        elements.body.addEventListener( 'click', function( event ) {
          if ( event.target.dataset.modal !== undefined ) {
            if ( event.target.dataset.modalContentId ) {
              showModalForListItem(
                event,
                options.data,
                event.target.dataset.modalContentId
              );
            }
          }
        } );
      }
    }
  }


  function showModalForListItem( event, list, contentId ) {
    var filteredList = list.filter( function( item ) {
      return item.id === contentId;
    } );

    console.log( filteredList );
    if ( filteredList.length && filteredList[ 0 ].html ) {
      event.preventDefault();

      elements.modalContent.innerHTML = filteredList[ 0 ].html;
    }
  }

  window.perfTooling = window.perfTooling || {};
  window.perfTooling.components = window.perfTooling.components || {};
  window.perfTooling.components.modal = {
    init   : function( options ) {
      initModal( options );
    }
  };
} )( window );
