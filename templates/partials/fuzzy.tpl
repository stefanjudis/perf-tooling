<div class="fuzzy">
  <form method="get">
    <label class="fuzzy--label" for="fuzzzzzzzzzy">
      <svg class="fuzzy--icon">
        <use xlink:href="#icon-magnifier" />
      </svg>
      <input type="search" name="q" id="fuzzzzzzzzzy" class="fuzzy--input" title="Search inside of the list" placeholder="Search all <%= list.length %> <%= type %>" value="<%= query %>" list="listElements" autocompletion="on">
      <% if ( tags.length ) { %>
        <datalist id="listElements">
          <% _.each( tags, function( tag ) { %>
            <option value="<%= tag %>"><%= tag %></option>
          <% } ); %>
        </datalist>
      <% } %>
    </label>

  </form>
</div>
