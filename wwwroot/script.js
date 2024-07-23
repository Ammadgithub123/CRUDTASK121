const apiUrl = 'https://localhost:7051/api/Customer';

document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customer-form');
    const name = document.getElementById('Name');
    const email = document.getElementById('Email');
    const Dob = document.getElementById('DOB');
    const ContactNo = document.getElementById('ContactNo');
    const customerList = document.getElementById('customerList');

    const fetchCustomers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Http status is this: ${response.status}`);
            }
            const customers = await response.json();
            customerList.innerHTML = ' ';
            customers.forEach(customer => {
                const az = document.createElement('li');
                az.innerHTML = `
                    ${customer.Name} (${customer.Email}) 
                    (${customer.Dob}) (${customer.ContactNo})
                    <div>
                        <button onclick="editCustomer(${customer.id})">Edit</button>
                        <button onclick="deleteCustomer(${customer.id})">Delete</button>
                    </div>
                `;
                customerList.appendChild(az);
            });
        } catch (error) {
            console.error('Fetches Customers are failed:', error);
        }
    };

    async function addCustomer(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const Dob = document.getElementById('Dob').value;
        const ContactNo = document.getElementById('ContactNo').value;

        const customer = {
            name, email, Dob, ContactNo
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                fetchCustomers();
                document.getElementById('customer-form').reset();
            })
            .catch(error => console.error('It had failed to add customer.', error));
    }

    async function editCustomer(id) {
        const Name = prompt('Enter the new Name:');
        const Email = prompt('Enter the new Email:');
        const DOB = prompt('Enter the new DOB:');
        const ContactNo = prompt('Enter the new ContactNo');

        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, Email, DOB, ContactNo })
        });

        if (response.ok) {
            fetchCustomers();
        }
    }

    async function deleteCustomer(id) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        console.log("The Customer row has been deleted");
        fetchCustomers();
    }

    async function AddCustomerToTable(Customer) {
        const row = customerTable.insertRow();

        const row1 = row.insertCell(0);
        row1.textContent = Customer.name;
        const row2 = row.insertCell(1);
        row2.textContent = Customer.email;
        const row3 = row.insertCell(2);
        row3.textContent = Customer.Dob;
        const row4 = row.insertCell(3);
        row4.textContent = Customer.ContactNo;

        const row5 = row.insertCell(4);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => {
            document.getElementById("name").value = Customer.name;
            document.getElementById("email").value = Customer.email;
            document.getElementById("Dob").value = Customer.Dob;
            document.getElementById("ContactNo").value = Customer.ContactNo;
            submitButton.textContent = "Update the Customer";
        });
        row5.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            deleteCustomer(Customer.id);
        });
        row5.appendChild(deleteButton);
    }

    fetchCustomers();
});

























