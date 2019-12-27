var customersRef = firebase.database().ref("customers");

// Display customers

// Read from firebase
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
  document.body.appendChild(customerBlock);

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

  // Scroll down to bottom of window each time a customer is added
  window.scrollTo(0, document.body.scrollHeight);
});
