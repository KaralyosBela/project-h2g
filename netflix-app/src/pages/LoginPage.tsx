import { Layout } from "../ui/Layout";
import { LoginCard } from "../components/LoginCard";
import { AddMovieModal } from "../components/AddMovieModal";
import { EditMovieModal } from "../components/EditMovieModal";
import { AddMovieSuccessModal } from "../components/AddMovieSuccessModal";
import { DeleteMovieModal } from "../components/DeleteMovieModal";
export const LoginPage: React.FC = () => {
  return (
    <div>
      <Layout>
        {/* <AddMovieModal/> */}
        {/* <EditMovieModal/> */}
        {/* <AddMovieSuccessModal/> */}
        <DeleteMovieModal/>
        {/* <LoginCard /> */}
      </Layout>
    </div>
  );
};
