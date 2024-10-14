<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\PendaftaranSiswaResource;
use App\Models\Jurusan;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffPendaftaranSiswaController extends Controller
{
    public function index(){
        $data = Pendaftaran::with(['siswa', 'jurusan'])->get();
        // return $data;
        return Inertia::render('Admin/Staff/ManajemenSiswa/PendaftaranSiswa/Index', [
            'pendaftaran' => PendaftaranSiswaResource::collection($data)
        ]);
    }

    public function edit($id){
        $data = Pendaftaran::with(['siswa', 'jurusan'])->findOrFail($id);
        return $data;
        $jurusan = Jurusan::all();
        return Inertia::render('Admin/Staff/ManajemenSiswa/PendaftaranSiswa/Index', [
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
        ]);
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
}
