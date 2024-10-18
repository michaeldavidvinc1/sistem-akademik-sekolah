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
        'jenis_penilaian',
        'tanggal_penilaian',
    ];
}
