<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_jurusan',
        'nama_jurusan',
        'deskripsi',
    ];

    public function siswa(){
        return $this->hasMany(Siswa::class);
    }

    public function guru(){
        return $this->hasMany(Guru::class);
    }

    public function kelas(){
        return $this->hasMany(Kelas::class);
    }
    
    public function mataPelajaran(){
        return $this->hasMany(MataPelajaran::class);
    }

    public function pendaftaran(){
        return $this->hasMany(Pendaftaran::class);
    }
}
