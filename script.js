const resultArea = document.getElementById("result-area");
const form = document.querySelector(".input-form");
const input = document.getElementById("grabber");
const HTMLGenerator = ({
  login,
  avatar_url,
  bio,
  created_at,
  html_url,
  blog,
  location,
}) => {
  return ` <div class="result-card">
    <div class="user-main-wrapper">
        <div class="profile">
            <img src="${avatar_url}" alt="Github User Profile Picture">
        </div>  
        <div class="username" title="UserID">${login}</div>
        <div class="description" title="Bio">${bio === null ? "" : bio}</div>
    </div>
        <ul class="points">
            <li class="user-joined-date">Joined at: ${new Date(
              created_at
            ).toLocaleDateString()}</li>
            <li class="user-link"><a href="${html_url}" title="${html_url}" target="_blank">Github link</a></li>
            <li class="user-link"><a href="${
                blog === "" ? "#" : blog
            }" title="${
                blog === "" ? "Not Available" : blog
            }" target="${blog === "" ? "_self" : "_target" }">Blog link</a></li>
            <li class="user-location" title="Location">${
              location === null ? "Not available :(" : location
            }</li>
        </ul>

</div>
`;
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userName = input.value;
  const resultUser = await fetch(`https://api.github.com/users/${userName}`);
  const resultObj = await resultUser.json();
  const resultHTML = HTMLGenerator(resultObj);

  resultArea.innerHTML = "";
  resultArea.insertAdjacentHTML("beforeend", resultHTML);
});

// Search icon click
const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", function() {
    form.submit()
})