<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_mata_pelajaran',
        'nama_mata_pelajaran',
        'jurusan_id',
    ];

    public function jurusan(){
        return $this->belongsTo(Jurusan::class);
    }
    
    public function penugasan(){
        return $this->hasMany(KelasMataPelajaran::class);
    }

    public function absensi(){
        return $this->hasMnay(Absensi::class);
    }
}
