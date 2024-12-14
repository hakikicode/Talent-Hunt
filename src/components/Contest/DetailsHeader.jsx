import moment from "moment";
import Countdown from "react-countdown";
import { formatDate } from "../../utils";

const DetailsHeader = ({ contest }) => {
  const isContestEnd = moment(contest?.deadline).isBefore(moment());

  return (
    <section>
      <div className="relative py-12 bg-white sm:py-16  lg:py-20">
        <div className="absolute inset-0">
          <img
            className="object-cover object-right w-full h-full lg:object-center"
            src={contest?.image}
            alt=""
          />
        </div>

        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl">
              {contest?.title}
            </h1>

            <div className="max-w-xl mx-auto mt-10 text-white  font-bold ">
              <div className="text-xl font-medium">
                {isContestEnd ? "Finished on" : "Ends in"}
              </div>
              <div className="text-4xl">
                <Countdown date={new Date(contest?.deadline)}>
                  <div className="text-2xl">
                    {formatDate(contest?.deadline)}
                  </div>
                </Countdown>
              </div>
            </div>

            <div className="grid max-w-md grid-cols-2 mx-auto mt-8 md:mt-16 lg:mt-24 xl:mt-32 gap-x-6 grid-col-2">
              <div>
                <p className="text-4xl font-bold text-white">
                  0{contest?.participants?.length}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-300">
                  {isContestEnd ? "Total Registered" : "Already Registered"}
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold text-white">
                  {contest?.prizeMoney}$
                </p>
                <p className="mt-2 text-sm font-medium text-gray-300">
                  Prize Money
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsHeader;
