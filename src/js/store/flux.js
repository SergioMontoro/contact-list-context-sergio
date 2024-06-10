const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			listContacts: []
		},
		actions: {
			createAgenda: () => {
				fetch("https://playground.4geeks.com/contact/agendas/smontoro", {
					method: "POST"
				})
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},

			getAllAgenda: () => {
				fetch("https://playground.4geeks.com/contact/agendas/smontoro/contacts")
					.then(response => response.json())
					.then(data => {
						setStore({ listContacts: data.contacts });
					})
					.catch(error => console.log(error));
			},

			createOneContact: newContact => {
				console.log(newContact);
				fetch("https://playground.4geeks.com/contact/agendas/smontoro/contacts", {
					method: "POST",
					body: JSON.stringify({
						name: `${newContact.name}`,
						email: `${newContact.email}`,
						address: `${newContact.address}`,
						phone: `${newContact.phone}`
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},

			deleteOneContact: id => {
				fetch(`https://playground.4geeks.com/contact/agendas/smontoro/contacts/${id}`, {
					method: "DELETE"
				})
					.then(response => response.json())
					.then(data => {
						getActions().getAllAgenda();
					})
					.catch(error => console.log(error));
			},

			updateOneContact: (id, data) => {
				fetch(`https://playground.4geeks.com/contact/agendas/smontoro/contacts/${id}`, {
					method: "PUT",
					body: JSON.stringify({
						name: `${data.name}`,
						email: `${data.email}`,
						address: `${data.address}`,
						phone: `${data.phone}`
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						console.log(response);

						return response.json();
					})
					.then(data => {
						getActions().getAllAgenda();
					})
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
