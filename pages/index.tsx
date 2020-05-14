import Link from 'next/link'
import Layout from '../components/Layout'
import { withApollo } from '../apollo/client'
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
const ViewerQuery = gql`
  query {
    viewer {
      id
      username
      email
    }
  }
`;

const IndexPage = () => {
    const {data} = useQuery(ViewerQuery,
        {
            pollInterval: 500
        }
    );
    return (
        <Layout title="Главная" viewer={data?.viewer}>
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="about">
                    <a>О нас</a>
                </Link>
            </p>
        </Layout>
    )
}

export default withApollo(IndexPage)
