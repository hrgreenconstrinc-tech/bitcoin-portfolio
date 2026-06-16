"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function RealEstatePortfolio() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedState, setSelectedState] = useState('All');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const statesList = [
    'All', 'Nebraska', 'Florida', 'California', 'Texas', 'New York', 'Nevada', 'Washington', 'Georgia', 'Colorado'
  ];

  const properties = [
    { id: 1, name: 'Omaha Suburb Development', type: 'Single Family Residential', state: 'Nebraska', location: 'Omaha, NE', value: '$350,000', yield: '6.8% ROI', status: 'Leased' },
    { id: 2, name: 'Lincoln Commercial Commons', type: 'Retail Strip Mall', state: 'Nebraska', location: 'Lincoln, NE', value: '$1,450,000', yield: '8.2% ROI', status: 'Fully Occupied' },
    { id: 3, name: 'Grand Island Logistics Hub', type: 'Industrial Warehouse', state: 'Nebraska', location: 'Grand Island, NE', value: '$2,100,000', yield: '9.4% ROI', status: 'Maintained' },
    { id: 4, name: 'Miami Brickell High-Rise', type: 'Premium Luxury Condo', state: 'Florida', location: 'Miami, FL', value: '$1,250,000', yield: '7.1% ROI', status: 'Leased' },
    { id: 5, name: 'Orlando Vacation Portfolio', type: 'Multi-Unit Housing', state: 'Florida', location: 'Kissimmee, FL', value: '$890,000', yield: '11.4% ROI', status: 'Leased' },
    { id: 6, name: 'Tampa Logistics Center', type: 'Industrial Fulfillment', state: 'Florida', location: 'Tampa, FL', value: '$4,300,000', yield: '8.9% ROI', status: 'Leased' },
    { id: 7, name: 'Silicon Valley Innovation Hub', type: 'Corporate Office', state: 'California', location: 'San Jose, CA', value: '$6,800,000', yield: '6.2% ROI', status: 'Leased' },
    { id: 8, name: 'Malibu Coastal Estate', type: 'Luxury Residential', state: 'California', location: 'Malibu, CA', value: '$5,400,000', yield: '5.5% ROI', status: 'Maintained' },
    { id: 9, name: 'San Diego Multi-Family Complex', type: 'Apartment Building', state: 'California', location: 'San Diego, CA', value: '$3,150,000', yield: '7.9% ROI', status: 'Partially Occupied' },
    { id: 10, name: 'Austin Tech Ridge Complex', type: 'Mixed-Use Retail', state: 'Texas', location: 'Austin, TX', value: '$2,950,000', yield: '9.1% ROI', status: 'Fully Occupied' },
    { id: 11, name: 'Dallas Corporate Plaza', type: 'Commercial High-Rise', state: 'Texas', location: 'Dallas, TX', value: '$7,200,000', yield: '8.4% ROI', status: 'Leased' },
    { id: 12, name: 'Manhattan Financial District Loft', type: 'Premium Luxury Condo', state: 'New York', location: 'New York, NY', value: '$2,400,000', yield: '5.8% ROI', status: 'Leased' },
    { id: 13, name: 'Brooklyn Creative Studios', type: 'Commercial Workspace', state: 'New York', location: 'Brooklyn, NY', value: '$1,850,000', yield: '7.4% ROI', status: 'Partially Occupied' },
    { id: 14, name: 'Las Vegas Strip Retail Front', type: 'Premium Commercial', state: 'Nevada', location: 'Las Vegas, NV', value: '$4,100,000', yield: '10.5% ROI', status: 'Leased' },
    { id: 15, name: 'Reno Distribution Vault', type: 'Industrial Warehouse', state: 'Nevada', location: 'Reno, NV', value: '$2,650,000', yield: '8.7% ROI', status: 'Maintained' },
    { id: 16, name: 'Seattle Tech Core Offices', type: 'Corporate Headquarters', state: 'Washington', location: 'Seattle, WA', value: '$8,400,000', yield: '6.7% ROI', status: 'Leased' },
    { id: 17, name: 'Atlanta Midtown Apartments', type: 'Multi-Family Complex', state: 'Georgia', location: 'Atlanta, GA', value: '$3,800,000', yield: '8.6% ROI', status: 'Fully Occupied' },
    { id: 18, name: 'Aspen Alpine Resort Lodging', type: 'Luxury Hospitality', state: 'Colorado', location: 'Aspen, CO', value: '$4,900,000', yield: '7.2% ROI', status: 'Leased' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;

    if (!email && !phone) {
      setStatusMessage('Error: Please supply either an email address or a secure phone number for desk response.');
      return;
    }

    setIsSending(true);
    setStatusMessage('');

    const SERVICE_ID = 'service_lptftx9';
    const TEMPLATE_ID = 'template_3kyca8d';
    const PUBLIC_KEY = '0UERK3KioTe6bf6NK';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatusMessage('Inquiry securely transmitted over encrypted relay directly to Main Desk.');
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error('Email Delivery Error:', error);
        setStatusMessage('Transmission error. Please verify network or configuration keys.');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const filteredProperties = selectedState === 'All' ? properties : properties.filter(p => p.state === selectedState);
  const totalPortfolioValue = properties.reduce((acc, p) => acc + parseFloat(p.value.replace(/[^0-9.-]+/g, "")), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-600/20">🏢</div>
          <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">ApexReal Estate Labs</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-500 text-xs font-semibold transition-all cursor-pointer block"
          >
            ← Switch to United States Capital Reserve
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <div className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Institutional US Real Estate Portfolio</h2>
            <p className="text-sm text-slate-400 mt-1">Cross-state diversified holdings spanning 9 strategic domestic regions.</p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Aggregate Assets Under Management</p>
            <p className="text-2xl font-black text-emerald-400 font-mono mt-1">
              ${(totalPortfolioValue / 1000000).toFixed(2)}M <span className="text-xs text-slate-400 font-normal">USD Total</span>
            </p>
          </div>
        </div>

        {/* State Filter Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Filter By Regional Asset Hub:</label>
          <div className="flex flex-wrap gap-2">
            {statesList.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                  selectedState === state ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {state} ({state === 'All' ? properties.length : properties.filter(p => p.state === state).length})
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/50 transition-all group relative overflow-hidden shadow-md">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-950/60 text-blue-400 border border-blue-900/50">
                    {property.type}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded">
                    {property.yield}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight">{property.name}</h3>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1 font-medium">
                  <span className="text-slate-500">Location:</span> {property.location}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Asset Valuation</p>
                  <p className="text-lg font-black text-white font-mono mt-0.5">{property.value}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 font-medium font-mono">{property.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form Block */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 max-w-3xl mx-auto shadow-2xl space-y-6 my-12">
          <div className="text-center space-y-2">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-900/50 rounded-md">
              🔒 End-to-End Encrypted Communication Relay
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">Initiate Private Placement / Acquisition</h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Communications are strictly compartmentalized and encrypted. No data leaks, no middle logs—directly cached between sender and the primary asset desk.
              <span className="block mt-1 text-blue-400 font-medium">Supply your email, phone, or both to secure a zero-delay deployment routing.</span>
            </p>
          </div>

          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Full Name / Entity</label>
              <input type="text" name="name" required placeholder="e.g., Capital Management LLC" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Corporate Email Address (Optional)</label>
                <input type="email" name="email" placeholder="investor@entity.com" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Secure Phone Number (Optional)</label>
                <input type="tel" name="phone" placeholder="e.g., +1 (555) 019-2831" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Asset Allocation Segment</label>
              <select name="asset_segment" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none transition-colors cursor-pointer">
                <option value="United States Capital Reserve Desk (BTC OTC)">United States Capital Reserve Desk (BTC OTC)</option>
                <option value="US Real Estate Acquisition Desk">US Real Estate Acquisition Desk (Property Infrastructure)</option>
                <option value="Dual-Allocation Wealth Strategy">Dual-Allocation Wealth Strategy</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Intent Summary / Desired Volume</label>
              <textarea name="message" rows={4} required placeholder="Provide parameters of requested deployment or property reference IDs..." className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors resize-none"></textarea>
            </div>

            <button type="submit" disabled={isSending} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-600/10">
              {isSending ? 'Transmitting Over Encrypted Relay...' : 'Transmit Encrypted Inquiry →'}
            </button>
            {statusMessage && (
              <p className={`text-center text-xs font-mono font-semibold p-2 rounded-xl mt-2 border ${
                statusMessage.startsWith('Error')
                  ? 'text-rose-400 bg-rose-950/30 border-rose-900/30'
                  : 'text-emerald-400 bg-emerald-950/30 border-emerald-900/30'
              }`}>{statusMessage}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}