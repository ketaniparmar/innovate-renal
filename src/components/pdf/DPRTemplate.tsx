"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// ✅ IMPORT: Updated to match standardized function name
import { generateExecutiveSummary } from '@/lib/narrative-engine';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  darkPage: { padding: 40, backgroundColor: '#010810', fontFamily: 'Helvetica', color: '#FFFFFF' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0F172A' },
  
  verdictBox: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderLeft: '4px solid #D4AF37',
    marginBottom: 30
  },

  leakageBox: {
    padding: 30,
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: 8,
    marginTop: 20
  },

  bigNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 6
  },

  label: { fontSize: 12, color: '#64748B' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },

  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94A3B8',
    borderTop: '1px solid #E2E8F0',
    paddingTop: 10
  }
});

const formatINR = (val: number) =>
  `₹ ${new Intl.NumberFormat('en-IN').format(Math.round(val || 0))}`;

export const DPRTemplate = ({ data }: any) => {
  
  // 🔥 1. SAFE DATA EXTRACTION
  // Standardized fields: utilLoss instead of underutilizationLoss
  const {
    ebitda = 0,
    grossRevenue = 0,
    totalOpex = 0,
    breakevenMonths = 0,
    downtimeLoss = 0,
    utilLoss = 0, 
    machines = 0,
    sessionsPerDay = 0,
    downtimePercentage = 0,
    payorMix = { pmjay: 0, pvt: 0, tpa: 0 }
  } = data || {};

  // 🔥 2. NARRATIVE ENGINE CALL (Standardized)
  const summary = generateExecutiveSummary({
    ebitda,
    downtimeLoss,
    utilLoss,
    payorMix
  });

  // Dynamic color for the verdict
  const verdictColor = summary.monthlyProfit > 300000 ? '#10B981' : summary.monthlyProfit > 0 ? '#F59E0B' : '#EF4444';

  return (
    <Document title={`DPR_${data?.name || 'Project'}`}>

      {/* PAGE 1 — EXECUTIVE DECISION */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Executive Investment Verdict</Text>

        <View style={styles.verdictBox}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: verdictColor }}>
            {summary.verdict}
          </Text>

          <Text style={{ fontSize: 11, marginTop: 10, color: '#334155', lineHeight: 1.4 }}>
            {summary.narrative}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Monthly EBITDA (Projected)</Text>
          <Text style={styles.value}>{formatINR(ebitda / 12)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Monthly Gross Revenue</Text>
          <Text style={styles.value}>{formatINR(grossRevenue / 12)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total Operational Expense (OPEX)</Text>
          <Text style={styles.value}>{formatINR(totalOpex / 12)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Capital Payback Window</Text>
          <Text style={{...styles.value, color: '#3B82F6'}}>
            {breakevenMonths > 0 ? `${breakevenMonths.toFixed(1)} Months` : 'Analysis Required'}
          </Text>
        </View>

        <Text style={styles.footer}>CONFIDENTIAL | Innovate IndAI Sovereign OS v8.0</Text>
      </Page>


      {/* PAGE 2 — LEAKAGE (THE "KILLER" PAGE) */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Hidden Financial Leakage</Text>

        <View style={styles.leakageBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#991B1B', textTransform: 'uppercase' }}>
            Total Projected Monthly Loss
          </Text>

          <Text style={styles.bigNumber}>
            {formatINR(summary.totalLeakage)}
          </Text>
        </View>

        <Text style={{ marginTop: 20, fontSize: 11, color: '#475569', lineHeight: 1.5 }}>
          Your current configuration identifies significant technical and operational friction. 
          Without optimization, the project will realize permanent capital erosion across two primary channels:
        </Text>

        <View style={{ marginTop: 30 }}>
          <View style={styles.row}>
            <View>
              <Text style={styles.value}>Technical Downtime Loss</Text>
              <Text style={{ fontSize: 9, color: '#94A3B8' }}>Loss due to RO & Machine Maintenance</Text>
            </View>
            <Text style={styles.value}>{formatINR(downtimeLoss)}</Text>
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.value}>Underutilization Loss</Text>
              <Text style={{ fontSize: 9, color: '#94A3B8' }}>Loss due to suboptimal shift management</Text>
            </View>
            <Text style={styles.value}>{formatINR(utilLoss)}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 40, fontSize: 10, color: '#DC2626', fontWeight: 'bold' }}>
          ⚠️ ACTION REQUIRED: Addressing these gaps before deployment recaptures enough yield to reduce payback by 4-6 months.
        </Text>

        <Text style={styles.footer}>CONFIDENTIAL | Innovate IndAI Sovereign OS v8.0</Text>
      </Page>


      {/* PAGE 3 — STRATEGIC INSIGHT (PREMIUM DARK) */}
      <Page size="A4" style={styles.darkPage}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#D4AF37' }}>
          Strategic Diagnosis
        </Text>
        <Text style={{ fontSize: 10, color: '#64748B', marginBottom: 30, textTransform: 'uppercase' }}>
          Architectural Baseline for {machines} Machine Fleet
        </Text>

        <Text style={{ fontSize: 13, lineHeight: 1.8, color: '#CBD5E1' }}>
          {summary.narrative}
        </Text>

        <View style={{ marginTop: 60, padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
          <Text style={{ fontSize: 10, color: '#D4AF37', marginBottom: 15, fontWeight: 'bold' }}>PROJECT DNA</Text>
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Clinical Scale</Text><Text style={{...styles.value, color: '#FFF'}}>{machines} Units</Text></View>
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Target Sessions</Text><Text style={{...styles.value, color: '#FFF'}}>{sessionsPerDay} / Day</Text></View>
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Downtime Buffer</Text><Text style={{...styles.value, color: '#FFF'}}>{downtimePercentage}%</Text></View>
        </View>

        <View style={{ marginTop: 100, textAlign: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D4AF37' }}>Fix This Before You Invest ₹2–3 Crores.</Text>
          <Text style={{ fontSize: 10, color: '#64748B', marginTop: 10 }}>Book Your Strategic Infrastructure Call with Innovate India.</Text>
        </View>

        <Text style={styles.footer}>END OF REPORT | ISO 9001:2026 Compliant Model</Text>
      </Page>

    </Document>
  );
};