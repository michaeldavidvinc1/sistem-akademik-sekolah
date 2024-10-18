<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kelas',
        'kapasitas',
        'tahun_ajaran_id',
        'jurusan_id',
    ];

    public function siswa(){
        return $this->hasMany(Siswa::class);
    }

    public function jurusan(){
        return $this->belongsTo(Jurusan::class);
    }

    public function tahunAjaran(){
        return $this->belongsTo(TahunAjaran::class);
    }

    public function penugasan(){
        return $this->hasMany(KelasMataPelajaran::class);
    }

    public function absensi(){
        return $this->hasMnay(Absensi::class);
    }
}
