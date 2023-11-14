import ArtistDropdown from '../../global/artistDropdowns';


function AritistFormDropdown() {
  return (
    <div>
      <button className="btn back-btn">
        <i className="fa fa-chevron-left back-icon" /> Back
      </button>
      <ArtistDropdown />
    </div>
  );
}

export default AritistFormDropdown;
