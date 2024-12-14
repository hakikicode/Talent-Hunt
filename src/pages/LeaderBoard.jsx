import Container from "../components/Shared/Container";
import Loader from "../components/Shared/Loader";
import Title from "../components/Shared/Title";
import useLeaderBoard from "../hooks/useLeaderBoard";
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

const LeaderBoard = () => {
  const { data, isLoading } = useLeaderBoard();

  if (isLoading) return <Loader />;

  return (
    <div className="mt-10">
      <Title title="Leader Board | Talent Hunt" />
      <Container>
        <h1 className="text-3xl font-medium text-center mb-10">Leader Board</h1>

        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className=" divide-y max-w-xl mx-auto">
            <div className="mb-2 font-semibold">
              <span>Participants</span>
              <span className="float-right">Winning Money ($)</span>
            </div>
            {data?.map((user) => (
              <motion.div key={user.email} className="item" variants={item}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={user.image}
                      alt=""
                      className="h-11 w-11 object-cover"
                    />
                    <div>
                      <h1 className="font-medium">{user.winner}</h1>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-medium">{user.totalPrizeMoney}</h1>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default LeaderBoard;
