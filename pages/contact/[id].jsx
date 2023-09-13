import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import { Layout } from "components/contacts";
import { Spinner } from "components";
import { contactService, alertService } from "services";

export default Contact;

function Contact() {
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch contact and set default form values if in edit mode
    contactService
      .getById(id)
      .then((x) => setContact(x))
      .catch(alertService.error);
  }, [router]);

  {
    /* remplacer le addcontact et creer un composant contact en plein pages */
  }
  {
    if (
      contact &&
      user &&
      (user.roles === "ADMIN" || user.roles === "EMPLOYEE")
    ) {
      return (
        <Layout>
          <>
            <div class="card mb-3">
              <h3 class="card-header">
                De : {contact.firstName} {contact.lastName}
              </h3>
              <div class="card-body">
                <h5 class="card-title">Email: {contact.email}</h5>
                <h6 class="card-subtitle text-muted">
                  Téléphone: {contact.numero}
                </h6>
              </div>
              <div class="card-body">
                <p class="card-text">Message: {contact.message}</p>
              </div>
              <div class="card-footer text-muted">{contact.createdAt}</div>
            </div>
          </>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <h3>Vous n&apos; avez pas les droits pour voir ce message</h3>
        </Layout>
      );
    }
  }
}