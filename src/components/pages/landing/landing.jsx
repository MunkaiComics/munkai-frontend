import Arrivals from "./arrivals/arrivals";
import Guides from "./guides/guides";
import Hero from "./hero/hero";
import Mcomics from "./mcomics/mcomics";
import Started from "./started/started";
import Nav from "../../global/nav";
import Footer from "../../global/footer";
import Info from "./info/info";

function Landing() {
  return (
    <div>
      <Nav />
      <Hero />
      <Started />
      <Arrivals />
      <Info />
      <Mcomics />
      <Guides />
      <Footer />
    </div>
  );
}

export default Landing;
