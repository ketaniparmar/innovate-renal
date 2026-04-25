"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { generateDPRNarrative } from '@/lib/engine/narrative';

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
  
  // ✅ ADDED: monthlyRevenue (from engine) & downtime (from context/engine)
  const {
    ebitda = 0,
    monthlyRevenue = 0, 
    grossRevenue = 0,
    totalOpex = 0,
    breakevenMonths = 0,
    downtimeLoss = 0,
    underutilizationLoss = 0, 
    machines = 0,
    sessionsPerDay = 0,
    downtime = 0,
    downtimePercentage = 0,
    payorMix = { pmjay: 0, private: 0, tpa: 0 }
  } = data || {};

  // Safely resolve naming overlaps between DB and Engine
  const revenueToDisplay = monthlyRevenue || grossRevenue;
  const downtimeToDisplay = downtime || downtimePercentage;

  // ✅ FIXED: Corrected `privateMix` to `payorMix: { private }` to satisfy TypeScript
  const summary = generateDPRNarrative({
    ebitda,
    downtimeLoss,
    underutilizationLoss,
    payorMix: { private: payorMix.private || 0 }
  });

  return (
    <Document title={`DPR_${data?.name || 'Project'}`}>

      {/* PAGE 1 — EXECUTIVE DECISION */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Executive Investment Verdict</Text>

        <View style={styles.verdictBox}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: summary.verdictColor }}>
            {summary.verdictTitle}
          </Text>

          <Text style={{ fontSize: 11, marginTop: 10, color: '#334155', lineHeight: 1.4 }}>
            {summary.verdictText}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Monthly EBITDA (Projected)</Text>
          <Text style={styles.value}>{formatINR(ebitda)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Monthly Gross Revenue</Text>
          <Text style={styles.value}>{formatINR(revenueToDisplay)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total Operational Expense (OPEX)</Text>
          <Text style={styles.value}>{formatINR(totalOpex)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Capital Payback Window</Text>
          <Text style={{...styles.value, color: '#3B82F6'}}>
            {breakevenMonths > 0 ? `${breakevenMonths.toFixed(1)} Months` : 'Analysis Required'}
          </Text>
        </View>

        <Text style={styles.footer}>CONFIDENTIAL | Innovate IndAI Sovereign OS v8.0</Text>
      </Page>

      {/* PAGE 2 — LEAKAGE */}
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
          {summary.leakageNarrative}
        </Text>

        <View style={{ marginTop: 30 }}>
          <View style={styles.row}>
            <View>
              <Text style={styles.value}>Technical Downtime Loss</Text>
              <Text style={{ fontSize: 9, color: '#94A3B8' }}>Infrastructure-driven erosion</Text>
            </View>
            <Text style={styles.value}>{formatINR(downtimeLoss)}</Text>
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.value}>Underutilization Loss</Text>
              <Text style={{ fontSize: 9, color: '#94A3B8' }}>Clinical workflow friction</Text>
            </View>
            <Text style={styles.value}>{formatINR(underutilizationLoss)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>CONFIDENTIAL | Innovate IndAI Sovereign OS v8.0</Text>
      </Page>

      {/* PAGE 3 — STRATEGIC DIAGNOSIS */}
      <Page size="A4" style={styles.darkPage}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#D4AF37' }}>
          Strategic Diagnosis
        </Text>
        
        <Text style={{ fontSize: 13, lineHeight: 1.8, color: '#CBD5E1' }}>
          {summary.strategicInsight}
        </Text>

        <View style={{ marginTop: 60, padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
          <Text style={{ fontSize: 10, color: '#D4AF37', marginBottom: 15, fontWeight: 'bold' }}>PROJECT DNA</Text>
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Clinical Scale</Text><Text style={{...styles.value, color: '#FFF'}}>{machines} Units</Text></View>
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Target Sessions</Text><Text style={{...styles.value, color: '#FFF'}}>{sessionsPerDay} / Day</Text></View>
          {/* ✅ ADDED: Restored the missing Downtime Buffer row */}
          <View style={styles.row}><Text style={{...styles.label, color: '#94A3B8'}}>Downtime Buffer</Text><Text style={{...styles.value, color: '#FFF'}}>{downtimeToDisplay}%</Text></View>
        </View>

        <Text style={styles.footer}>END OF REPORT | ISO 9001:2026 Compliant Model</Text>
      </Page>

    </Document>
  );
};