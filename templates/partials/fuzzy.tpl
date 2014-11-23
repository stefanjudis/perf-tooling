<% if ( tags.length ) { %>

  <datalist id="listElements">

  <% if ( platforms.length ) { %>

    <% _.each( platforms, function( platform ) { %>

      <option value="<%= platform %>"><%= platform %></option>

    <% } ); %>

  <% } %>

  <% if ( tags.length ) { %>

    <% _.each( tags, function( tag ) { %>

      <option value="<%= tag %>"><%= tag %></option>

    <% } ); %>

  <% } %>

  </datalist>

<% } %>

<div class="fuzzy">

  <form method="get">

    <label class="fuzzy--label" for="fuzzzzzzzzzy">

      <svg class="fuzzy--icon">
        <use xlink:href="#icon-magnifier" />
      </svg>

      <input type="search" name="q" id="fuzzzzzzzzzy" class="fuzzy--input" title="Search inside of the list" placeholder="Search all <%= list.length %> <%= type %>" value="<%= query %>" list="listElements" autocomplete="off">

    </label>

  </form>

</div>
