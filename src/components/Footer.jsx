import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-100 text-gray-700 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Company</h3>
            <p className="mt-3 text-sm text-gray-600">
              Providing high-quality services and products since 2024.
            </p>
          </div>

          {/* Company Services */}
          <div>
            <h4 className="text-md font-semibold text-gray-900">Company Services</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Home</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Services</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">About</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Contact</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-900">Useful Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Company</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Stores</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Careers</a></li>
              <li><a style={{ textDecoration: "none" }} className="hover:text-indigo-600" href="#">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-md font-semibold text-gray-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Email: support@yourcompany.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Location: Toronto, Canada</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">

          {/* Social Icons */}
          <div className="flex space-x-5 mb-4 md:mb-0">
            <a href="#" className="hover:text-indigo-600 text-gray-600">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-600 text-gray-600">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-600 text-gray-600">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-600 text-gray-600">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Your Company — All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer