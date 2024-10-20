<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'kelas_mata_pelajaran_id',
        'jenis_penilaian_id',
        'tanggal_penilaian',
    ];

    public function nilai()
    {
        return $this->hasOne(Nilai::class);
    }

    // Relasi ke model Siswa
    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    // Relasi ke model KelasMataPelajaran
    public function kelasMataPelajaran()
    {
        return $this->belongsTo(KelasMataPelajaran::class);
    }

    // Relasi ke model JenisPenilaian
    public function jenisPenilaian()
    {
        return $this->belongsTo(JenisPenilaian::class);
    }
}
