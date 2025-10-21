import React, { useState } from 'react';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'bug',
    subject: '',
    message: '',
    browser: '',
    version: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare form data for the API
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('issue_type', formData.type);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('browser', formData.browser);
      formDataToSend.append('extension_version', formData.version);
      formDataToSend.append('message', formData.message);

      // Send to your API endpoint
      const response = await fetch('https://console.4form.beforth.in/form/moshi-moshi-support/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          type: 'bug',
          subject: '',
          message: '',
          browser: '',
          version: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Contact Support
      </h3>

      {submitStatus === 'success' && (
        <div style={{background: '#d1fae5', border: '1px solid #10b981', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem'}}>
          <p style={{color: '#065f46', margin: 0}}>
            <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{background: '#fef2f2', border: '1px solid #f87171', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem'}}>
          <p style={{color: '#991b1b', margin: 0}}>
            <strong>Error:</strong> There was a problem sending your message. Please try again or contact us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
            Issue Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="question">General Question</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
            placeholder="Brief description of your issue"
          />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
              Browser
            </label>
            <select
              name="browser"
              value={formData.browser}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select browser</option>
              <option value="chrome">Chrome</option>
              <option value="firefox">Firefox</option>
              <option value="safari">Safari</option>
              <option value="edge">Edge</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
              Extension Version
            </label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="e.g., 1.0.0"
            />
          </div>
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151'}}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Please describe your issue in detail. Include steps to reproduce if it's a bug."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{
            width: '100%',
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle', animation: 'spin 1s linear infinite'}}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
                <path d="M22 2L11 13"/>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
              Send Message
            </>
          )}
        </button>
      </form>

      <div style={{marginTop: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb'}}>
        <h4 style={{fontWeight: '600', marginBottom: '0.5rem', color: '#374151'}}>Tips for Better Support:</h4>
        <ul style={{color: '#6b7280', fontSize: '0.875rem', margin: 0, paddingLeft: '1.25rem'}}>
          <li>Include steps to reproduce bugs</li>
          <li>Mention your browser and version</li>
          <li>Attach screenshots if helpful</li>
          <li>Be as specific as possible</li>
        </ul>
      </div>
    </div>
  );
};

export default SupportForm;
