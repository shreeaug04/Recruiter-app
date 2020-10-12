function getRepos() {
  const username = $("#js-user-name").val();
  const url = `https://api.github.com/users/${username}/repos`;
  fetch(url)
    .then(response => {
       if (response.status >= 400 && response.status < 600) {
        throw new Error('Something went wrong!')
      }
      return response.json()
    })
    .then(responseJson => displayresults(responseJson))
    .catch(err => {
      displayErr(err.message)
    });
}

function displayErr(err){
  $('.results').html(`<div style='color:red'>${err}</div>`)
}

function displayresults(repos){
  let html = '';
  repos.forEach((repo, index) => {
    html += `<div><a target="_blank" href="${repo.svn_url}">${repo.full_name}</a></div>`
  })
  $('.results').html(html)
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(watchForm);