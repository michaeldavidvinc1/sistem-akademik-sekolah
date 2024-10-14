<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'tanggal_lahir',
        'tempat_lahir',
        'alamat',
        'telepon',
        'tanggal_daftar',
        'status',
        'jenis_kelamin',
        'jurusan_id',
        'kelas_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function jurusan(){
        return $this->belongsTo(Jurusan::class);
    }

    public function kelas(){
        return $this->belongsTo(Kelas::class);
    }

    public function pendaftaran(){
        return $this->hasOne(Pendaftaran::class);
    }
}
