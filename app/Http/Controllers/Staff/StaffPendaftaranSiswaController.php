<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\PendaftaranSiswaResource;
use App\Models\Jurusan;
use App\Models\Pendaftaran;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffPendaftaranSiswaController extends Controller
{
    public function index(){
        $jurusanId = request('jurusan_id');
        $status = request('status');
        $query = Pendaftaran::with(['siswa', 'jurusan']);

        if ($jurusanId) {
            $query->where('jurusan_id', $jurusanId);
        }

        if ($status) {
            $query->where('status', $status);
        }

        $data = $query->get();
        $jurusan = Jurusan::all();

        return Inertia::render('Admin/Staff/ManajemenSiswa/PendaftaranSiswa/Index', [
            'pendaftaran' => PendaftaranSiswaResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }

    public function edit($id){
        $data = Pendaftaran::with(['siswa', 'jurusan'])->findOrFail($id);
        $jurusan = Jurusan::all();
        return Inertia::render('Admin/Staff/ManajemenSiswa/PendaftaranSiswa/Edit', [
            'pendaftaran' => new PendaftaranSiswaResource($data),
            'jurusan' => JurusanResource::collection($jurusan)
        ]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nama_lengkap' => 'required',
            'email' => 'required',
            'jurusan_id' => 'required',
            'telepon' => 'required',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'alamat' => 'required',
            'jenis_kelamin' => 'required',
        ]);

        $pendaftaran = Pendaftaran::findOrFail($id);
        $siswa = Siswa::findOrFail($pendaftaran->siswa_id);

        $pendaftaran->email = $request->email;
        $pendaftaran->jurusan_id = $request->jurusan_id;

        $siswa->nama_lengkap = $request->nama_lengkap;
        $siswa->jurusan_id = $request->jurusan_id;
        $siswa->telepon = $request->telepon;
        $siswa->tanggal_lahir = $request->tanggal_lahir;
        $siswa->tempat_lahir = $request->tempat_lahir;
        $siswa->alamat = $request->alamat;
        $siswa->jenis_kelamin = $request->jenis_kelamin;

        $pendaftaran->save();
        $siswa->save();

        return to_route('staff.pendaftaran.list');

    }

    public function destroy($id){
        $data = Pendaftaran::findOrFail($id);
        $data->delete();
    }

    public function decline_pendaftaran($id){
        $data = Pendaftaran::findOrFail($id);
        $data->status = 'decline';
        $data->save();

        return to_route('staff.pendaftaran.list');
    }


    public function approved_pendaftaran($id){
        $data = Pendaftaran::findOrFail($id);
        $siswa = Siswa::findOrFail($data->siswa_id);

        $data->status = 'approved';

        $user = User::create([
            'name' => $siswa->nama_lengkap,
            'email' => $data->email,
            'password' => bcrypt(12345),
            'role' => 'siswa'
        ]);

        $siswa->user_id = $user->id;
        $siswa->status = 1;

        $data->save();
        $siswa->save();


        return to_route('staff.pendaftaran.list');

    }
}
