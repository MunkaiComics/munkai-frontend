import { AccountContext } from "providers/AccountContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  component: Component,
  cond = (user) => true,
  ...rest
}) => {
  const { user } = useContext(AccountContext);
  const { address } = user ?? {};
  const allowed = !!address && (!cond || cond(user));

  useEffect(() => {
    if (!address) {
      toast.error("You must be logged in to perform this action");
    } else {
      if (!allowed) {
        toast.error("You are not authorized to perform this action");
      }
    }
  }, [address, allowed]);

  return (
    <Route
      {...rest}
      render={
        rest.render ||
        (({ location }) =>
          allowed ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          ))
      }
    />
  );
};
