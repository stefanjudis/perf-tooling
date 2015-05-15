<% if ( tags.length ) { %>
  <% var autoCompletionList = tags; %>

  <% if ( type === 'tools' && platforms.length ) { %>

    <%
      autoCompletionList = _.sortBy(
        autoCompletionList.concat( platforms ),
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

      <svg class="form--search__icon">
        <use xlink:href="/icons-<%= hash.svg %>.svg#icon-magnifier" />
      </svg>

      <input type="search" name="q" id="fuzzzzzzzzzy" class="form--search__input" title="Search inside of the list" placeholder="Search all <%= list.length %> <%= type %>" value="<%= query %>" list="listElements" autocapitalize="off" autocomplete="off">

    </label>

  </form>

</div>
