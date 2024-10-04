<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(){
        $kelasId = request('kelas_id');
        $jurusanId = request('jurusan_id');

        $query = Siswa::with(['user', 'kelas', 'jurusan']);

        if ($kelasId) {
            $query->where('kelas_id', $kelasId);
        }

        if ($jurusanId) {
            $query->where('jurusan_id', $jurusanId);
        }

        $data = $query->get();

        $jurusan = Jurusan::all();
        $kelas = Kelas::all();

        return Inertia::render('Admin/Staff/Pengguna/Siswa/Index', [
            'siswa' => SiswaResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'kelas' => KelasResource::collection($kelas),
            'jurusan' => JurusanResource::collection($jurusan),
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

    public function update($id, Request $request){
        $request->validate([
            'email' => 'required',
            'nama_lengkap' => 'required',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
            'tanggal_daftar' => 'required',
            'status' => 'required',
            'jenis_kelamin' => 'required',
            'jurusan_id' => 'required',
            'kelas_id' => 'required',
        ]);

        $siswa = Siswa::findOrFail($id);
        $user = User::findOrFail($siswa->user_id);

        $user->name = $request->nama_lengkap;
        $user->email = $request->email;
        $user->save();

        $siswa->nama_lengkap = $request->nama_lengkap;
        $siswa->tanggal_lahir = $request->tanggal_lahir;
        $siswa->tempat_lahir = $request->tempat_lahir;
        $siswa->alamat = $request->alamat;
        $siswa->telepon = $request->telepon;
        $siswa->tanggal_daftar = $request->tanggal_daftar;
        $siswa->status = $request->status;
        $siswa->jenis_kelamin = $request->jenis_kelamin;
        $siswa->jurusan_id = $request->jurusan_id;
        $siswa->kelas_id = $request->kelas_id;
        $siswa->save();

        return to_route('staff.siswa.index');


    }
}
