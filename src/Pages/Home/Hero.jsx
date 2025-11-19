import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const slides = [
    {
      src: "/Assets/alarm-clock-4568283_1920.jpg",
      title: "Stay Organized Every Day",
    },
    {
      src: "/Assets/book-3531412_1920.jpg",
      title: "Read More, Learn More",
    },
    {
      src: "/Assets/fitness-9180669_1280.jpg",
      title: "Achieve Your Fitness Goals",
    },
    {
      src: "/Assets/nubelson-fernandes-78XYrOOtkDQ-unsplash.jpg",
      title: "Track Your Daily Progress",
    },
    {
      src: "/Assets/prophsee-journals-WI30grRfBnE-unsplash.jpg",
      title: "Stay Consistent & Motivated",
    },
  ];

  return (
    <div className="w-full h-[50vh] md:h-[70vh] relative mt-16 container mx-auto">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="px-2 relative">
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[50vh] md:h-[70vh] object-cover rounded-xl shadow-lg"
            />
            <h2 className="absolute bottom-6 left-8 text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
              {slide.title}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
