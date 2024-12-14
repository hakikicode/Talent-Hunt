import Loader from "../components/Shared/Loader";
import useContests from "../hooks/useContests";
import ContestCard from "../components/Home/ContestCard";
import Container from "../components/Shared/Container";
import Categories from "../components/Contest/Categories";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Title from "../components/Shared/Title";
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

const AllContests = () => {
  const location = useLocation();
  const text = location?.state?.search || "";
  const { contests, isLoading } = useContests(text);
  const [filteredContests, setFilteredContests] = useState(contests);
  const [searchParas] = useSearchParams();

  const category = searchParas.get("category");

  useEffect(() => {
    // refetch();

    // Filter the contests based on the category
    if (category) {
      const filtered = contests?.filter(
        (contest) => contest?.type?.toLowerCase() === category
      );
      setFilteredContests(filtered);
    } else {
      setFilteredContests(contests);
    }
  }, [category, contests]);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-10">
      <Title title="Contests | Kwara Talent Harvest" />
      <Categories />
      <Container>
        {filteredContests?.length === 0 && (
          <p className="text-center font-medium mt-20 text-gray-600">
            No contests found
          </p>
        )}
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredContests?.map((contest) => (
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

export default AllContests;
