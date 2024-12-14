import { FreeMode, Pagination, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const CreatorSlider = ({ creators }) => {
  return (
    <div className="mt-10">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "blue",
        }}
        loop={true}
        autoplay={true}
        spaceBetween={10}
        pagination={true}
        // thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Pagination, Thumbs, Autoplay]}
        className="mySwiper2 max-h-screen"
      >
        {creators?.map((creator, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative">
              <img
                className="w-full object-cover h-[600px]"
                src={creator?.bestContest?.image}
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
              <div className="absolute text-white top-36 left-20 font-bold">
                <h2 className="text-6xl font-bold mb-2">
                  {creator?.bestContest?.title}
                </h2>
                <p className="text-xl font-medium">
                  {creator?.bestContest?.description}
                </p>
              </div>
              <div className="absolute text-white bottom-10 left-20 font-bold">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: -90,
                    borderRadius: "100%",
                  }}
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={creator?.image}
                      alt=""
                      className="h-20 w-20 object-cover rounded-sm"
                    />
                    <div>
                      <div className="text-6xl">{creator?.creator}</div>
                      <div className="text-2xl">
                        Total Spend: {creator?.totalPrizeMoney}$
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CreatorSlider;
