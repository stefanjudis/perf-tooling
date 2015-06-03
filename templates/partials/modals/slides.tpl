<div id="modal" class="modal" aria-hidden="true" role="dialog" data-modal-close>
  <div class="modal--loading"><span class="visuallyhidden">Loading the content</span></div>
  <div id="modalContainer" class="modal__container" tabindex="0">
    <div class="modal__inner">
      <button id="modalClose" class="modal__close" type="button" aria-label="Close modal" data-modal-close>
        <svg class="icon icon--black">
          <use xlink:href="<%= cdn %>/icons.svg?<%= hash.svg %>#icon-close" />
        </svg>
      </button>
      <div class="modal__content">
        <div id="modalContent" class="embed embed--3-2"></div>
      </div>
    </div>
  </div>
</div>
