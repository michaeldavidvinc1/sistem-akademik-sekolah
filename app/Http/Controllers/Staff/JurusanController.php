<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JurusanController extends Controller
{
    public function index(){
        $namaJurusan = request('namaJurusan');
        $query = Jurusan::query();
        if ($namaJurusan) {
            $query->where('nama_jurusan', 'LIKE', '%' . $namaJurusan . '%');
        }
        $data = $query->get();
        return Inertia::render('Admin/Staff/Akademik/Jurusan/Index', [
            'jurusan' => JurusanResource::collection($data),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function create(){
        return Inertia::render('Admin/Staff/Akademik/Jurusan/Create');
    }

    public function store(Request $request){
        $request->validate([
            'kode_jurusan' => 'required',
            'nama_jurusan' => 'required',
            'deskripsi' => 'required',
        ]);

        Jurusan::create([
            'kode_jurusan' => $request->kode_jurusan,
            'nama_jurusan' => $request->nama_jurusan,
            'deskripsi' => $request->deskripsi,
        ]);

        return to_route('staff.jurusan.index');
    }

    public function edit(Jurusan $jurusan, $id){
        $data = Jurusan::findOrFail($id);
        return Inertia::render('Admin/Staff/Akademik/Jurusan/Edit', [
            'jurusan' => new JurusanResource($data)
        ]);
    }

    public function update(Request $request, $id){
        
        $data =  $request->validate([
            'kode_jurusan' => 'required',
            'nama_jurusan' => 'required',
            'deskripsi' => 'required',
        ]);

        $jurusan = Jurusan::findOrFail($id);

        $jurusan->update($data);

        return to_route('staff.jurusan.index');
    }

    public function destroy($id){
        $jurusan = Jurusan::findOrFail($id);
        $jurusan->delete();
    }
}
