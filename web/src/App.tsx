import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch
} from "react-router-dom";
import UserContext, { UserState } from "./contexts/UserContext";
import { useMeQuery } from "./generated/Apollo";
import AuthLayout from "./layouts/Auth";
import LoggedInLayout from "./layouts/LoggedIn";
import Dashboard from "./pages/Dashboard";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  const [user, setUser] = useState<UserState | null>();
  const { loading, data } = useMeQuery();

  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        return setUser(data.me);
      }

      return setUser(null);
    }
  }, [data, loading]);
  // user === undefined if loading
  // user === null if authentication failed
  // user === User if authed
  if (user === undefined) return <Loading />;

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" render={props => <Redirect to="/login" />} />
            <RouteWithLayout
              layout={AuthLayout}
              exact
              path="/login"
              component={Login}
            />
            <RouteWithLayout
              layout={AuthLayout}
              exact
              path="/signup"
              component={Signup}
            />
            <RouteWithLayout
              layout={LoggedInLayout}
              exact
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
};
interface RouteWithLayoutProps {
  component: React.FC;
  layout: React.FC;
}

type RouteWithLayoutComponentProps = RouteProps & RouteWithLayoutProps;

const RouteWithLayout: React.FC<RouteWithLayoutComponentProps> = ({
  component: Component,
  layout: Layout,
  ...props
}) => (
  <Layout>
    <Route {...props}>
      <Component />
    </Route>
  </Layout>
);

export default App;
