import usePopularContests from "../../hooks/usePopularContests";
import Container from "../Shared/Container";
import Loader from "../Shared/Loader";
import SectionHeading from "../Shared/SectionHeading";
import ContestCard from "./ContestCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PopularContests = () => {
  const { contests, isLoading } = usePopularContests();

  if (isLoading) return <Loader />;

  return (
    <div className="mt-28">
      <Container>
        <SectionHeading
          title="Popular Contestants"
          subtitle="See Our Popular contestants"
        />

        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="mt-10 items-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {contests?.map((contest) => (
              <motion.div key={contest._id} className="item" variants={item}>
                <ContestCard contest={contest} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PopularContests;
