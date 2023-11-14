import BackButton from "components/global/BackButton";
import ArtistForm from "../../global/artistForm";

function Artist() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackButton formVariant />
      <ArtistForm />
    </div>
  );
}

export default Artist;
