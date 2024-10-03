<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\TahunAjaranResource;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(){
        $data = Kelas::with(['jurusan', 'tahunAjaran'])->get();
        return Inertia::render('Admin/Staff/Pengaturan/Kelas/Index', [
            'kelas' => KelasResource::collection($data)
        ]);
    }

    public function create(){
        $jurusan = Jurusan::all();
        $tahunAjaran = TahunAjaran::all();
        return Inertia::render('Admin/Staff/Pengaturan/Kelas/Create', [
            'jurusan' => JurusanResource::collection($jurusan),
            'tahunAjaran' => TahunAjaranResource::collection($tahunAjaran)
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'nama_kelas' => 'required',
            'kapasitas' => 'required',
            'tahun_ajaran_id' => 'required',
            'jurusan_id' => 'required',
        ]);

        Kelas::create([
            'nama_kelas' => $request->nama_kelas,
            'kapasitas' => $request->kapasitas,
            'tahun_ajaran_id' => $request->tahun_ajaran_id,
            'jurusan_id' => $request->jurusan_id,
        ]);

        return to_route('staff.kelas.index');
    }

    public function edit($id){
        $jurusan = Jurusan::all();
        $tahunAjaran = TahunAjaran::all();
        $data = Kelas::with(['jurusan', 'tahunAjaran'])->findOrFail($id);
        return Inertia::render('Admin/Staff/Pengaturan/Kelas/Edit', [
            'kelas' => new KelasResource($data),
            'jurusan' => JurusanResource::collection($jurusan),
            'tahunAjaran' => TahunAjaranResource::collection($tahunAjaran)
        ]);
    }

    public function update(Request $request, $id){
        
        $data =   $request->validate([
            'nama_kelas' => 'required',
            'kapasitas' => 'required',
            'tahun_ajaran_id' => 'required',
            'jurusan_id' => 'required',
        ]);

        $kelas = Kelas::findOrFail($id);

        $kelas->update($data);

        return to_route('staff.kelas.index');
    }

    public function destroy($id){
        $kelas = Kelas::findOrFail($id);
        $kelas->delete();
    }
}
