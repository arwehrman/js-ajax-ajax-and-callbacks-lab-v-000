$(document).ready(function () {
});

function displayError(){
  $("#errors").html("There's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerm = $("#searchTerms").val()
  const url = `https://api.github.com/search/repositories?q=${searchTerm}`

  $.get(url, function(response) {
    $("#results").html(renderSearchResults(response))

    }).fail(displayError())
}

function renderSearchResult(result) {
  return `
  <div>
    <h3><a href="${result.html_url}">${result.name}</a></h3>
    <p>Description: ${result.description}</p>
    <p>User: ${result.owner.login}</p>
    <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a>
  <div> `
}

function renderSearchResults(response){
   return response.items.map( result => renderSearchResult(result))
}


function renderCommits(data) {
  const result = data.map(commit => renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return  `<li><h3>${commit.sha}</h3>
        <p>${commit.commit.message}</p></li>`
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    $('#details').html(renderCommits(response))
  }).fail(error => {
    displayError()
  })
}
