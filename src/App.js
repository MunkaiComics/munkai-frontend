import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/pages/landing/landing";
import Explore from "./components/pages/explore/explore";
import Artist from "./components/pages/artist/artist";
import Contact from "./components/pages/contact/contact";
import ArtistProfile from "./components/pages/artist/profile";
import ErrorPage404 from "./components/pages/error/404";
import Details from "./components/pages/details/details";
import CreateComic from "components/pages/artist/create-comic/CreateComic";
import UploadChapter from "components/pages/artist/upload-chapter/UploadChapter";
import ComicPage from "components/pages/artist/comic-page/ComicPage";
import User from "components/pages/user/user";
import Profile from "components/global/profile";
import ChapterPage from "components/pages/chapter";
import "./App.css";
import "styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AccountContextProvider from "providers/AccountContext/AccountContextProvider";
import { ProtectedRoute } from "components/global/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Web3ContextProvider from "providers/Web3Context/Web3ContextProvider";
import { TermsAndConditionsPage } from "components/pages/legal/termsAndConditions";
import { withRouter } from "react-router-dom";
import React from "react";

const RouteNotFoundBoundary = withRouter(
  class RouteNotFoundBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { routeNotFound: undefined, location: props.location };
    }
    static getDerivedStateFromProps(props, state) {
      if (state.location !== props?.location) {
        return { routeNotFound: false };
      }
      return null;
    }

    getKey() {
      return this.state.location.pathname + ":" + this.state.location.search;
    }
    componentDidCatch(e) {
      if (e.name === "RouteNotFoundError") {
        this.setState({ routeNotFound: this.getKey() });
      } else {
        throw e;
      }
    }
    render() {
      if (this.state.routeNotFound === this.getKey()) {
        return this.props.fallback || <ErrorPage404 />;
      } else {
        return this.props.children;
      }
    }
  }
);

function App() {
  const artistCondition = user => user.role === "artist";
  return (
    <Router>
      <Web3ContextProvider>
        <AccountContextProvider>
          <RouteNotFoundBoundary>
            <Toaster
              toastOptions={{
                error: {
                  className: "text-light bg-danger",
                },
                icon: <span></span>,
                duration: 5000,
                position: "top-left",
              }}
            />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/create-profile" component={Profile} />
              <Route exact path="/terms" component={TermsAndConditionsPage} />
              <ProtectedRoute exact path="/become-creator" component={Artist} />
              <ProtectedRoute exact path="/contact" component={Contact} />
              <ProtectedRoute
                exact
                path="/creator/:username"
                cond={user => !!user}
                component={ArtistProfile}
                render={props => (
                  <ArtistProfile key={props.location.pathname} {...props} />
                )}
              />
              <ProtectedRoute exact path="/chapters/:id" component={Details} />
              <ProtectedRoute
                exact
                path="/chapters/:id/read"
                component={ChapterPage}
              />
              <ProtectedRoute
                exact
                path="/create-comic"
                cond={artistCondition}
                component={CreateComic}
              />
              <ProtectedRoute
                exact
                path="/upload-chapter"
                cond={artistCondition}
                component={UploadChapter}
              />
              <ProtectedRoute exact path="/view-comic" component={ComicPage} />
              <ProtectedRoute
                exact
                path="/user/:username"
                cond={user => !!user}
                component={User}
              />

              <Route component={ErrorPage404} />
            </Switch>
          </RouteNotFoundBoundary>
        </AccountContextProvider>
      </Web3ContextProvider>
    </Router>
  );
}

export default App;
