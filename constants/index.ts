import { assets } from "./assets";

import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import cart_icon from "./cart_icon.svg";
import add_icon from "./add_icon.svg";
import order_icon from "./order_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import box_icon from "./box_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import menu_icon from "./menu_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import my_location_image from "./my_location_image.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import heart_icon from "./heart_icon.svg";
import star_icon from "./star_icon.svg";
import redirect_icon from "./redirect_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import header_headphone_image from "./header_headphone_image.png";
import header_playstation_image from "./header_playstation_image.png";
import header_macbook_image from "./header_macbook_image.png";
import macbook_image from "./macbook_image.png";
import bose_headphone_image from "./bose_headphone_image.png";
import apple_earphone_image from "./apple_earphone_image.png";
import samsung_s23phone_image from "./samsung_s23phone_image.png";
import venu_watch_image from "./venu_watch_image.png";
import upload_area from "./upload_area.png";
import cannon_camera_image from "./cannon_camera_image.png";
import sony_airbuds_image from "./sony_airbuds_image.png";
import asus_laptop_image from "./asus_laptop_image.png";
import projector_image from "./projector_image.png";
import playstation_image from "./playstation_image.png";
import girl_with_headphone_image from "./girl_with_headphone_image.png";
import girl_with_earphone_image from "./girl_with_earphone_image.png";
import md_controller_image from "./md_controller_image.png";
import sm_controller_image from "./sm_controller_image.png";
import jbl_soundbox_image from "./jbl_soundbox_image.png";
import boy_with_laptop_image from "./boy_with_laptop_image.png";
import checkmark from "./checkmark.png";
import product_details_page_apple_earphone_image1 from "./product_details_page_apple_earphone_image1.png";
import product_details_page_apple_earphone_image2 from "./product_details_page_apple_earphone_image2.png";
import product_details_page_apple_earphone_image3 from "./product_details_page_apple_earphone_image3.png";
import product_details_page_apple_earphone_image4 from "./product_details_page_apple_earphone_image4.png";
import product_details_page_apple_earphone_image5 from "./product_details_page_apple_earphone_image5.png";
import hamIcon from "./menu_icon.svg";
export const assets = {
  search_icon,
  user_icon,
  cart_icon,
  add_icon,
  order_icon,
  instagram_icon,
  facebook_icon,
  twitter_icon,
  box_icon,
  product_list_icon,
  menu_icon,
  arrow_icon,
  increase_arrow,
  decrease_arrow,
  arrow_right_icon_colored,
  my_location_image,
  arrow_icon_white,
  heart_icon,
  star_icon,
  redirect_icon,
  star_dull_icon,
  header_headphone_image,
  header_playstation_image,
  header_macbook_image,
  macbook_image,
  bose_headphone_image,
  apple_earphone_image,
  samsung_s23phone_image,
  venu_watch_image,
  upload_area,
  cannon_camera_image,
  sony_airbuds_image,
  asus_laptop_image,
  projector_image,
  playstation_image,
  girl_with_headphone_image,
  girl_with_earphone_image,
  md_controller_image,
  sm_controller_image,
  jbl_soundbox_image,
  boy_with_laptop_image,
  product_details_page_apple_earphone_image1,
  product_details_page_apple_earphone_image2,
  product_details_page_apple_earphone_image3,
  product_details_page_apple_earphone_image4,
  product_details_page_apple_earphone_image5,
  checkmark,
  hamIcon,
};

export const products = [
  {
    id: 1,
    name: "Apple Earphones",
    description: "Noise-cancellation, 40-hour battery",
    rating: 4.5,
    price: "$299.99",
    imgSrc: assets.apple_earphone_image,
  },
  {
    id: 2,
    name: "Bose QuietComfort 45",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    price: "$329.99",
    imgSrc: assets.bose_headphone_image,
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    description: "Fitness Tracking, AMOLED Display",
    rating: 4.5,
    price: "$799.99",
    imgSrc: assets.samsung_s23phone_image,
  },
  {
    id: 4,
    name: "Garmin Venu 2",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    price: "$349.99",
    imgSrc: assets.venu_watch_image,
  },
  {
    id: 5,
    name: "PlayStation 5",
    description: "Ultra-HD, 825GB SSD, Ray Graphics",
    rating: 4.5,
    price: "$499.99",
    imgSrc: assets.apple_earphone_image,
  },
  {
    id: 6,
    name: "Canon EOS R5",
    description: "45MP Sensor, 8K Video Recording",
    rating: 4.5,
    price: "$3,899.99",
    imgSrc: assets.cannon_camera_image,
  },
  {
    id: 7,
    name: "MacBook Pro 16",
    description: "M2 Pro Chip, 16GB RAM, 512GB SSD",
    rating: 4.5,
    price: "$2,499.99",
    imgSrc: assets.macbook_image,
  },
  {
    id: 8,
    name: "Sony WF-1000XM5",
    description: "Noise-Cancellation, Hi-Res Audio",
    rating: 4.5,
    price: "$299.99",
    imgSrc: assets.sony_airbuds_image,
  },
  {
    id: 9,
    name: "Samsung Projector 4k",
    description: "4K Ultra HD, Realistic, Built-In Speaker",
    rating: 4.5,
    price: "$1,499.99",
    imgSrc: assets.projector_image,
  },
  {
    id: 10,
    name: "ASUS ROG Zephyrus G16",
    description: "Intel Core i9, RTX 4070, 16GB, 1TB",
    rating: 4.5,
    price: "$1,999.99",
    imgSrc: assets.asus_laptop_image,
  },
  {
    id: 11,
    name: "Apple Earphones",
    description: "Noise-cancellation, 40-hour battery",
    rating: 4.5,
    price: "$299.99",
    imgSrc: assets.apple_earphone_image,
  },
  {
    id: 12,
    name: "Bose QuietComfort 45",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    price: "$329.99",
    imgSrc: assets.bose_headphone_image,
  },
  {
    id: 13,
    name: "Samsung Galaxy S23",
    description: "Fitness Tracking, AMOLED Display",
    rating: 4.5,
    price: "$799.99",
    imgSrc: assets.samsung_s23phone_image,
  },
  {
    id: 14,
    name: "Garmin Venu 2",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    price: "$349.99",
    imgSrc: assets.venu_watch_image,
  },
  {
    id: 15,
    name: "PlayStation 5",
    description: "Ultra-HD, 825GB SSD, Ray Graphics",
    rating: 4.5,
    price: "$499.99",
    imgSrc: assets.apple_earphone_image,
  },
  {
    id: 16,
    name: "Canon EOS R5",
    description: "45MP Sensor, 8K Video Recording",
    rating: 4.5,
    price: "$3,899.99",
    imgSrc: assets.cannon_camera_image,
  },
  {
    id: 17,
    name: "MacBook Pro 16",
    description: "M2 Pro Chip, 16GB RAM, 512GB SSD",
    rating: 4.5,
    price: "$2,499.99",
    imgSrc: assets.macbook_image,
  },
  {
    id: 18,
    name: "Sony WF-1000XM5",
    description: "Noise-Cancellation, Hi-Res Audio",
    rating: 4.5,
    price: "$299.99",
    imgSrc: assets.sony_airbuds_image,
  },
  {
    id: 19,
    name: "Samsung Projector 4k",
    description: "4K Ultra HD, Realistic, Built-In Speaker",
    rating: 4.5,
    price: "$1,499.99",
    imgSrc: assets.projector_image,
  },
  {
    id: 20,
    name: "ASUS ROG Zephyrus G16",
    description: "Intel Core i9, RTX 4070, 16GB, 1TB",
    rating: 4.5,
    price: "$1,999.99",
    imgSrc: assets.asus_laptop_image,
  },
];