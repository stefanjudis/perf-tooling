( function() {
  /**
   * Cached essential elements
   * to avoid DOM queries
   *
   * @type {Object}
   */
  var elements = {
    body           : document.querySelector( 'body' ),
    main           : document.querySelector( 'main' ),
    modal          : document.getElementById( 'modal' ),
    modalContainer : document.getElementById( 'modalContainer' ),
    modalContent   : document.getElementById( 'modalContent' ),
    tabBtn         : document.getElementById( 'modalOpenTab' ),
    closeBtn       : document.getElementById( 'modalClose' )
  };


  /**
   * Init modal and add all needed events
   *
   * @param  {Object} options options
   */
  function initModal( options ) {
    /**
     * Close modal
     */
    function closeModal() {
      elements.main.setAttribute( 'aria-hidden', false );
      elements.modal.setAttribute( 'aria-hidden', true );

      elements.body.classList.remove( 'is-locked' );
      elements.modal.classList.remove( 'is-active' );
      elements.modal.classList.remove( 'is-loaded' );
      elements.modalContent.innerHTML = '';

      elements.body.removeEventListener( 'keydown', handleKeyDown );
      elements.modal.removeEventListener( 'click', closeModal );
      elements.closeBtn.removeEventListener( 'click', closeModal );

      elements.backLink.focus();
    }


    function handleKeyDown( event ) {
      if ( event.which === 27 ) {
          event.preventDefault();
          closeModal();
      }
    }

    if ( options.data ) {
      if ( options.elements.list ) {
        elements.list = document.querySelector( options.elements.list );

        elements.body.addEventListener( 'click', function( event ) {
          var target = event.target.tagName === 'A' ?
                        event.target :
                        event.target.parentNode;

          if ( target.dataset && target.dataset.modal !== undefined ) {
            if ( target.dataset.modalContentId ) {
              elements.backLink = event.target;

              showModalForListItem(
                event,
                options.data,
                target.title,
                target.dataset.modalContentId
              );

              elements.body.addEventListener( 'keydown', handleKeyDown );
              elements.modal.addEventListener( 'click', closeModal );
              elements.closeBtn.addEventListener( 'click', closeModal );
            }
          }
        } );

      }
    }
  }


  /**
   * Show modal for items on list pages
   *
   * @param  {Object} event     event
   * @param  {Array}  list      list of items
   * @param  {String} title     modal title
   * @param  {String} contentId id of to be shown item
   */
  function showModalForListItem( event, list, title, contentId ) {
    var filteredList = list.filter( function( item ) {
      return item.id === contentId;
    } );

    if ( filteredList.length && filteredList[ 0 ].html ) {
      event.preventDefault();

      elements.main.setAttribute( 'aria-hidden', true );

      elements.modalContainer.setAttribute( 'aria-label', title );
      elements.modal.setAttribute( 'aria-hidden', false );
      elements.modal.classList.add( 'is-active' );
      elements.modalContent.innerHTML = filteredList[ 0 ].html;
      elements.tabBtn.href = filteredList[ 0 ].url;

      var iframe = elements.modalContent.querySelector( 'iframe' );

      elements.body.classList.add( 'is-locked' );
      elements.modal.classList.add( 'is-loaded' );

      setTimeout( function() {
        elements.modalContainer.focus();
      }, 500  );
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
