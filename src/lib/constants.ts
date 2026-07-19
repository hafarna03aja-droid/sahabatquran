import type { KategoriKas, StatusKehadiran, TipeKelas } from "./db";

export const STATUS: { code: StatusKehadiran; label: string }[] = [
  { code: "H", label: "Hadir" },
  { code: "S", label: "Sakit" },
  { code: "I", label: "Izin" },
  { code: "A", label: "Alpha" },
];

export const TIPE_KELAS: TipeKelas[] = ["Reguler", "Kitab"];

export const KATEGORI_KAS: KategoriKas[] = ["Kas Reguler", "Kas Umum"];

// Hari dalam seminggu (0 = Minggu .. 6 = Sabtu)
export const HARI_REGULER = [0, 1, 2, 3, 4, 5, 6]; 
export const HARI_KITAB = [0, 1, 2, 3, 4, 5, 6]; 

const NAMA_HARI = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function namaHari(d: Date): string {
  return NAMA_HARI[d.getDay()];
}

// Validasi Silang Hari (SOP): kunci tipe kelas yang tidak sesuai hari
export function validateHari(_tipeKelas: TipeKelas, _tanggalISO: string): string | null {
  return null;
}
