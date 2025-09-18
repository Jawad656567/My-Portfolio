import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.subject && formData.message;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@yourcompany.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Business St, Suite 100',
      description: 'City, State 12345'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Monday - Friday',
      description: '8:00 AM - 6:00 PM EST'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center transform transition-all duration-1000 ease-out opacity-100 translate-y-0">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-bounce" style={{animationDelay: '75ms'}}></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-white opacity-10 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="transform transition-all duration-700 ease-out">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-shadow duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <div className="space-y-6">
                {/* Name Input */}
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${
                    focusedField === 'name' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Phone Input */}
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${
                    focusedField === 'phone' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Phone Number"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Subject"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <div className={`absolute top-4 left-4 transition-colors duration-300 ${
                    focusedField === 'message' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Message"
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-500 resize-none focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus && (
                  <div className={`p-4 rounded-xl flex items-center transition-all duration-500 transform ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  } animate-bounce`}>
                    {submitStatus === 'success' ? (
                      <React.Fragment>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Message sent successfully! We'll get back to you soon.
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Please fill in all required fields.
                      </React.Fragment>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 text-lg">Reach out to us through any of these channels</p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-blue-600 font-medium mb-1">{info.value}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Business St, Suite 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-8">Let's discuss how we can help you achieve your goals</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;