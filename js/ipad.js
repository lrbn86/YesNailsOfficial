// Customers Collection
var customersRef = firebase.database().ref("customers");

const form = document.getElementById("ipad_form");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Allow form submit

  // Get values from the input fields
  const name = document.getElementById("customer_name").value;
  const services = document.getElementById("services").value;

  const nameID = document.getElementById("customer_name");
  const servicesID = document.getElementById("services");

  // Get current date
  var todayDate = new Date();
  var month = String(todayDate.getMonth() + 1).padStart(2, "0");
  var day = String(todayDate.getDate()).padStart(2, "0");
  var year = todayDate.getFullYear();
  var todayDateFormat = month + "/" + day + "/" + year;

  // Create customer object
  var customerData = {
    customer_name: name,
    customer_services: services,
    customer_date: todayDateFormat,
    done: false
  };

  // Send to firebase
  customersRef.push().set(customerData);

  // Hide keyboard
  nameID.blur();
  servicesID.blur();

  // Clear form
  form.reset();
});

var waiting_list = document.getElementById("waiting_list");

customersRef.on("child_added", function(snapshot, prevChildKey) {
  // Get customer data from firebase and save into variables
  const customerData = snapshot.val();
  const customer_name = customerData.customer_name;
  const customer_services = customerData.customer_services;
  const customer_date = customerData.customer_date;

  // This variable keeps track of whether the customer is done
  const customer_done = customerData.done;

  // Create div block for each customer
  const customerBlock = document.createElement("div");
  customerBlock.id = "customer_block";
  const name_block = document.createElement("p");
  name_block.textContent = "Name: " + customer_name;
  const services_block = document.createElement("p");
  services_block.textContent = "Services: " + customer_services;

  // Get date entered:
  const date_block = document.createElement("p");
  date_block.textContent = "Date Entered: " + customer_date;

  customerBlock.appendChild(name_block);
  customerBlock.appendChild(services_block);
  customerBlock.appendChild(date_block);
  waiting_list.appendChild(customerBlock);

  customerBlock.addEventListener("click", function() {
    if (customer_done === false) {
      customersRef.child(snapshot.key).update({ done: true });
    } else if (customer_done === true) {
      customersRef.child(snapshot.key).update({ done: false });
    }
    // Reflect change by reloading browser
    location.reload(); // TODO: Would this be memory intensive?
  });

  if (customer_done === true) {
    customerBlock.style.backgroundColor = "green";
    customerBlock.style.color = "white";
  }

  waiting_list.scrollTop = waiting_list.scrollHeight;
});
