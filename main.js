import { USERS } from "./consts/users.js";

// PAGES

const loginPage = document.querySelector(".login-page");
const adminPage = document.querySelector(".admin-page");
const brockerPage = document.querySelector(".brocker-page");
const loginInput = document.getElementById("login-input-login");
const passwordInput = document.getElementById("login-input-password");
const loginFormButton = document.getElementById("login-form-button");
const loginFormStatus = document.getElementById("login-form-status");
const adminNames = document.querySelectorAll(".admin-name");
const adminImgs = document.querySelectorAll(".admin-img");
const brockerNames = document.querySelectorAll(".brocker-name");
const brockerImgs = document.querySelectorAll(".brocker-img");
let currentSlideIndexAdmin = 0;

const userCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="));

if (userCookie) {
  const userObject = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
  if (userObject.role === "admin") {
    loginPage.classList.toggle("active");
    adminPage.classList.toggle("active");
    currentSlideIndexAdmin = 0;
    adminImgs.forEach((el) => {
      el.src = userObject.img;
    });
    adminNames.forEach((el) => {
      el.innerHTML = userObject.name;
    });
  } else if (userObject.role === "brocker") {
    loginPage.classList.toggle("active");
    brockerPage.classList.toggle("active");

    brockerImgs.forEach((el) => {
      el.src = userObject.img;
    });
    brockerNames.forEach((el) => {
      el.innerHTML = userObject.name;
    });
  }
  console.log(userObject);
} else {
  console.log("Кукі 'user' відсутнє.");
}

loginFormButton.addEventListener("click", (e) => {
  e.preventDefault();

  let login = loginInput.value;
  let password = passwordInput.value;

  if (!login || !password) {
    loginFormStatus.innerHTML = "Login and password are mandatory!";
    loginFormStatus.style.color = "red";
    return;
  }

  if (login.length < 5) {
    loginFormStatus.innerHTML = "Login must contain at least 5 characters";
    loginFormStatus.style.color = "red";
    return;
  }

  if (password.length < 6) {
    loginFormStatus.innerHTML = "Password must contain at least 6 characters";
    loginFormStatus.style.color = "red";
    return;
  }

  const user = USERS.find((el) => {
    return el.login === login && el.password === password;
  });

  if (user) {
    if (user.role === "admin") {
      // Cookies
      const currentUser = {
        name: user.name,
        role: user.role,
        img: user.imgUser,
      };
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(currentUser)
      )}; path=/;`;

      loginFormStatus.innerHTML = ". <br><br>";
      loginFormStatus.style.color = "transparent";

      currentSlideIndexAdmin = 0;
      adminImgs.forEach((el) => {
        el.src = user.imgUser;
      });
      adminNames.forEach((el) => {
        el.innerHTML = user.name;
      });

      loginPage.classList.toggle("active");
      adminPage.classList.toggle("active");

      loginInput.value = "";
      passwordInput.value = "";
      navButtons.forEach((el) => {
        el.classList.remove("focus");
      });

      navSite.forEach((el) => {
        el.classList.remove("active");
      });

      document.getElementById("nav-admin-set").classList.add("focus");
      document.getElementById("admin-Settings").classList.add("active");
    } else if (user.role === "brocker") {
      const currentUser = {
        name: user.name,
        role: user.role,
        img: user.imgUser,
      };
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(currentUser)
      )}; path=/;`;

      loginFormStatus.innerHTML = ". <br><br>";
      loginFormStatus.style.color = "transparent";
      currentSlideIndexBrocker = 0;

      brockerImgs.forEach((el) => {
        el.src = user.imgUser;
      });
      brockerNames.forEach((el) => {
        el.innerHTML = user.name;
      });

      loginPage.classList.toggle("active");
      brockerPage.classList.toggle("active");

      loginInput.value = "";
      passwordInput.value = "";

      navButtons.forEach((el) => {
        el.classList.remove("focus");
      });

      navSite.forEach((el) => {
        el.classList.remove("active");
      });

      document.getElementById("nav-brocker-set").classList.add("focus");
      document.getElementById("brocker-settings").classList.add("active");
    }
  } else {
    loginFormStatus.innerHTML = "Incorrect login or password";
    loginFormStatus.style.color = "red";
    return;
  }
});

const logOutButton = document.querySelectorAll(".log-out");

function logOut(e) {
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  let parent = e.target.closest("section");
  parent.classList.toggle("active");
  loginPage.classList.toggle("active");
  loginFormStatus.innerHTML = ". <br><br>";
  loginFormStatus.style.color = "transparent";
}

logOutButton.forEach((el) => {
  el.addEventListener("click", logOut);
});

// SWIPER ADMIN

const buttonPrevAdmin = document.querySelector(
  ".contols-admin-button-swiper-left"
);
const buttonNextAdmin = document.querySelector(
  ".contols-admin-button-swiper-right"
);
const slidesAdmin = document.querySelectorAll(".slider-admin-wrapper-slide");

function showSlideAdmin() {
  slidesAdmin[currentSlideIndexAdmin].classList.add("active");
}

function hideSlideAdmin() {
  slidesAdmin[currentSlideIndexAdmin].classList.remove("active");
}

function initializeSliderAdmin() {
  slidesAdmin.forEach((el) => el.classList.remove("active"));
  showSlideAdmin();
}

function nextSlideAdmin() {
  hideSlideAdmin();
  currentSlideIndexAdmin++;
  if (currentSlideIndexAdmin > slidesAdmin.length - 1) {
    currentSlideIndexAdmin = 0;
  }

  showSlideAdmin();
}

function prevSlideAdmin() {
  hideSlideAdmin();
  currentSlideIndexAdmin--;
  if (currentSlideIndexAdmin < 0) {
    currentSlideIndexAdmin = slidesAdmin.length - 1;
  }
  showSlideAdmin();
}

initializeSliderAdmin();

buttonNextAdmin.addEventListener("click", nextSlideAdmin);
buttonPrevAdmin.addEventListener("click", prevSlideAdmin);

// Navigation

const navButtons = document.querySelectorAll(".nav-button");
const navSite = document.querySelectorAll(".nav-site");

navButtons.forEach((el) => {
  el.addEventListener("click", (e) => {
    const tabsTarget = e.target.getAttribute("data-nav");

    navButtons.forEach((el) => {
      el.classList.remove("focus");
    });

    navSite.forEach((el) => {
      el.classList.remove("active");
    });

    document.getElementById(tabsTarget).classList.add("active");

    e.target.classList.add("focus");
  });
});

const RepButtons = document.querySelectorAll(".nav-rep-button");
const navRep = document.getElementById("nav-admin-rep");

RepButtons.forEach((el) => {
  el.addEventListener("click", () => {
    navButtons.forEach((el) => {
      el.classList.remove("focus");
    });
    navSite.forEach((el) => {
      el.classList.remove("active");
    });

    navRep.classList.add("focus");
    document.getElementById("admin-Reports").classList.add("active");
  });
});

// REPORTS tabs

const admincurentSection = document.querySelector(".admin-curent-section");
const adminReportsTabsButtons = document.querySelectorAll(
  ".reports-tabs-title-admin"
);
const reportsAdminTabsContent = document.querySelectorAll(
  ".reports-tabs-сontent-admin"
);

adminReportsTabsButtons.forEach((el) => {
  el.addEventListener("click", (e) => {
    adminReportsTabsButtons.forEach((el) => {
      el.classList.remove("active");
    });
    reportsAdminTabsContent.forEach((el) => {
      el.classList.remove("active");
    });

    admincurentSection.innerHTML = e.target.innerHTML;
    let contentId = e.target.getAttribute("data-reports");

    el.classList.add("active");
    document.getElementById(contentId).classList.add("active");
  });
});

import { businessAll } from "./consts/business.js";

const containerForBusinessCards = document.getElementById(
  "place-for-business-card"
);

function updateContainerForBusinessCards() {
  containerForBusinessCards.innerHTML = "";

  businessAll.forEach((el) => {
    containerForBusinessCards.innerHTML += `
                <div class="business-list-container-card">
                  <div class="business-list-container-card-text">${el.idCompany}</div>
                  <div class="business-list-container-card-text">${el.companyName}</div>
                  <div class="business-list-container-card-text">${el.polices}</div>
                  <div class="business-list-container-card-text">${el.request}</div>
                  <div class="business-list-container-card-text">${el.employees}</div>
                  <div class="business-list-container-card-text underline">${el.notes}</div>
                  <div class="business-list-container-card-text underline">${el.alerts}</div>
                  <div class="business-list-container-card-text underline">${el.agent}</div>
                  <div class="business-list-container-card-text">
                    <div class="business-list-container-card-text-details">Details</div>
                  </div>
                </div>
  
    `;
  });
}

updateContainerForBusinessCards();

const openBusinessMenu = document.getElementById("open-Business-Menu");
const closeBusinessMenu = document.getElementById("close-Business-Menu");
const addBusiness = document.getElementById("add-Business-Menu");
// const BusinessMenuContainer = document.querySelector(
//   ".add-to-business-list-container"
// );
const inputsBusinessMenu = document.querySelectorAll(".inputs-business-list");
const BusinessMenu = document.getElementById("Business-Menu");
const BusinessMenuAlarmButton = document.querySelector(
  ".business-list-add-alarm"
);

// BusinessMenu.addEventListener('click' , ()=>{
//   BusinessMenu.classList.toggle('active');
// })

openBusinessMenu.addEventListener("click", () => {
  BusinessMenu.classList.toggle("active");
});

closeBusinessMenu.addEventListener("click", () => {
  BusinessMenu.classList.toggle("active");
  BusinessMenuAlarmButton.innerHTML = "ㅤ";
});

function addBusinessCard() {
  let isEmpty = false;

  inputsBusinessMenu.forEach((input) => {
    if (!input.value) {
      BusinessMenuAlarmButton.innerHTML = "All fields must be filled in";
      isEmpty = true;
    }
  });

  if (isEmpty) return;

  businessAll.push({
    idCompany: inputsBusinessMenu[0].value,
    companyName: inputsBusinessMenu[1].value,
    polices: inputsBusinessMenu[2].value,
    request: inputsBusinessMenu[3].value,
    employees: inputsBusinessMenu[4].value,
    notes: inputsBusinessMenu[5].value,
    alerts: inputsBusinessMenu[6].value,
    agent: inputsBusinessMenu[7].value,
  });
  BusinessMenu.classList.toggle("active");
  updateContainerForBusinessCards();
  inputsBusinessMenu.forEach((el) => {
    el.value = "";
  });
}

addBusiness.addEventListener("click", () => {
  addBusinessCard();
  openSortBusinessList.classList.remove("active");
});

// Business-Sorting

const sortBusinessList = document.getElementById("sort-business-list");
const doSortingBusinessList = document.getElementById("do-sort-business-list");
const closeSortBusinessList = document.getElementById(
  "close-sort-business-list"
);
const openSortBusinessList = document.getElementById("open-sort-business-list");
const selectSortingBusinessValue = document.getElementById(
  "sort-by-business-list"
);
const selectOptionsSortingBusinessValue = document.getElementById(
  "order-business-list"
);

openSortBusinessList.addEventListener("click", () => {
  sortBusinessList.classList.toggle("active");
});

closeSortBusinessList.addEventListener("click", () => {
  sortBusinessList.classList.toggle("active");
});

function sortBusinessArray(array, key, order = "up") {
  return array.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Перевірка, чи є значення числами
    if (!isNaN(aValue) && !isNaN(bValue)) {
      // Якщо обидва значення числа, сортуємо числово
      return order === "up" ? aValue - bValue : bValue - aValue;
    } else {
      // Якщо значення - рядки, порівнюємо їх лексикографічно, ігноруючи регістр
      return order === "up"
        ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
        : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
    }
  });
}

doSortingBusinessList.addEventListener("click", () => {
  const sortByValue = selectSortingBusinessValue.value;
  const sortOptions = selectOptionsSortingBusinessValue.value;

  const startArray = businessAll;

  const sortedBusinessArray = sortBusinessArray(
    startArray,
    sortByValue,
    sortOptions
  );

  updateContainerForBusinessCards();

  openSortBusinessList.classList.add("active");
  sortBusinessList.classList.toggle("active");
});

// Delete Menu(Business)

const openBusinessDeleteMenu = document.getElementById(
  "open-Business-delete-menu"
);
const closeBusinessMenuButton = document.getElementById(
  "close-business-delete-menu"
);
const alarmBusinessMenuDelete = document.querySelector(
  ".alarm-delete-business-menu"
);
const deleteMenuBusiness = document.getElementById("delete-menu-business");
const deleteBusinessMenuInput = document.getElementById(
  "delete-business-menu-input"
);

const deleteBusinessButton = document.getElementById("delete-business-button");

openBusinessDeleteMenu.addEventListener("click", () => {
  deleteMenuBusiness.classList.toggle("active");
});
closeBusinessMenuButton.addEventListener("click", () => {
  deleteMenuBusiness.classList.toggle("active");
  alarmBusinessMenuDelete.classList.remove("succes");
  alarmBusinessMenuDelete.innerHTML = "ㅤ";
  deleteBusinessMenuInput.value = "";
});

function removeCompanyById(inputValue) {
  const index = businessAll.findIndex(
    (business) => business.idCompany === inputValue
  );

  if (index !== -1) {
    businessAll.splice(index, 1);
    return true; // Елемент знайдено та видалено
  }
  alarmBusinessMenuDelete.classList.remove("succes");
  alarmBusinessMenuDelete.innerHTML = "There is no business with such an ID";
}

deleteBusinessButton.addEventListener("click", () => {
  const valueInputIdCompany = deleteBusinessMenuInput.value;
  alarmBusinessMenuDelete.classList.remove("succes");
  deleteBusinessMenuInput.value = "";

  if (!valueInputIdCompany) {
    alarmBusinessMenuDelete.innerHTML = "The field cannot be empty";
    return;
  } else if (
    !businessAll.some((business) => business.idCompany === valueInputIdCompany)
  ) {
    alarmBusinessMenuDelete.classList.remove("succes");
    alarmBusinessMenuDelete.innerHTML = "Business not found!";
  } else {
    removeCompanyById(valueInputIdCompany);
    updateContainerForBusinessCards();
    alarmBusinessMenuDelete.classList.add("succes");
    alarmBusinessMenuDelete.innerHTML = "Business Deleted!";
    deleteBusinessMenuInput.value = "";
  }
});

// Customers

import { customersAdmin } from "./consts/customersAdmin.js";

const containerForCustomersCards = document.getElementById(
  "place-for-customer-card"
);

function updateContainerForCustomerCards() {
  containerForCustomersCards.innerHTML = "";

  customersAdmin.forEach((el) => {
    containerForCustomersCards.innerHTML += `
              <div class="customer-list-container-card">
                <div class="customer-list-container-card-text">${el.IdEmployee}</div>
                <div class="customer-list-container-card-text" style="max-width: 210px;">${el.name}</div>
                <div class="customer-list-container-card-text">${el.phone}</div>
                <div class="customer-list-container-card-text">${el.country}</div>
                <div class="customer-list-container-card-status-block ${el.status}">${el.status}</div>
                <div class="customer-list-container-card-text underline">${el.notes}</div>
                <div class="customer-list-container-card-text underline">${el.alerts}</div>
                <div class="customer-list-container-card-text underline">${el.agent}</div>
                <div class="customer-list-container-card-text">
                  <div class="customer-list-container-card-text-details">Details</div>
                </div>
              </div>
    `;
  });
}

updateContainerForCustomerCards();

// Add customer

const openAddCustomerMenu = document.getElementById("open-Customer-Menu");
const closeAddCustomerMenu = document.getElementById("close-customer-Menu");
const customerAddMenu = document.getElementById("Customers-Add-Menu");
const customerAddMenuAlarm = document.querySelector(
  ".customers-list-add-alarm"
);
const addCustomer = document.getElementById("add-customer-Menu");
const addCustomersInputs = document.querySelectorAll(
  ".customer-list-container-card-text-input"
);

openAddCustomerMenu.addEventListener("click", () => {
  customerAddMenu.classList.toggle("active");
});

closeAddCustomerMenu.addEventListener("click", () => {
  customerAddMenu.classList.toggle("active");
  customerAddMenuAlarm.innerHTML = "ㅤ";
});

function addCustomerCard() {
  let isEmpty = false;

  addCustomersInputs.forEach((input) => {
    if (!input.value) {
      customerAddMenuAlarm.innerHTML = "All fields must be filled in";
      isEmpty = true;
    }
  });

  if (isEmpty) return;

  customersAdmin.push({
    IdEmployee: addCustomersInputs[0].value,
    name: addCustomersInputs[1].value,
    phone: addCustomersInputs[2].value,
    country: addCustomersInputs[3].value,
    status: addCustomersInputs[4].value,
    notes: addCustomersInputs[5].value,
    alerts: addCustomersInputs[6].value,
    agent: addCustomersInputs[7].value,
  });
  customerAddMenu.classList.toggle("active");
  updateContainerForCustomerCards();
  addCustomersInputs.forEach((el) => {
    el.value = "";
  });
}

addCustomer.addEventListener("click", () => {
  addCustomerCard();
  openSortCustomerList.classList.remove("active");
});

// Delete Customer

const openCustomerDeleteMenu = document.getElementById(
  "open-customer-delete-menu"
);
const closeCustomerMenuButton = document.getElementById(
  "close-customer-delete-menu"
);
const alarmCustomerMenuDelete = document.querySelector(
  ".alarm-delete-customer-menu"
);
const deleteMenuCustomer = document.getElementById("delete-menu-customer");
const deleteCustomerMenuInput = document.getElementById(
  "delete-customer-menu-input"
);

const deleteCustomerButton = document.getElementById("delete-customer-button");

openCustomerDeleteMenu.addEventListener("click", () => {
  deleteMenuCustomer.classList.toggle("active");
});
closeCustomerMenuButton.addEventListener("click", () => {
  deleteMenuCustomer.classList.toggle("active");
  alarmCustomerMenuDelete.classList.remove("succes");
  alarmCustomerMenuDelete.innerHTML = "ㅤ";
  deleteCustomerMenuInput.value = "";
});

function removeCustomerById(inputValue) {
  const index = customersAdmin.findIndex(
    (customer) => customer.IdEmployee === inputValue
  );

  if (index !== -1) {
    customersAdmin.splice(index, 1);
    return true; // Елемент знайдено та видалено
  }
  alarmCustomerMenuDelete.classList.remove("succes");
  // alarmCustomerMenuDelete.innerHTML = "There is no Customer with such an ID";
}

deleteCustomerButton.addEventListener("click", () => {
  const valueInputIdCompany = deleteCustomerMenuInput.value;
  alarmCustomerMenuDelete.classList.remove("succes");
  deleteCustomerMenuInput.value = "";

  if (!valueInputIdCompany) {
    alarmCustomerMenuDelete.innerHTML = "The field cannot be empty";
    return;
  } else if (
    !customersAdmin.some(
      (customer) => customer.IdEmployee === valueInputIdCompany
    )
  ) {
    alarmCustomerMenuDelete.classList.remove("succes");
    alarmCustomerMenuDelete.innerHTML = "Customer not found!";
  } else {
    removeCustomerById(valueInputIdCompany);
    updateContainerForCustomerCards();
    alarmCustomerMenuDelete.classList.add("succes");
    alarmCustomerMenuDelete.innerHTML = "Customer Deleted!";
    deleteCustomerMenuInput.value = "";
  }
});

//Sorting Customers

const sortCustomerList = document.getElementById("sort-customer-list");
const doSortingCustomerList = document.getElementById("do-sort-customer-list");
const closeSortCustomerList = document.getElementById(
  "close-sort-customer-list"
);
const openSortCustomerList = document.getElementById("open-sort-customer-list");
// console.log(openSortCustomerList)
const selectSortingCustomerValue = document.getElementById(
  "sort-by-customer-list"
);
const selectOptionsSortingCustomerValue = document.getElementById(
  "order-customer-list"
);

openSortCustomerList.addEventListener("click", () => {
  sortCustomerList.classList.toggle("active");
});

closeSortCustomerList.addEventListener("click", () => {
  sortCustomerList.classList.toggle("active");
});

function sortCustomerArray(array, key, order = "up") {
  return array.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Перевірка, чи є значення числами
    if (!isNaN(aValue) && !isNaN(bValue)) {
      // Якщо обидва значення числа, сортуємо числово
      return order === "up" ? aValue - bValue : bValue - aValue;
    } else {
      // Якщо значення - рядки, порівнюємо їх лексикографічно, ігноруючи регістр
      return order === "up"
        ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
        : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
    }
  });
}

doSortingCustomerList.addEventListener("click", () => {
  const sortByValue = selectSortingCustomerValue.value;
  const sortOptions = selectOptionsSortingCustomerValue.value;

  const startArray = customersAdmin;

  const sortedBusinessArray = sortCustomerArray(
    startArray,
    sortByValue,
    sortOptions
  );

  // console.log(customersAdmin)

  updateContainerForCustomerCards();

  openSortCustomerList.classList.add("active");
  sortCustomerList.classList.toggle("active");
});

// BROCKER slider

const buttonPrevBrocker = document.querySelector(
  ".contols-brocker-button-swiper-left"
);
const buttonNextBrocker = document.querySelector(
  ".contols-brocker-button-swiper-right"
);
const slidesBrocker = document.querySelectorAll(
  ".slider-brocker-wrapper-slide"
);

let currentSlideIndexBrocker = 0;

function showSlideBrocker() {
  slidesBrocker[currentSlideIndexBrocker].classList.add("active");
}

function hideSlideBrocker() {
  slidesBrocker[currentSlideIndexBrocker].classList.remove("active");
}

function initializeSliderBrocker() {
  slidesBrocker.forEach((el) => el.classList.remove("active"));
  showSlideBrocker();
}

function nextSlideBrocker() {
  hideSlideBrocker();
  currentSlideIndexBrocker++;
  if (currentSlideIndexBrocker > slidesBrocker.length - 1) {
    currentSlideIndexBrocker = 0;
  }

  showSlideBrocker();
}

function prevSlideBrocker() {
  hideSlideBrocker();
  currentSlideIndexBrocker--;
  if (currentSlideIndexBrocker < 0) {
    currentSlideIndexBrocker = slidesBrocker.length - 1;
  }
  showSlideBrocker();
}

initializeSliderBrocker();

buttonNextBrocker.addEventListener("click", nextSlideBrocker);
buttonPrevBrocker.addEventListener("click", prevSlideBrocker);

// Brocker tabs

const brockercurentSection = document.querySelector(".brocker-curent-section");
const brockerReportsTabsButtons = document.querySelectorAll(
  ".reports-tabs-title-brocker"
);
const reportsBrockerTabsContent = document.querySelectorAll(
  ".reports-tabs-content-brocker"
);

brockerReportsTabsButtons.forEach((el) => {
  el.addEventListener("click", (e) => {
    brockerReportsTabsButtons.forEach((el) => {
      el.classList.remove("active");
    });
    reportsBrockerTabsContent.forEach((el) => {
      el.classList.remove("active");
    });

    brockercurentSection.innerHTML = e.target.innerHTML;
    let contentId = e.target.getAttribute("data-reports");
    // console.log(contentId)

    el.classList.add("active");
    document.getElementById(contentId).classList.add("active");
  });
});

// updateContainer customer

import { customersBrocker } from "./consts/customersBrocker.js";

const containerForBrockerCustomers = document.getElementById(
  "place-for-brocker-customers"
);

function updateContainerForBrockerCustomers() {
  containerForBrockerCustomers.innerHTML = "";

  customersBrocker.forEach((el) => {
    containerForBrockerCustomers.innerHTML += `
                  <div class="container-for-content" id="place-for-brocker-customers">
                    <div class="business-list-container-card">
                      <div class="business-list-container-card-text">${el.idCustomer}</div>
                      <div class="business-list-container-card-text" style="max-width: 170px;">${el.customerName}</div>
                      <div class="business-list-container-card-text" style="max-width: 140px;">${el.polica}</div>
                      <div class="business-list-container-card-text" style="max-width: 133px;">${el.lastUpdate}</div>
                      <div class="business-list-container-card-text" style="max-width: 201px;width: 100%;">Annual Till: ${el.type}</div>
                      <div class="business-list-container-card-text" style="max-width: 115px;">${el.status}</div>
                      <div class="business-list-container-card-text">${el.phone}</div>
                      <div class="business-list-container-card-text underline" style="max-width: 100px;text-align: center;">${el.task}</div>
                      <div class="business-list-container-card-text">
                        <div class="business-list-container-card-text-details">Details</div>
                      </div>
                    </div>
                  </div>   
    `;
  });
}

updateContainerForBrockerCustomers();

// sort CustomerBrocker

const sortCustomerBrockerList = document.getElementById(
  "sort-customer-brocker-list"
);
const doSortingCustomerBrockerList = document.getElementById(
  "do-sort-customer-brocker-list"
);
const closeSortCustomerBrockerList = document.getElementById(
  "close-sort-customer-brocker-list"
);
const openSortCustomerBrockerList = document.getElementById(
  "open-sort-customer-brocker-list"
);
const selectSortingCustomerBrockerValue = document.getElementById(
  "sort-by-customer-brocker-list"
);
const selectOptionsSortingCustomerBrockerValue = document.getElementById(
  "order-customer-brocker-list"
);

openSortCustomerBrockerList.addEventListener("click", () => {
  sortCustomerBrockerList.classList.toggle("active");
});

closeSortCustomerBrockerList.addEventListener("click", () => {
  sortCustomerBrockerList.classList.toggle("active");
});

function sortCustomerBrockerArray(array, key, order = "up") {
  return array.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return order === "up" ? aValue - bValue : bValue - aValue;
    }

    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (datePattern.test(aValue) && datePattern.test(bValue)) {
      const dateA = new Date(aValue.split("-").reverse().join("-"));
      const dateB = new Date(bValue.split("-").reverse().join("-"));
      return order === "up" ? dateA - dateB : dateB - dateA;
    }

    return order === "up"
      ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
      : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
  });
}

doSortingCustomerBrockerList.addEventListener("click", () => {
  const sortByValue = selectSortingCustomerBrockerValue.value;
  const sortOptions = selectOptionsSortingCustomerBrockerValue.value;

  const startArray = customersBrocker;

  const sortedBusinessArray = sortCustomerBrockerArray(
    startArray,
    sortByValue,
    sortOptions
  );

  console.log(sortedBusinessArray);

  updateContainerForBrockerCustomers();

  openSortCustomerBrockerList.classList.add("active");
  sortCustomerBrockerList.classList.toggle("active");
});

// Delete CustomerBrocker

const openCustomerBrockerDeleteMenu = document.getElementById(
  "open-customer-brocker-delete-menu"
);
const closeCustomerBrockerMenuButton = document.getElementById(
  "close-customer-brocker-delete-menu"
);
const alarmCustomerBrockerMenuDelete = document.querySelector(
  ".alarm-delete-customer-brocker-menu"
);
const deleteMenuBrockerCustomer = document.getElementById(
  "delete-menu-brocker-customer"
);
const deleteCustomerBrockerMenuInput = document.getElementById(
  "delete-customer-menu-brocker-input"
);

const deleteCustomerBrockerButton = document.getElementById(
  "delete-customer-brocker-button"
);

openCustomerBrockerDeleteMenu.addEventListener("click", () => {
  deleteMenuBrockerCustomer.classList.toggle("active");
});
closeCustomerBrockerMenuButton.addEventListener("click", () => {
  deleteMenuBrockerCustomer.classList.toggle("active");
  alarmCustomerBrockerMenuDelete.classList.remove("succes");
  alarmCustomerBrockerMenuDelete.innerHTML = "ㅤ";
  deleteCustomerBrockerMenuInput.value = "";
});

function removeCustomerBrockerById(inputValue) {
  const index = customersBrocker.findIndex(
    (customer) => customer.idCustomer === inputValue
  );

  if (index !== -1) {
    customersBrocker.splice(index, 1);
    return true; // Елемент знайдено та видалено
  }
  alarmCustomerBrockerMenuDelete.classList.remove("succes");
  // alarmCustomerBrockerMenuDelete.innerHTML = "There is no Customer with such an ID";
}

deleteCustomerBrockerButton.addEventListener("click", () => {
  const valueInputIdCustomer = deleteCustomerBrockerMenuInput.value;
  alarmCustomerBrockerMenuDelete.classList.remove("succes");
  deleteCustomerBrockerMenuInput.value = "";

  if (!valueInputIdCustomer) {
    alarmCustomerBrockerMenuDelete.innerHTML = "The field cannot be empty";
    return;
  } else if (
    !customersBrocker.some(
      (customer) => customer.idCustomer === valueInputIdCustomer
    )
  ) {
    alarmCustomerBrockerMenuDelete.classList.remove("succes");
    alarmCustomerBrockerMenuDelete.innerHTML = "Customer not found!";
  } else {
    removeCustomerBrockerById(valueInputIdCustomer);
    updateContainerForBrockerCustomers();
    alarmCustomerBrockerMenuDelete.classList.add("succes");
    alarmCustomerBrockerMenuDelete.innerHTML = "Customer Deleted!";
    deleteCustomerBrockerMenuInput.value = "";
  }
});

// Add Customer-brocker

const openAddCustomerBrockerMenu = document.getElementById(
  "open-Customer-brocker-Menu"
);
const closeAddCustomerBrockerMenu = document.getElementById(
  "close-customer-brocker-Menu"
);
const customerBrockerAddMenu = document.getElementById(
  "Customers-brocker-Add-Menu"
);
const customerBrockerAddMenuAlarm = document.querySelector(
  ".customers-brocker-list-add-alarm"
);
const addBrockerCustomer = document.getElementById("add-customer-brocker-Menu");

const addBrockerCustomersInputs = document.querySelectorAll(
  ".brocker-customer-list-container-card-text-input"
);

console.log(addBrockerCustomersInputs);

openAddCustomerBrockerMenu.addEventListener("click", () => {
  customerBrockerAddMenu.classList.toggle("active");
});

closeAddCustomerBrockerMenu.addEventListener("click", () => {
  customerBrockerAddMenu.classList.toggle("active");
  customerBrockerAddMenuAlarm.innerHTML = "ㅤ";
});

function addBrockerCustomerCard() {
  let isEmpty = false;

  // Проверяем, что все поля заполнены
  addBrockerCustomersInputs.forEach((input) => {
    if (!input.value) {
      console.log(input);
      customerBrockerAddMenuAlarm.innerHTML = "All fields must be filled in";
      isEmpty = true;
    }
  });

  if (isEmpty) return;

  // Получаем дату из инпутов (предположим, что инпуты для даты это input[3] и input[4])
  const inputDate1 = addBrockerCustomersInputs[3].value; // Дата из первого инпута
  const inputDate2 = addBrockerCustomersInputs[4].value; // Дата из второго инпута

  // Преобразуем дату из формата YYYY-MM-DD (если необходимо) в формат DD-MM-YYYY
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${String(day).padStart(2, "0")}-${String(month).padStart(
      2,
      "0"
    )}-${year}`; // Формат DD-MM-YYYY
  };

  // Применяем форматирование
  const formattedDate1 = formatDate(inputDate1); // Дата первого инпута
  const formattedDate2 = formatDate(inputDate2); // Дата второго инпута

  // Добавляем данные в массив customersBrocker
  customersBrocker.push({
    idCustomer: addBrockerCustomersInputs[0].value,
    customerName: addBrockerCustomersInputs[1].value,
    polica: addBrockerCustomersInputs[2].value,
    lastUpdate: formattedDate1, // Используем отформатированную дату из первого инпута
    type: formattedDate2, // Используем отформатированную дату из второго инпута
    status: addBrockerCustomersInputs[5].value,
    phone: addBrockerCustomersInputs[6].value,
    task: addBrockerCustomersInputs[7].value,
  });

  // Закрываем меню и обновляем контейнер
  customerBrockerAddMenu.classList.toggle("active");
  updateContainerForBrockerCustomers();

  // Очищаем все поля ввода
  addBrockerCustomersInputs.forEach((el) => {
    el.value = ""; // Очищаем поля ввода, если необходимо
  });
}

addBrockerCustomer.addEventListener("click", () => {
  addBrockerCustomerCard();
  openSortCustomerBrockerList.classList.remove("active");
});

import { BrockerMeetings } from "./consts/brockerMeetings.js";

const containerForMeetings = document.querySelector(
  ".container-for-brocker-myMeetings"
);
const editBrockerMeetings = document.querySelector(".editBrockerMeetings");

const openEditBrockerMenu = document.getElementById(
  "brocker-button-edit-meeting"
);
const closeEditBrockerMenu = document.getElementById(
  "brocker-meeting-edit-buttonClose"
);
const brockerEditMenu = document.getElementById(
  "brocker-myProfile-myMeetings-openEdit"
);
const updateButton = document.getElementById("updateButton");
let allInputs;
openEditBrockerMenu.addEventListener("click", () => {
  brockerEditMenu.classList.toggle("active");
});

closeEditBrockerMenu.addEventListener("click", () => {
  brockerEditMenu.classList.toggle("active");
});

function invertColor(hex) {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }
  
  let invertedColor = (parseInt(hex, 16) ^ 0xFFFFFF).toString(16).padStart(6, "0");
  return invertedColor.toUpperCase();
}

function updateContainerForMeetings() {
  containerForMeetings.innerHTML = "";
  editBrockerMeetings.innerHTML = "";

  containerForMeetings.innerHTML = `
                      <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Sunday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][0].backgroundColor};">
                            ${BrockerMeetings[0][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][1].backgroundColor};">
                            ${BrockerMeetings[0][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][2].backgroundColor};">
                            ${BrockerMeetings[0][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][3].backgroundColor};">
                            ${BrockerMeetings[0][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][4].backgroundColor};">
                            ${BrockerMeetings[0][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[0][5].backgroundColor};">
                            ${BrockerMeetings[0][5].value}
                            </div>
                          </div>
                      </div>
                     </div>
                          <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Monday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][0].backgroundColor};">
                            ${BrockerMeetings[1][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][1].backgroundColor};">
                            ${BrockerMeetings[1][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][2].backgroundColor};">
                            ${BrockerMeetings[1][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][3].backgroundColor};">
                            ${BrockerMeetings[1][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][4].backgroundColor};">
                            ${BrockerMeetings[1][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[1][5].backgroundColor};">
                            ${BrockerMeetings[1][5].value}
                            </div>
                          </div>
                      </div> 
                     </div>
                          <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Tuesday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][0].backgroundColor};">
                            ${BrockerMeetings[2][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][1].backgroundColor};">
                            ${BrockerMeetings[2][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][2].backgroundColor};">
                            ${BrockerMeetings[2][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][3].backgroundColor};">
                            ${BrockerMeetings[2][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][4].backgroundColor};">
                            ${BrockerMeetings[2][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[2][5].backgroundColor};">
                            ${BrockerMeetings[2][5].value}
                            </div>
                          </div>
                      </div> 
                     </div>
                          <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Wednesday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][0].backgroundColor};">
                            ${BrockerMeetings[3][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][1].backgroundColor};">
                            ${BrockerMeetings[3][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][2].backgroundColor};">
                            ${BrockerMeetings[3][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][3].backgroundColor};">
                            ${BrockerMeetings[3][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][4].backgroundColor};">
                            ${BrockerMeetings[3][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[3][5].backgroundColor};">
                            ${BrockerMeetings[3][5].value}
                            </div>
                          </div>
                      </div> 
                     </div>
                          <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Thursday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][0].backgroundColor};">
                            ${BrockerMeetings[4][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][1].backgroundColor};">
                            ${BrockerMeetings[4][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][2].backgroundColor};">
                            ${BrockerMeetings[4][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][3].backgroundColor};">
                            ${BrockerMeetings[4][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][4].backgroundColor};">
                            ${BrockerMeetings[4][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[4][5].backgroundColor};">
                            ${BrockerMeetings[4][5].value}
                            </div>
                          </div>
                      </div> 
                     </div>
                          <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Friday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][0].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][0].backgroundColor};">
                            ${BrockerMeetings[5][0].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][1].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][1].backgroundColor};">
                            ${BrockerMeetings[5][1].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][2].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][2].backgroundColor};">
                            ${BrockerMeetings[5][2].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][3].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][3].backgroundColor};">
                            ${BrockerMeetings[5][3].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][4].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][4].backgroundColor};">
                            ${BrockerMeetings[5][4].value}
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][5].time}</p>
                            <div type="text"  class="brocker-meeting-block-text" style="background-color: ${BrockerMeetings[5][5].backgroundColor};">
                            ${BrockerMeetings[5][5].value}
                            </div>
                          </div>
                      </div> 
                     </div>


    `;

  editBrockerMeetings.innerHTML = `
                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Sunday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][0].backgroundColor};" data-input="[0 , 0]" value = "${BrockerMeetings[0][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][1].backgroundColor};"  data-input="[0 , 1]" value = "${BrockerMeetings[0][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][2].backgroundColor};"  data-input="[0 , 2]" value = "${BrockerMeetings[0][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][3].backgroundColor};"  data-input="[0 , 3]" value = "${BrockerMeetings[0][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][4].backgroundColor};"  data-input="[0 , 4]" value = "${BrockerMeetings[0][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[0][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[0][5].backgroundColor};"  data-input="[0 , 5]" value = "${BrockerMeetings[0][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[0][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>


                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Monday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][0].backgroundColor};" data-input="[1 , 0]" value = "${BrockerMeetings[1][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][1].backgroundColor};"  data-input="[1 , 1]" value = "${BrockerMeetings[1][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][2].backgroundColor};"  data-input="[1 , 2]" value = "${BrockerMeetings[1][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][3].backgroundColor};"  data-input="[1 , 3]" value = "${BrockerMeetings[1][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][4].backgroundColor};"  data-input="[1 , 4]" value = "${BrockerMeetings[1][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[1][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[1][5].backgroundColor};"  data-input="[1 , 5]" value = "${BrockerMeetings[1][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[1][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>

                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Tuesday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][0].backgroundColor};" data-input="[2 , 0]" value = "${BrockerMeetings[2][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][1].backgroundColor};"  data-input="[2 , 1]" value = "${BrockerMeetings[2][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][2].backgroundColor};"  data-input="[2 , 2]" value = "${BrockerMeetings[2][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][3].backgroundColor};"  data-input="[2 , 3]" value = "${BrockerMeetings[2][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][4].backgroundColor};"  data-input="[2 , 4]" value = "${BrockerMeetings[2][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[2][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[2][5].backgroundColor};"  data-input="[2 , 5]" value = "${BrockerMeetings[2][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[2][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>
                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Wednesday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][0].backgroundColor};" data-input="[3 , 0]" value = "${BrockerMeetings[3][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][1].backgroundColor};"  data-input="[3 , 1]" value = "${BrockerMeetings[3][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][2].backgroundColor};"  data-input="[3 , 2]" value = "${BrockerMeetings[3][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][3].backgroundColor};"  data-input="[3 , 3]" value = "${BrockerMeetings[3][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][4].backgroundColor};"  data-input="[3 , 4]" value = "${BrockerMeetings[3][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[3][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[3][5].backgroundColor};"  data-input="[3 , 5]" value = "${BrockerMeetings[3][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[3][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>
                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Thursday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][0].backgroundColor};" data-input="[4 , 0]" value = "${BrockerMeetings[4][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][1].backgroundColor};"  data-input="[4 , 1]" value = "${BrockerMeetings[4][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][2].backgroundColor};"  data-input="[4 , 2]" value = "${BrockerMeetings[4][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][3].backgroundColor};"  data-input="[4 , 3]" value = "${BrockerMeetings[4][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][4].backgroundColor};"  data-input="[4 , 4]" value = "${BrockerMeetings[4][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[4][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[4][5].backgroundColor};"  data-input="[4 , 5]" value = "${BrockerMeetings[4][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[4][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>
                        <div class="brocker-meeting">
                        <div class="brocker-meeting-title">Thursday</div>
                        <div class="brocker-meeting-content">
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][0].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][0].backgroundColor};" data-input="[5 , 0]" value = "${BrockerMeetings[5][0].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][0].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][1].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][1].backgroundColor};"  data-input="[5 , 1]" value = "${BrockerMeetings[5][1].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][1].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][2].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][2].backgroundColor};"  data-input="[5 , 2]" value = "${BrockerMeetings[5][2].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][2].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][3].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][3].backgroundColor};"  data-input="[5 , 3]" value = "${BrockerMeetings[5][3].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][3].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][4].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][4].backgroundColor};"  data-input="[5 , 4]" value = "${BrockerMeetings[5][4].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][4].backgroundColor}">
                            </div>
                          </div>
                          <div class="brocker-meeting-time-row">
                            <p class="brocker-meeting-time">${BrockerMeetings[5][5].time}</p>
                            <input type="text" class="brocker-meeting-block-text brocker-meeting-block-for-edit" style="background-color: ${BrockerMeetings[5][5].backgroundColor};"  data-input="[5 , 5]" value = "${BrockerMeetings[5][5].value}">
                            <div class="container-for-colorInput">
                              <input type="color" class="input-color-brocker-meeting" value="${BrockerMeetings[5][5].backgroundColor}">
                            </div>
                          </div>
                      </div>
                     </div>

    `;

  allInputs = document.querySelectorAll(".brocker-meeting-block-for-edit");
}

updateContainerForMeetings();


function updateBrockerMeetingValues() {
  allInputs.forEach((el) => {
    let backgroundColor = '#fff'
    const colorInputContainer = el.nextElementSibling;
    backgroundColor = colorInputContainer.querySelector('.input-color-brocker-meeting').value;
    console.log(backgroundColor);
      // const invertedColor = invertColor(backgroundColor);


      const currentValue = el.value;
      const currentDay = JSON.parse(el.getAttribute("data-input"));

      // el.style.backgroundColor = backgroundColor;
      // el.style.color = invertedColor;

      BrockerMeetings[currentDay[0]][currentDay[1]].value = currentValue;
      BrockerMeetings[currentDay[0]][currentDay[1]].backgroundColor = backgroundColor;

  });
}

allInputs = document.querySelectorAll(".brocker-meeting-block-for-edit");



allInputs.forEach((el) => {
  const colorInputContainer = el.nextElementSibling;
  let colorBrockerInput = colorInputContainer.querySelector('.input-color-brocker-meeting');

  colorBrockerInput.addEventListener('input' , ()=>{
    const backgroundColor = colorInputContainer.querySelector('.input-color-brocker-meeting').value;
    console.log(backgroundColor)
    // const invertedColor = invertColor(backgroundColor);
      el.style.backgroundColor = backgroundColor;
      // el.style.color = `#${invertedColor}`;

      // console.log(invertedColor);
  })


  el.addEventListener('input' , ()=>{
    console.log(colorBrockerInput);
  })
});

updateButton.addEventListener("click" , ()=>{
  brockerEditMenu.classList.toggle("active");
  updateBrockerMeetingValues();
  updateContainerForMeetings();
  console.log(BrockerMeetings)
});
