<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'jurusan_id',
        'nama_lengkap',
        'bidang_studi',
        'alamat',
        'telepon',
        'tanggal_join',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function jurusan(){
        return $this->belongsTo(Jurusan::class);
    }


}
