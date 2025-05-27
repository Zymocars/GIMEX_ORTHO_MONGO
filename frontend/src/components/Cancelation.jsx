import React from 'react';
import { Clock, RefreshCw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function CancellationRefundPolicy() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
           Return & Refund Policy
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '32rem',
            margin: '0 auto'
          }}>
            We want you to be completely satisfied with your purchase. Please review our policy below.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Cancellation Policy */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                backgroundColor: '#fecaca',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginRight: '1rem'
              }}>
                <XCircle style={{ height: '1.5rem', width: '1.5rem', color: '#dc2626' }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: '#111827'
              }}>
                Return Policy
              </h2>
            </div>

            {/* <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#16a34a', marginRight: '0.5rem' }} />
                  <h3 style={{ fontWeight: '600', color: '#166534' }}>Free Cancellation</h3>
                </div>
                <p style={{ color: '#15803d', fontSize: '0.875rem' }}>
                  Cancel within 24 hours of booking for a full refund, no questions asked.
                </p>
              </div>

              <div style={{
                backgroundColor: '#fefce8',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #fde047'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <Clock style={{ height: '1.25rem', width: '1.25rem', color: '#ca8a04', marginRight: '0.5rem' }} />
                  <h3 style={{ fontWeight: '600', color: '#a16207' }}>24-48 Hours</h3>
                </div>
                <p style={{ color: '#a16207', fontSize: '0.875rem' }}>
                  Cancellation fee of 25% applies. Remaining amount will be refunded.
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff7ed',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #fed7aa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <AlertCircle style={{ height: '1.25rem', width: '1.25rem', color: '#ea580c', marginRight: '0.5rem' }} />
                  <h3 style={{ fontWeight: '600', color: '#c2410c' }}>48 Hours - 7 Days</h3>
                </div>
                <p style={{ color: '#c2410c', fontSize: '0.875rem' }}>
                  Cancellation fee of 50% applies. Remaining amount will be refunded.
                </p>
              </div>

              <div style={{
                backgroundColor: '#fef2f2',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <XCircle style={{ height: '1.25rem', width: '1.25rem', color: '#dc2626', marginRight: '0.5rem' }} />
                  <h3 style={{ fontWeight: '600', color: '#991b1b' }}>Less than 48 Hours</h3>
                </div>
                <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>
                  No refund available. Full payment is non-refundable.
                </p>
              </div>
            </div> */}
            <p>If customer is not happy with your purchase, we will accept a return of an unused product within 5 days from the date of delivery of the products.

Once we receive the returned item  will then give remaining product amount
refund (only remaining products amount)post verification of the product at our warehouse. Refund shall be processed as per the applicable guidelines / notification / law passed by RBI from time to and it may take 07-14 days additional business days to reflect.</p>

            <div style={{
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Important Notes:</h4>
              <ul style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, paddingLeft: '1rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>Cancellation requests must be submitted in writing</li>
                <li style={{ marginBottom: '0.25rem' }}>Refunds will be processed within 5-10 business days</li>
                <li>Emergency cancellations may be considered on a case-by-case basis</li>
              </ul>
            </div>
          </div>

          {/* Refund Policy */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginRight: '1rem'
              }}>
                <RefreshCw style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: '#111827'
              }}>
                Refund Policy
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  Refund Processing Time
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    backgroundColor: '#eff6ff',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.25rem' }}>1-2</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Business Days</div>
                    <div style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.25rem' }}>Credit Card</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    backgroundColor: '#eff6ff',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.25rem' }}>3-5</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Business Days</div>
                    <div style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.25rem' }}>Bank Transfer</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    backgroundColor: '#eff6ff',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.25rem' }}>7-10</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Business Days</div>
                    <div style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.25rem' }}>Check/Money Order</div>
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  Eligible for Full Refund
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#374151' }}>Service Not Delivered</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>If we fail to provide the agreed service</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#374151' }}>Technical Issues</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>System failures preventing service delivery</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#374151' }}>Duplicate Charges</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Accidental multiple payments</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#374151' }}>Unauthorized Charges</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Payments made without consent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Request */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1.5rem'
            }}>
              How to Request Cancellation or Refund
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#f3e8ff',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>1</span>
                </div>
                <h3 style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Contact Us</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Send an email to gimex@gimexortho.com with your order details
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#f3e8ff',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>2</span>
                </div>
                <h3 style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Provide Information</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Include order number, reason for cancellation, and preferred refund method
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#f3e8ff',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>3</span>
                </div>
                <h3 style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Confirmation</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  We'll process your request and send confirmation within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Policy */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginRight: '1rem'
              }}>
                <Clock style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: '#111827'
              }}>
                Shipping Policy
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Delivery Options */}
              <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  Delivery Options
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #bae6fd'
                  }}>
                    <h4 style={{ fontWeight: '600', color: '#0369a1', marginBottom: '0.5rem' }}>Standard Shipping</h4>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>5-7 business days</p>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1', fontWeight: '600' }}>₹50</p>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #bae6fd'
                  }}>
                    <h4 style={{ fontWeight: '600', color: '#0369a1', marginBottom: '0.5rem' }}>Express Shipping</h4>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>2-3 business days</p>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1', fontWeight: '600' }}>₹100</p>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #bae6fd'
                  }}>
                    <h4 style={{ fontWeight: '600', color: '#0369a1', marginBottom: '0.5rem' }}>Same Day Delivery</h4>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>Within 24 hours</p>
                    <p style={{ fontSize: '0.875rem', color: '#0369a1', fontWeight: '600' }}>₹200</p>
                  </div>
                </div>
              </div>

              {/* Important Shipping Information */}
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  Important Shipping Information
                </h3>
                <ul style={{
                  display: 'grid',
                  gap: '0.75rem',
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#0ea5e9', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                      Free shipping on orders above ₹500
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#0ea5e9', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                      Delivery times may vary based on location and availability
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#0ea5e9', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                      Tracking number provided for all shipments
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#0ea5e9', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                      Insurance included for all deliveries
                    </span>
                  </li>
                </ul>
              </div>

              {/* Additional Notes */}
              <div style={{
                backgroundColor: '#fffbeb',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #fef3c7'
              }}>
                <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>Please Note:</h4>
                <ul style={{ fontSize: '0.875rem', color: '#92400e', margin: 0, paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.25rem' }}>Orders placed after 2 PM will be processed the next business day</li>
                  <li style={{ marginBottom: '0.25rem' }}>Delivery times exclude weekends and holidays</li>
                  <li>Some remote locations may require additional delivery time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            color: 'white'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Need Help?
              </h2>
              <p style={{
                color: '#bfdbfe',
                marginBottom: '1.5rem',
                maxWidth: '32rem',
                margin: '0 auto 1.5rem'
              }}>
                Our customer support team is here to assist you with any questions about cancellations or refunds.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email</div>
                  <div style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>gimex@gimexortho.com</div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Phone</div>
                  <div style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>9833215100</div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Hours</div>
                  <div style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Mon-Fri 9AM-6PM</div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Response Time</div>
                  <div style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
            paddingTop: '2rem'
          }}>
            <p> We reserve the right to modify this policy at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}