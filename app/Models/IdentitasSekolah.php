<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentitasSekolah extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
        'nama_sekolah',
        'npsn',
        'nis',
        'alamat',
        'kode_pos',
        'website',
        'email',
        'telepon'
    ];
}
