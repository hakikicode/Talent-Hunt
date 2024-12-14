import Advertise from "../components/Home/Advertise";
import Banner from "../components/Home/Banner";
import BestCreators from "../components/Home/BestCreators";
import PopularContests from "../components/Home/PopularContests";
import Sponsor from "../components/Home/Sponsor";
import Testimonials from "../components/Home/Testimonials";
import Title from "../components/Shared/Title";

const Home = () => {
  return (
    <div>
      <Title title="Home | Kwara Talents Harvest" />
      <Banner />
      <PopularContests />
      <Advertise />
      <BestCreators />
      <Sponsor />
      <Testimonials />
    </div>
  );
};

export default Home;
