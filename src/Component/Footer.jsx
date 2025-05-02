import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>About</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Jobs</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>For the Record</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Communities</h3>
            <ul className="space-y-2">
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>For Artists</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Developers</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Advertising</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Investors</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Vendors</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Support</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Free Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sonique Plans</h3>
            <ul className="space-y-2">
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Premium Individual</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Premium Duo</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Premium Family</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Premium Student</a></li>
              <li><a href="#" style={{ color: "#B3B3B3", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#FFFFFF"} onMouseOut={(e) => e.target.style.color = "#B3B3B3"}>Sonique Free</a></li>
            </ul>
          </div>

      
          <div>
            <div className="flex space-x-6">
          
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgb(41,41,41)] hover:bg-[rgb(114,114,114)]">
                <a href="#" className="text-white hover:text-gray-300">
                  <FaInstagram className="h-[16] w-[16]" />
                </a>
              </div>

              {/* Twitter Icon */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgb(41,41,41)] hover:bg-[rgb(114,114,114)]">
                <a href="#" className="text-white hover:text-gray-300">
                  <FaTwitter className="h-[16] w-[16]" />
                </a>
              </div>

           
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgb(41,41,41)] hover:bg-[rgb(114,114,114)]">
                <a href="#" className="text-white hover:text-gray-300">
                  <FaFacebook className="h-[16] w-[16]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Legal</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Safety & Privacy Center</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Cookies</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">About Ads</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Accessibility</a>
            </div>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              &copy; 2025 Soniqui AB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;