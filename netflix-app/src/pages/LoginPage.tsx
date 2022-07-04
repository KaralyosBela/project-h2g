import { Layout } from "../ui/Layout";
import { LoginCard } from "../components/LoginCard";
import { AddMovieModal } from "../components/AddMovieModal";
import { EditMovieModal } from "../components/EditMovieModal";
export const LoginPage: React.FC = () => {
  return (
    <div>
      <Layout>
        {/* <AddMovieModal/> */}
        {/* <EditMovieModal/> */}
        <LoginCard />
      </Layout>
    </div>
  );
};
