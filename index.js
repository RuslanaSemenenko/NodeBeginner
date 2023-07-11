const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.log(contacts))
        .catch((error) => console.error(error));
      break;

    case "get":
      if (!id) {
        console.error(
          'Please provide the contact ID (--id) for the "get" action.'
        );
        return;
      }
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.log(contact);
          } else {
            console.log("Contact not found.");
          }
        })
        .catch((error) => console.error(error));
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error(
          'Please provide the contact details (--name, --email, --phone) for the "add" action.'
        );
        return;
      }
      addContact(name, email, phone)
        .then((newContact) => console.log("Contact added:", newContact))
        .catch((error) => console.error(error));
      break;

    case "remove":
      if (!id) {
        console.error(
          'Please provide the contact ID (--id) for the "remove" action.'
        );
        return;
      }
      removeContact(id)
        .then((removedContact) => {
          if (removedContact) {
            console.log("Contact removed:", removedContact);
          } else {
            console.log("Contact not found.");
          }
        })
        .catch((error) => console.error(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
