<ul class="tags">

  <% _.each( tags, function( tag ) { %>
    <li><a href="?q=<%= tag %>" title="<%= tag %>" data-fuzzy="<%= tag %>"><%= tag %></a>
  <% } );%>

</ul>
