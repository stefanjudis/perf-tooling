<ul class="tags">

  <% tags.forEach( tag => { %>
    <li><a href="?q=<%= tag %>" title="<%= tag %>" data-fuzzy="<%= tag %>"><%= tag %></a>
  <% } );%>

</ul>
