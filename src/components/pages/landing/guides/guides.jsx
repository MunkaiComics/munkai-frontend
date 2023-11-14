import "../landing.css";

function Guides() {
  return (
    <div>
      <section className='guide'>
        <style jsx>{`
          .video-container {
            overflow: hidden;
            position: relative;
            width: calc(100% - 3rem);
            margin-left: auto;
            margin-right: auto; 
            max-width: 1000px;
          }

          .video-container::after {
            padding-top: 56.25%;
            display: block;
            content: "";
          }

          .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
        <h1 className='heading'>Meet with Munkai</h1>
        <div className='d-flex justify-content-center flex-wrap align-content-center video-container'>
          <iframe
            // width={height * aspectRatio}
            // height={height}
            style={{ maxWidth: "100%" }}
            src='https://www.youtube.com/embed/55wdWAoQrac'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen></iframe>
        </div>
      </section>
    </div>
  );
}

export default Guides;
