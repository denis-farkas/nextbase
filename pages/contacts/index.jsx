import { useState, useEffect } from "react";
import Link from "next/link";
import { Spinner } from "components";
import { Layout } from "components/users";
import { contactService } from "services";

export default Index;

function Index() {
  const [contacts, setContacts] = useState(null);
  // recupere tout les utilisateurs
  useEffect(() => {
    contactService.getAll().then((x) => setContacts(x));
  }, []);

  function deleteContact(id) {
    setContacts(
      contacts.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    contactService.delete(id).then(() => {
      setContacts((contacts) => contacts.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Contact</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Prenom</th>
            <th style={{ width: "10%" }}>nom</th>
            <th style={{ width: "15%" }}>email</th>
            <th style={{ width: "10%" }}>numero</th>
            <th style={{ width: "40%" }}>message</th>
            <th style={{ width: "15%" }}></th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.numero}</td>
                <td>
                  <p style={{ maxWidth: "40%" }}> {contact.message}</p>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/contact/${contact.id}`}
                    className="btn btn-sm btn-success mx-3 "
                  >
                    Voir le message
                  </Link>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="btn btn-sm btn-primary btn-delete-user"
                    style={{ width: "60px" }}
                  >
                    {contact.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Effacer</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!contacts && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {contacts && !contacts.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Pas de contacts à afficher</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}