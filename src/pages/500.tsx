import { routes } from "@/config/routes";
import Layout from "@/presentation/components/common/Layout";
import Link from "next/link";

export default function Custom500() {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title is-3 has-text-centered has-text-link">500 - Server-side error occurred</h1>

          <div className="has-text-centered">
            <Link href={routes.HOME} className="button is-link is-outlined is-rounded is-medium">
              Retourner à l&apos;acceuil
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}