<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PembayaranSPP extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'tanggal_pembayaran',
        'jumlah',
        'bukti_bayar',
        'deskripsi',
        'status_pembayaran',
    ];

    public function siswa(){
        return $this->belongsTo(Siswa::class);
    }
}
