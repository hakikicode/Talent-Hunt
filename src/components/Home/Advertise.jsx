import useWinners from "../../hooks/useWinners";
import Container from "../Shared/Container";
import Loader from "../Shared/Loader";
import SectionHeading from "../Shared/SectionHeading";
import { motion } from "framer-motion";

const Advertise = () => {
  const { contests, isLoading } = useWinners();

  if (isLoading) return <Loader />;

  return (
    <div className="mt-20">
      <Container>
        <SectionHeading
          title="Our Top Finalist"
          subtitle="Meet Our Top Finalist"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="relative h-[260px] rounded-lg border p-6 bg-gray-100"
            >
              <div className="absolute inset-0 h-[260px] w-full overflow-hidden">
                <motion.div
                  className="box"
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <img
                    className="object-cover object-right w-full h-full lg:object-center"
                    src={contest?.image}
                    alt=""
                  />
                </motion.div>
              </div>

              <div className="absolute inset-0 h-[260px] bg-gray-900 bg-opacity-70"></div>
              <div className="flex flex-col w-full justify-center items-center mb-4 z-[5] absolute top-10 left-0 text-white">
                <img
                  src={contest?.winner?.image}
                  alt="Image"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className=" text-2xl  font-bold">
                    {contest.winner.name} win{" "}
                    <span>{contest?.prizeMoney}$</span> Prize Money
                  </p>
                  <p className="font-semibold">from {contest?.title}</p>
                </div>
                <p className="font-medium text-xl mb-4 mt-6">
                  Participants {contest.participantCount} people from all over
                  the Kwara
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Advertise;
