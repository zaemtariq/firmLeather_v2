"use client";
import React, { useState, useRef, use } from "react";

import {
  Sparkles,
  Paperclip,
  X,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";

const RequestQuote = ({ params }) => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const { quotename } = use(params);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    productType: "Wholesale",
    quantity: 10,
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    }
  };

  const removeAttachment = () => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-leather-900 mb-4">
            Request Received
          </h2>
          <p className="text-stone-600 mb-8">
            Thank you, {formData.name}. We have received your request regarding{" "}
            {formData.productType}. Our team will review your details and get
            back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-leather-700 font-medium hover:text-leather-900 underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-leather-900 mb-4">
            Get a Quote {quotename}
          </h1>
          <p className="text-lg text-stone-600">
            Interested in bulk orders, corporate gifts, or white-label
            manufacturing? Tell us what you need.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary py-4 px-6 sm:px-10">
            <h3 className="text-white font-medium"></h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Company Name (Optional)
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none"
                placeholder="FirmLeather Inc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Interest Type
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none"
                >
                  <option value="Wholesale">Wholesale / Retail</option>
                  <option value="Sample">Sample Request</option>
                  <option value="Corporate Gifts">Corporate Gifting</option>
                  <option value="Custom Manufacturing">
                    Custom Manufacturing
                  </option>
                  <option value="White Label">White Label</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Estimated Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none"
                />
              </div>
              <div
                className={`${quotename === "general" ? "hidden" : "block"}`}
              >
                <label
                  className={`block text-sm font-medium text-stone-700 mb-1`}
                >
                  Selected Product ID
                </label>
                <input
                  type="text"
                  name="productId"
                  min="1"
                  value={quotename}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-leather-100 border border-stone-300 rounded-md focus:ring-2 focus:ring-leather-500 focus:border-leather-500 outline-none`}
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-end mb-2">
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-leather-500"
                >
                  Message
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`block w-full border bg-leather-50/30 p-4 pb-12 text-leather-900 placeholder-leather-300 focus:bg-white focus:outline-none transition-all resize-none font-serif text-lg leading-relaxed ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-leather-200 focus:border-leather-900"
                  }`}
                  placeholder="Please! Tell us more..."
                />
                <div className="absolute bottom-3 right-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 text-leather-400 hover:text-leather-600 transition-colors p-2 rounded-full hover:bg-leather-100 focus:outline-none"
                    title="Attach reference image"
                  >
                    attachment <Paperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> {errors.message}
                </p>
              )}

              {formData.attachment && (
                <div className="mt-3 flex items-center p-3 bg-leather-50 border border-leather-200 rounded-md animate-fade-in">
                  <div className="h-10 w-10 bg-leather-200 rounded flex items-center justify-center text-leather-600 mr-3 overflow-hidden">
                    {formData.attachment.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(formData.attachment)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-leather-900 truncate">
                      {formData.attachment.name}
                    </p>
                    <p className="text-xs text-leather-500">
                      {(formData.attachment.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="ml-4 p-1 rounded-full text-leather-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                {errors.submit}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
