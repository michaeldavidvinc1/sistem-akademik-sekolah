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
        return $this->hasOne(Siswa::class);
    }

    public function kelas(){
        return $this->hasOne(Kelas::class);
    }
}
