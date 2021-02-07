import Link from "next/link"

const RequireLogin = () => {
  return <section className="require-login">
    <h1>Vous devez vous connecter pour accéder à cette page</h1>
    <div>
      <Link href="/inscription">
        <a className="button">
          S'inscrire
        </a>
      </Link>
      <Link href="/connexion">
        <a className="button">
          Se connecter
        </a>
      </Link>
    </div>
  </section>
}

export default RequireLogin