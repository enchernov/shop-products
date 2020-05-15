import Link from 'next/link'
import Layout from '../components/Layout'
import { withApollo } from '../apollo/client'

const IndexPage = () => {
    return (
        <Layout title="Главная">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="about">
                    <a>О нас</a>
                </Link>
            </p>
        </Layout>
    )
};

export default withApollo(IndexPage)
