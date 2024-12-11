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
            }" title="${blog === "" ? "Not Available" : blog}" target="${
    blog === "" ? "_self" : "_target"
  }">Blog link</a></li>
            <li class="user-location" title="Location">${
              location === null ? "Not available :(" : location
            }</li>
        </ul>

</div>
`;
};
let currentUser;
const userList = new Array();
const userInList = (name) => {
  let requiredUser = null;
  for (const user of userList) {
    if (user.login.toLowerCase() !== name.toLowerCase()) continue;
    requiredUser = user;
    break;
  }
  return requiredUser;
};

let allowed = true;
async function submitData() {
  if (!allowed) return;

  const userName = input.value;

  if (currentUser?.login?.toLowerCase() === userName.toLowerCase()) return;
  let resultUser;
  let resultObj = userInList(userName);

  if (!resultObj) {
    resultUser = await fetch(`https://api.github.com/users/${userName}`);
    resultObj = await resultUser.json();
    if (resultObj.message === "Not Found") {
      alert("User not found");
      return;
    }
    userList.push(resultObj);
  }

  const resultHTML = HTMLGenerator(resultObj);
  currentUser = resultObj;

  resultArea.innerHTML = "";
  resultArea.insertAdjacentHTML("beforeend", resultHTML);

  // Don't run function for 1.5 sec
  allowed = false;
  setTimeout(() => {
    allowed = true;
  }, 1500);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitData();
  input.blur();
});

// Search icon click
const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", function () {
  submitData();
});
