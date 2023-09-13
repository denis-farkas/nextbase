import Link from "next/link";
import styles from "styles/footer.module.css";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <nav className={styles.navigation}>
          <Link href="/">
            <span className={router.pathname === "/" ? styles.active : ""}>
              Accueil
            </span>
          </Link>
          <Link href="/#projets">
            <span>Projets</span>
          </Link>
          <Link href="/contacts/add">
            <span
              className={
                router.pathname === "/contacts/add" ? styles.active : ""
              }
            >
              Contacts
            </span>
          </Link>
        </nav>
        <p>​© Tous droits réservés {new Date().getFullYear()}</p>
      </div>
      <br />
    </footer>
  );
}

export default Footer;
