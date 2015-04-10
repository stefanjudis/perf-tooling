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

        elements.modal.addEventListener( 'click', function( event ) {
          if ( event.target.dataset.modalClose !== undefined ) {
            elements.modal.classList.remove( 'is-active' );
            elements.modal.classList.remove( 'is-loaded' );
          }
        } );
      }
    }
  }


  function showModalForListItem( event, list, contentId ) {
    var filteredList = list.filter( function( item ) {
      return item.id === contentId;
    } );

    if ( filteredList.length && filteredList[ 0 ].html ) {
      event.preventDefault();

      elements.modal.classList.add( 'is-active' );
      elements.modalContent.innerHTML = filteredList[ 0 ].html;

      var iframe = elements.modalContent.querySelector( 'iframe' );

      iframe.addEventListener( 'load', function() {
        elements.modal.classList.add( 'is-loaded' );
      } );
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
