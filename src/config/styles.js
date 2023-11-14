import Button from "components/global/Button";

export const sliderSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  useCSS: true,
  prevArrow: (
    <Button iconButton>
      <i className='fa fa-chevron-left' />
    </Button>
  ),
  nextArrow: (
    <Button iconButton>
      <i className='fa fa-chevron-right' />
    </Button>
  ),
  responsive: [
    {
      breakpoint: 2100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
