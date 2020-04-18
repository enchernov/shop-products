import Layout from '../components/Layout'
import Register from "../components/Auth/Register/Register";
import {GetStaticProps} from "next";
import {initialData} from "../utils/sample-data";
import {RegisterProps} from "../types";
import {IUser} from "../interfaces";

export const getStaticProps: GetStaticProps = async () => {
    const data: IUser = initialData;
    return {
        props: {
            data
        }
    }
};

const Signup = ({ data }: RegisterProps) => {
    return (
        <Layout title="Регистрация">
            <Register data={data} />
        </Layout>
    );
};

export default Signup
