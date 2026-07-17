-- Run in Supabase SQL Editor

CREATE TABLE transaksi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL,
  jenis TEXT NOT NULL CHECK (jenis IN ('Masuk', 'Keluar')),
  santri_id UUID REFERENCES santri(id) ON DELETE CASCADE,
  sumber_tujuan TEXT NOT NULL,
  nominal NUMERIC NOT NULL,
  keterangan TEXT,
  input_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
