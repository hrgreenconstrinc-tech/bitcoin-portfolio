"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function BitcoinPortfolio() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [btcPrice, setBtcPrice] = useState(67519.90);
  const [priceChange, setPriceChange] = useState(4.2);

  const activeColdStorageHoldings = 14.5000;
  const activeDeFiYieldHoldings = 3.2500;
  const totalActiveHoldings = activeColdStorageHoldings + activeDeFiYieldHoldings;

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 45;
      setBtcPrice(prev => {
        const nextPrice = Number((prev + fluctuation).toFixed(2));
        setPriceChange(c => Number((c + (fluctuation > 0 ? 0.01 : -0.01)).toFixed(2)));
        return nextPrice;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const totalValueUsd = totalActiveHoldings * btcPrice;

  const ledgerData = [
    // --- ACTIVE DEPLOYMENTS ---
    { id: 1, type: 'Strategic Accumulation', strategy: 'US Institutional Vault IX (NY)', volume: 10.5000, executionDate: '2026-04-12', isDynamic: true, staticValue: 0, status: 'Active Allocation' },
    { id: 2, type: 'Treasury Reserve Buy', strategy: 'Delaware Corporate Reserve', volume: 4.0000, executionDate: '2026-05-18', isDynamic: true, staticValue: 0, status: 'Active Allocation' },
    { id: 3, type: 'Yield Generation Pool', strategy: 'US Compliant Liquidity Protocol', volume: 3.2500, executionDate: '2026-06-02', isDynamic: true, staticValue: 0, status: 'Yield Generating' },

    // --- PENDING DEALS (NEXT 3 MONTHS) ---
    { id: 8, type: 'Q3 Treasury Expansion', strategy: 'Texas Clean-Energy Mining Vault', volume: 6.5000, executionDate: '2026-07-15', isDynamic: true, staticValue: 0, status: 'Pending Strategy' },
    { id: 9, type: 'Institutional OTC Inflow', strategy: 'Miami Liquidity Desk Intake', volume: 12.0000, executionDate: '2026-08-01', isDynamic: true, staticValue: 0, status: 'Pending Strategy' },
    { id: 10, type: 'Liquidity Pool Rebalance', strategy: 'Chicago Options Collateral Vault', volume: 3.7500, executionDate: '2026-08-22', isDynamic: true, staticValue: 0, status: 'Pending Strategy' },

    // --- HISTORICAL SETTLED DEALS ---
    { id: 4, type: 'Q1 Over-The-Counter (OTC) Sale', strategy: 'NYC Liquidity Desk Settlement', volume: 8.0000, executionDate: '2026-03-10', isDynamic: false, staticValue: 542400.00, status: 'Settled Deal' },
    { id: 5, type: 'Capital Rotation Exit', strategy: 'Florida & California Property Funding', volume: 5.5000, executionDate: '2026-02-14', isDynamic: false, staticValue: 368500.00, status: 'Settled Deal' },
    { id: 6, type: 'Arbitrage Liquidation', strategy: 'CME Group Premium Capture', volume: 2.7500, executionDate: '2025-12-28', isDynamic: false, staticValue: 181250.00, status: 'Settled Deal' },
    { id: 7, type: 'Structured Options Settlement', strategy: 'Chicago Board Options Expiry', volume: 1.2000, executionDate: '2025-11-15', isDynamic: false, staticValue: 78600.00, status: 'Settled Deal' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;

    // Validate that at least one communication line is provided
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

  const activeCount = ledgerData.filter(d => d.status === 'Active Allocation' || d.status === 'Yield Generating').length;
  const settledCount = ledgerData.filter(d => d.status === 'Settled Deal').length;
  const pendingCount = ledgerData.filter(d => d.status === 'Pending Strategy').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-amber-500/20">₿</div>
          <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">ApexCrypto Labs</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <Link
            href="/real-estate"
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-blue-400 text-xs font-semibold transition-all shadow-sm cursor-pointer block"
          >
            Go to US Real Estate Portfolio →
          </Link>
          <span className="h-4 w-px bg-slate-800"></span>
          <span className="flex items-center gap-2 text-xs font-medium tracking-wide">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> US Node Streaming
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Banner Section */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider">US Domestic Treasury</span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs font-mono">Environment: ONSHORE_REG_A</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mt-2">United States Capital Reserve</h1>
            <p className="text-sm text-slate-400 mt-1">High-frequency tracking engine capturing active domestic treasury strategies and historical trade closures.</p>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl px-6 py-4 flex-1 lg:flex-none min-w-[220px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Asset Portfolio Value</p>
              <p className="text-2xl font-black text-white font-mono mt-0.5">
                ${totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl px-6 py-4 flex-1 lg:flex-none min-w-[180px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Net Active Accumulation</p>
              <p className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                {totalActiveHoldings.toFixed(4)} <span className="text-xs text-slate-400 font-normal">BTC</span>
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Spot Reference Price (USD)</p>
            <p className="text-xl font-bold font-mono text-slate-100 mt-1">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono font-semibold">▲ +{priceChange}% <span className="text-slate-500">24h Feed</span></p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ongoing Deployments</p>
            <p className="text-xl font-bold font-mono text-blue-400 mt-1">{activeCount} Active Vaults</p>
            <p className="text-[10px] text-slate-400 mt-1">Capital live in corporate sub-vaults</p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pipeline Projections (Q3)</p>
            <p className="text-xl font-bold font-mono text-orange-400 mt-1">{pendingCount} Forward Strategies</p>
            <p className="text-[10px] text-slate-400 mt-1">Scheduled metrics for next 90 days</p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Successful Settlements</p>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-1">{settledCount} Fully Settled</p>
            <p className="text-[10px] text-slate-400 mt-1">Liquidation cycles finalized</p>
          </div>
        </div>

        {/* Table Ledger */}
        <div className="p-6 rounded-2xl bg-slate-900/10 border border-slate-800 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">United States Treasury Transaction Ledger</h3>
            <p className="text-xs text-slate-400 mt-0.5">Comprehensive oversight tracking live asset valuations, pipeline contracts, and historic liquidation entries.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction Class</th>
                  <th className="px-6 py-4">Strategic Location</th>
                  <th className="px-6 py-4">Asset Volume</th>
                  <th className="px-6 py-4">Execution Date</th>
                  <th className="px-6 py-4">Current Value</th>
                  <th className="px-6 py-4 text-right">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-950/20 font-medium">
                {ledgerData.map((tx) => {
                  const isSettled = tx.status === 'Settled Deal';
                  const isYield = tx.status === 'Yield Generating';
                  const isPending = tx.status === 'Pending Strategy';
                  const computedDisplayValue = tx.isDynamic ? (tx.volume * btcPrice) : tx.staticValue;

                  return (
                    <tr key={tx.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 text-white font-semibold">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${
                            isSettled ? 'bg-slate-500' : isPending ? 'bg-orange-400 animate-pulse' : isYield ? 'bg-purple-400' : 'bg-amber-400 animate-pulse'
                          }`}></span>
                          {tx.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs font-mono">{tx.strategy}</td>
                      <td className="px-6 py-4 font-mono text-slate-200">{tx.volume.toFixed(4)} BTC</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{tx.executionDate}</td>
                      <td className="px-6 py-4 font-mono text-slate-300">
                        ${computedDisplayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border ${
                          isSettled ? 'bg-slate-900 text-slate-400 border-slate-800' : isPending ? 'bg-orange-950/50 text-orange-400 border-orange-900/60' : isYield ? 'bg-purple-950/50 text-purple-400 border-purple-900/60' : 'bg-amber-950/50 text-amber-400 border-amber-900/60'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secured Form Block with Contact Options & End-to-End Encryption messaging */}
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