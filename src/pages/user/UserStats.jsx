import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import Loader from "../../components/Shared/Loader";
import useUserStats from "../../hooks/useUserStats";

const UserStats = () => {
  const { stats, isLoading } = useUserStats();
  const COLORS = ["#0088FE", "#FF8042"];

  if (isLoading) return <Loader />;

  const total = stats?.totalContests;
  const win = stats?.totalWinningContests;

  const data = [
    { name: "Total Lose", value: total - win },
    { name: "Total Won", value: win },
  ];

  const data2 = [
    { name: "Total Fee", value: stats?.totalFee },
    { name: "Total Prize Money", value: stats?.totalPrizeMoney },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mb-16">
      <ResponsiveContainer width="100%" className="h-56">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          <PieChart width={400} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <PieChart width={400} height={250}>
            <Pie
              data={data2}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStats;
