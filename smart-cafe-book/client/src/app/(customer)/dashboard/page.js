import withAuth from "../../../hoc/withAuth";

function CustomerDashboard({ user }) {
  return <div>Welcome Customer {user.name}</div>;
}

export default withAuth(CustomerDashboard, "customer");
