import Layout from '../components/Layout'
import Register, {IUser} from "../components/Auth/Register/Register";
import {GetStaticProps} from "next";
import {initialData} from "../utils/sample-data";

type SignupProps = {
    data: IUser;
}

export const getStaticProps: GetStaticProps = async () => {
    const data: IUser = initialData;
    return {
        props: {
            data
        }
    }
};

const Signup = ({ data }: SignupProps) => {

    return (
        <Layout title="Регистрация">
            <Register data={data} />
        </Layout>
    );
};

export default Signup
