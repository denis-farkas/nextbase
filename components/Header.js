import Image from "next/image";
import Link from "next/link";
import styles from "styles/header.module.css";
import { useRouter } from "next/router";
import { userService } from "services";
import { useState, useEffect } from "react";

function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className={styles.header}>
      <div className={`contenedor ${styles.barre}`}>
        <Link href={"/"}>
          <span>
            <Image src="/img/logo.png" width={302} height={40} alt="logo" />
          </span>
        </Link>
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
              Contactez-moi
            </span>
          </Link>
          {user && user.roles === "ADMIN" ? (
            <Link href={"/admin"} className="nav-link ">
              <span
                className={router.pathname === "/admin" ? styles.active : ""}
              >
                Administration
              </span>
            </Link>
          ) : (
            ""
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
