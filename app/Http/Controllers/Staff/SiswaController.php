<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(){
        $data = Siswa::with(['user', 'kelas', 'jurusan'])->get();
        return Inertia::render('Admin/Staff/Pengguna/Siswa/Index', [
            'siswa' => SiswaResource::collection($data)
        ]);
    }

    public function edit($id){
        $data = Siswa::with('jurusan','user', 'kelas')->findOrFail($id);
        $jurusan = Jurusan::all();
        $kelas = Kelas::all();
        return Inertia::render('Admin/Staff/Pengguna/Siswa/Edit', [
            'siswa' => new SiswaResource($data),
            'jurusan' => JurusanResource::collection($jurusan),
            'kelas' => KelasResource::collection($kelas),
        ]);
    }
}
