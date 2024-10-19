<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'tanggal',
        'status_kehadiran',
        'keterangan',
        'kelas_id', 
        'guru_id'
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class);
    }

    // Method untuk mengecek apakah absensi hari ini sudah diisi
    public static function sudahAbsen($kelas_id, $tanggal, $mata_pelajaran_id)
    {
        return self::where('kelas_id', $kelas_id)
                   ->where('tanggal', $tanggal)
                   ->where('mata_pelajaran_id', $mata_pelajaran_id)
                   ->exists();
    }

    // Method untuk membuat absensi kosong untuk satu kelas
    public static function buatAbsensiKelas($kelas_id, $tanggal, $mata_pelajaran_id, $guru_id)
    {
        // Ambil semua siswa dalam kelas
        $siswa = Siswa::where('kelas_id', $kelas_id)->get();
        
        // Buat array untuk bulk insert
        $data = [];
        foreach ($siswa as $s) {
            $data[] = [
                'siswa_id' => $s->id,
                'kelas_id' => $kelas_id,
                'tanggal' => $tanggal,
                'mata_pelajaran_id' => $mata_pelajaran_id,
                'guru_id' => $guru_id,
                'status_kehadiran' => 'belum_diisi',
                'created_at' => now(),
                'updated_at' => now()
            ];
        }
        
        // Lakukan bulk insert
        return self::insert($data);
    }

    // Method untuk mengupdate status kehadiran siswa
    public static function isiAbsensi($siswa_id, $tanggal, $mata_pelajaran_id, $status, $keterangan = null)
    {
        return self::where('siswa_id', $siswa_id)
                   ->where('tanggal', $tanggal)
                   ->where('mata_pelajaran_id', $mata_pelajaran_id)
                   ->update([
                       'status_kehadiran' => $status,
                       'keterangan' => $keterangan
                   ]);
    }
}
