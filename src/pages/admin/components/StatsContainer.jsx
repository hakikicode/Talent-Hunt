import {
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineTrophy,
  HiOutlineUser,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../../utils";

const StatsContainer = ({ stats }) => {
  console.log(stats);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <Stat
        icon={<HiOutlineUser className="text-3xl" />}
        title="Total Users"
        value={stats.users[2].total}
        color="blue"
      />
      <Stat
        icon={<HiOutlineShieldCheck className="text-3xl" />}
        title="Total Creators"
        value={stats.users[1].total}
        color="yellow"
      />
      <Stat
        icon={<HiOutlineTrophy className="text-3xl" />}
        title="Total Contests"
        value={stats.acceptedContests}
        color="red"
      />
      <Stat
        icon={<HiOutlineBanknotes className="text-3xl" />}
        title="Sales"
        value={formatCurrency(stats.contests * 50)}
        color="green"
      />
    </div>
  );
};

export default StatsContainer;
