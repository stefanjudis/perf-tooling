<% if ( tags.length ) { %>
  <% var autoCompletionList = tags; %>

  <% if ( type === 'tools' && platforms.length ) { %>

    <%
      var platformsNames = platforms.map( function( platform ) {
        return platform.name;
      } );

      autoCompletionList = _.sortBy(
        autoCompletionList.concat( platformsNames ),
        function( a, b ) {
          return a.toLowerCase();
        }
      );
    %>

  <% } %>


  <datalist id="listElements">

    <% _.each( autoCompletionList, function( autoCompletion ) { %>

      <option value="<%= autoCompletion %>"><%= autoCompletion %></option>

    <% } ); %>

  </datalist>

<% } %>

<div class="form--search" role="search">

  <form method="get">

    <label class="form--search__label" for="fuzzzzzzzzzy">

      <svg class="form--search__icon icon icon--grey">
        <use xlink:href="/icons-<%= hash.svg %>.svg#icon-magnifier" />
      </svg>

      <input type="search" name="q" id="fuzzzzzzzzzy" class="form--search__input" title="Search inside of the list" placeholder="Search all <%= list.length %> <%= type %>" value="<%= query %>" list="listElements" autocapitalize="off" autocomplete="off">

    </label>

  </form>

</div>
