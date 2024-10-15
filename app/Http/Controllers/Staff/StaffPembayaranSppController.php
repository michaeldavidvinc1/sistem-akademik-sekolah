<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\PembayaranSPPResource;
use App\Models\Jurusan;
use App\Models\PembayaranSPP;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffPembayaranSppController extends Controller
{
    public function index(){
        $jurusanId = request('jurusan_id');
        $namaLengkap = request('nama_lengkap');
        $query = PembayaranSPP::with(['siswa']);

        if ($jurusanId) {
            $query->where('jurusan_id', $jurusanId);
        }

        if ($namaLengkap) {
            $query->where('nama_lengkap', 'LIKE', '%' . $namaLengkap . '%');
        }


        $data = $query->get();
        $jurusan = Jurusan::all();

        return Inertia::render('Admin/Staff/ManajemenSiswa/PembayaranSpp/Index', [
            'pembayaran' => PembayaranSPPResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }
}
