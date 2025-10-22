import { AppBarChat } from "../components__/AppBarChat";
import { AppAreaChart } from "../components__/AreaChart";
import { AppPieChart } from "../components__/AppPieChart";
import CardList from "../components__/CardList";
import TodoList from "../components__/TodoList";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:grid-cols-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChat />
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">
        <CardList title="Latest Products" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-md lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">
        {" "}
        <CardList title="Popular Products" />
      </div>
    </div>
  );
}
