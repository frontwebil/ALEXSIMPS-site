import { USERS } from "./consts/users.js";

// PAGES

const loginPage = document.querySelector(".login-page");
const adminPage = document.querySelector(".admin-page");
const brockerPage = document.querySelector('.brocker-page')
const loginInput = document.getElementById("login-input-login");
const passwordInput = document.getElementById("login-input-password");
const loginFormButton = document.getElementById("login-form-button");
const loginFormStatus = document.getElementById("login-form-status");

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
      loginFormStatus.innerHTML = ". <br><br>";
      loginFormStatus.style.color = "transparent";
      let adminNames = document.querySelectorAll(".admin-name");
      let adminImgs = document.querySelectorAll(".admin-img");
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
    }
    
    else if (user.role === "brocker") {
      loginFormStatus.innerHTML = ". <br><br>";
      loginFormStatus.style.color = "transparent";
      currentSlideIndexBrocker = 0;
      let brockerNames = document.querySelectorAll(".brocker-name");
      console.log(brockerNames)
      let brockerImgs = document.querySelectorAll(".brocker-img");
      console.log(brockerImgs)


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
  let parent = e.target.closest("section");
  parent.classList.toggle("active");
  loginPage.classList.toggle("active");
  loginFormStatus.innerHTML = ". <br><br>";
  loginFormStatus.style.color = "transparent";
}

logOutButton.forEach(el=>{
  el.addEventListener("click", logOut);
})

// SWIPER ADMIN

const buttonPrevAdmin = document.querySelector(".contols-admin-button-swiper-left");
const buttonNextAdmin = document.querySelector(".contols-admin-button-swiper-right");
const slidesAdmin = document.querySelectorAll(".slider-admin-wrapper-slide");

let currentSlideIndexAdmin = 0;

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
    console.log(tabsTarget);

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
const BusinessMenuContainer = document.querySelector(
  ".add-to-business-list-container"
);
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
        ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
        : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
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
  alarmBusinessMenuDelete.classList.remove('succes')
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

import { customersAll } from "./consts/customers.js";

const containerForCustomersCards = document.getElementById(
  "place-for-customer-card"
);

function updateContainerForCustomerCards() {
  containerForCustomersCards.innerHTML = "";

  customersAll.forEach((el) => {
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

const openAddCustomerMenu = document.getElementById('open-Customer-Menu');
const closeAddCustomerMenu = document.getElementById('close-customer-Menu');
const customerAddMenu = document.getElementById('Customers-Add-Menu');
const customerAddMenuAlarm = document.querySelector('.customers-list-add-alarm');
const addCustomer = document.getElementById('add-customer-Menu');
const addCustomersInputs = document.querySelectorAll('.customer-list-container-card-text-input');



openAddCustomerMenu.addEventListener('click' , ()=>{
  customerAddMenu.classList.toggle('active')
});

closeAddCustomerMenu.addEventListener('click' , ()=>{
  customerAddMenu.classList.toggle('active')
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

    customersAll.push({
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

addCustomer.addEventListener('click' , ()=>{
  addCustomerCard();
  openSortCustomerList.classList.remove("active");

})



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
  const index = customersAll.findIndex(
    (customer) => customer.IdEmployee === inputValue
  );

  if (index !== -1) {
    customersAll.splice(index, 1);
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
    !customersAll.some((customer) => customer.IdEmployee === valueInputIdCompany)
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
console.log(openSortCustomerList)
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
        ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
        : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
    }
  });
}



doSortingCustomerList.addEventListener("click", () => {
  const sortByValue = selectSortingCustomerValue.value;
  const sortOptions = selectOptionsSortingCustomerValue.value;

  const startArray = customersAll;

  const sortedBusinessArray = sortCustomerArray(
    startArray,
    sortByValue,
    sortOptions
  );

  console.log(customersAll)

  

  updateContainerForCustomerCards();

  openSortCustomerList.classList.add("active");
  sortCustomerList.classList.toggle("active");
});



// BROCKER slider

const buttonPrevBrocker = document.querySelector(".contols-brocker-button-swiper-left");
const buttonNextBrocker = document.querySelector(".contols-brocker-button-swiper-right");
const slidesBrocker = document.querySelectorAll(".slider-brocker-wrapper-slide");

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
    console.log(contentId)

    el.classList.add("active");
    document.getElementById(contentId).classList.add("active");
  });
});