<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiswaAbsensiController extends Controller
{
    public function index(){
        $siswa = Siswa::where('user_id', Auth::user()->id)->first();
        $data = Absensi::where('siswa_id', $siswa->id)->get();
        $transformedData = $data->mapWithKeys(function ($item) {
            return [
                $item->tanggal => [
                    'status_kehadiran' => $item->status_kehadiran,
                    'keterangan' => $item->keterangan ?? '-'
                ]
            ];
        })->toArray();
        return Inertia::render('Admin/Siswa/Absensi/Index', [
            'absensi' => $transformedData
        ]);
    }
}
